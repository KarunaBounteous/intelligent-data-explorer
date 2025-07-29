import Papa from "papaparse";

export interface ParsedRow {
  [key: string]: string;
}

export const parseCSVFile = (file: File, expectedColumns: string[]): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(`CSV parsing error: ${results.errors[0].message}`));
          return;
        }

        const data = results.data as ParsedRow[];
        
        if (data.length === 0) {
          reject(new Error("CSV file is empty"));
          return;
        }

        // Validate headers
        const headers = Object.keys(data[0]);
        const missingColumns = expectedColumns.filter(col => !headers.includes(col));
        
        if (missingColumns.length > 0) {
          reject(new Error(`Missing required columns: ${missingColumns.join(", ")}`));
          return;
        }

        // Transform data to match expected format
        const transformedData = data.map((row, index) => ({
          id: row.id || `csv-${Date.now()}-${index}`,
          name: row.name || "",
          description: row.description || "",
        }));

        // Validate that required fields are not empty
        const invalidRows = transformedData.filter(row => !row.name.trim());
        if (invalidRows.length > 0) {
          reject(new Error("Some rows have empty name fields"));
          return;
        }

        resolve(transformedData);
      },
      error: (error) => {
        reject(new Error(`Failed to read CSV file: ${error.message}`));
      }
    });
  });
};