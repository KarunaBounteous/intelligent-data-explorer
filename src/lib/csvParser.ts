import Papa from "papaparse";

export interface ParsedRow {
  [key: string]: string;
}

export const parseCSVFile = (file: File, expectedColumns: string[], type: "er-objects" | "terms"): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    if (type === "terms") {
      // For terms CSV, we need to handle the special "Terms begin" structure
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        
        // Look for "terms begins" or "terms begin"
        let startIndex = lines.findIndex(line => 
          line.toLowerCase().includes('terms begin')
        );
        
        if (startIndex === -1) {
          reject(new Error("Could not find 'Terms begin' section in the CSV file"));
          return;
        }
        
        // Look for "terms ends" after the start
        let endIndex = lines.slice(startIndex + 1).findIndex(line => 
          line.toLowerCase().includes('terms end')
        );
        
        if (endIndex !== -1) {
          endIndex = startIndex + 1 + endIndex;
        } else {
          // If no "terms ends" found, use all lines after "terms begins"
          endIndex = lines.length;
        }
        
        // Get lines between the found sections
        const termsSection = lines.slice(startIndex + 1, endIndex).join('\n');
        
        Papa.parse(termsSection, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            handleParsedResults(results, resolve, reject, type);
          },
          error: (error) => {
            reject(new Error(`Failed to read CSV file: ${error.message}`));
          }
        });
      };
      reader.readAsText(file);
    } else {
      // For ER objects CSV, parse normally but handle relationkey section
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        
        // Find the "relationkey" line and only process rows before it
        const relationKeyIndex = lines.findIndex(line => 
          line.toLowerCase().includes('relationkey')
        );
        
        const csvContent = relationKeyIndex !== -1 
          ? lines.slice(0, relationKeyIndex).join('\n')
          : text;
        
        Papa.parse(csvContent, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            handleParsedResults(results, resolve, reject, type);
          },
          error: (error) => {
            reject(new Error(`Failed to read CSV file: ${error.message}`));
          }
        });
      };
      reader.readAsText(file);
    }
  });
};

const handleParsedResults = (results: any, resolve: (value: any[]) => void, reject: (reason?: any) => void, type?: "er-objects" | "terms") => {
  if (results.errors.length > 0) {
    reject(new Error(`CSV parsing error: ${results.errors[0].message}`));
    return;
  }

  const data = results.data as ParsedRow[];
  
  if (data.length === 0) {
    reject(new Error("CSV file is empty or no data found after parsing"));
    return;
  }

  const headers = Object.keys(data[0]);
  
  // For terms, try to intelligently map columns if standard names aren't found
  let keyColumn: string | undefined;
  let nameColumn: string | undefined;
  let definitionColumn: string | undefined;

  if (type === "terms") {
    // For terms, key is optional, try to find name and definition columns
    // Look for columns that might contain "name" or be first non-empty column for name
    nameColumn = headers.find(h => h.toLowerCase().includes('name')) || 
                 headers.find(h => h.toLowerCase().includes('term')) ||
                 headers[0]; // fallback to first column
    
    // Look for definition/description column
    definitionColumn = headers.find(h => h.toLowerCase().includes('definition')) ||
                      headers.find(h => h.toLowerCase().includes('description')) ||
                      headers.find(h => h.toLowerCase().includes('meaning')) ||
                      headers[1]; // fallback to second column if available
    
    // Key column is optional for terms
    keyColumn = headers.find(h => h.toLowerCase().includes('key'));
    
    // Validate that we have at least a name column
    if (!nameColumn || !data.some(row => row[nameColumn]?.trim())) {
      reject(new Error(`Could not find a valid name/term column. Found columns: ${headers.join(", ")}`));
      return;
    }
  } else {
    // For ER objects, both key and name are required
    keyColumn = headers.find(h => h.toLowerCase().includes('key'));
    nameColumn = headers.find(h => h.toLowerCase().includes('name'));
    definitionColumn = headers.find(h => h.toLowerCase().includes('definition'));
    
    if (!keyColumn || !nameColumn) {
      const missing = [];
      if (!keyColumn) missing.push('key');
      if (!nameColumn) missing.push('name');
      reject(new Error(`Missing required columns: ${missing.join(", ")}. Found columns: ${headers.join(", ")}`));
      return;
    }
  }

  // Transform data to match expected format
  const transformedData = data.map((row, index) => ({
    id: (keyColumn && row[keyColumn]) || `csv-${Date.now()}-${index}`,
    name: row[nameColumn!] || "",
    description: (definitionColumn && row[definitionColumn]) || "",
  }));

  // Validate that required fields are not empty
  const invalidRows = transformedData.filter(row => !row.name.trim());
  if (invalidRows.length > 0) {
    reject(new Error("Some rows have empty name fields"));
    return;
  }

  resolve(transformedData);
};