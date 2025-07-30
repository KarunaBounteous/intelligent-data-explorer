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
        
        // First look for "glossary begins" or "terms begin"
        let startIndex = lines.findIndex(line => 
          line.toLowerCase().includes('glossary begins') ||
          line.toLowerCase().includes('terms begin')
        );
        
        // If we found "glossary begins", look for "terms begin" after it
        if (startIndex !== -1 && lines[startIndex].toLowerCase().includes('glossary begins')) {
          const termsBeginIndex = lines.slice(startIndex + 1).findIndex(line => 
            line.toLowerCase().includes('terms begin')
          );
          
          if (termsBeginIndex !== -1) {
            startIndex = startIndex + 1 + termsBeginIndex;
          }
        }
        
        if (startIndex === -1) {
          reject(new Error("Could not find 'Terms begin' or 'Glossary begins' section in the CSV file"));
          return;
        }
        
        // Get lines after the found section
        const termsSection = lines.slice(startIndex + 1).join('\n');
        
        Papa.parse(termsSection, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            handleParsedResults(results, resolve, reject);
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
            handleParsedResults(results, resolve, reject);
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

const handleParsedResults = (results: any, resolve: (value: any[]) => void, reject: (reason?: any) => void) => {
  if (results.errors.length > 0) {
    reject(new Error(`CSV parsing error: ${results.errors[0].message}`));
    return;
  }

  const data = results.data as ParsedRow[];
  
  if (data.length === 0) {
    reject(new Error("CSV file is empty or no data found after parsing"));
    return;
  }

  // Check for required columns (only key and name are mandatory)
  const headers = Object.keys(data[0]);
  const requiredColumns = ['key', 'name'];
  const missingColumns = requiredColumns.filter(col => 
    !headers.some(header => header.toLowerCase().includes(col.toLowerCase()))
  );
  
  if (missingColumns.length > 0) {
    reject(new Error(`Missing required columns: ${missingColumns.join(", ")}. Found columns: ${headers.join(", ")}`));
    return;
  }

  // Find the actual column names (case-insensitive)
  const keyColumn = headers.find(h => h.toLowerCase().includes('key')) || 'key';
  const nameColumn = headers.find(h => h.toLowerCase().includes('name')) || 'name';
  const definitionColumn = headers.find(h => h.toLowerCase().includes('definition'));

  // Transform data to match expected format (mapping key->id, definition->description)
  const transformedData = data.map((row, index) => ({
    id: row[keyColumn] || `csv-${Date.now()}-${index}`,
    name: row[nameColumn] || "",
    description: definitionColumn ? (row[definitionColumn] || "") : "",
  }));

  // Validate that required fields are not empty
  const invalidRows = transformedData.filter(row => !row.name.trim());
  if (invalidRows.length > 0) {
    reject(new Error("Some rows have empty name fields"));
    return;
  }

  resolve(transformedData);
};