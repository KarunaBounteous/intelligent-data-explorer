import { useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import DataCard from "./DataCard";
import { sampleTerms } from "@/data/sampleData";

const TermsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTerms = useMemo(() => {
    return sampleTerms.filter(
      (term) =>
        term.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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