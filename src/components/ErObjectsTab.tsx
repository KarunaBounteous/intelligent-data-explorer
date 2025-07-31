import { useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import DataCard from "./DataCard";
import CSVUpload from "./CSVUpload";
import { ErObject } from "@/data/sampleData";

interface ErObjectsTabProps {
  erObjects: ErObject[];
  onDataParsed: (data: ErObject[]) => void;
}

const ErObjectsTab = ({ erObjects, onDataParsed }: ErObjectsTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredObjects = useMemo(() => {
    return erObjects.filter(
      (obj) =>
        obj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obj.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, erObjects]);

  const handleCSVDataParsed = (csvData: ErObject[]) => {
    onDataParsed(csvData);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">ER Objects</h2>
          <p className="text-muted-foreground">
            Entity-Relationship objects representing core business entities and their data structures.
          </p>
        </div>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search ER objects..."
        />
        <CSVUpload
          onDataParsed={handleCSVDataParsed}
          expectedColumns={["id", "name", "description"]}
          type="er-objects"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredObjects.length > 0 ? (
          filteredObjects.map((obj) => (
            <DataCard
              key={obj.id}
              name={obj.name}
              description={obj.description}
              type="er-object"
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No ER objects found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErObjectsTab;