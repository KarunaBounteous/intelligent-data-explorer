import { useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import DataCard from "./DataCard";
import CSVUpload from "./CSVUpload";
import { Term } from "@/data/sampleData";

interface TermsTabProps {
  terms: Term[];
  onDataParsed: (data: Term[]) => void;
}

const TermsTab = ({ terms, onDataParsed }: TermsTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTerms = useMemo(() => {
    return terms.filter(
      (term) =>
        term.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, terms]);

  const handleCSVDataParsed = (csvData: Term[]) => {
    onDataParsed(csvData);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Terms</h2>
          <p className="text-muted-foreground">
            Business and technical terminology with comprehensive definitions for data classification.
          </p>
        </div>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search terms..."
        />
        <CSVUpload
          onDataParsed={handleCSVDataParsed}
          expectedColumns={["id", "name", "description"]}
          type="terms"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((term) => (
            <DataCard
              key={term.id}
              name={term.name}
              description={term.description}
              type="term"
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No terms found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TermsTab;