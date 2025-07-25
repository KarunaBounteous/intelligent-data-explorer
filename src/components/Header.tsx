import { Database } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-idc-light rounded-lg">
            <Database className="h-8 w-8 text-idc-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Sample IDC Application
            </h1>
            <p className="text-muted-foreground text-sm">
              This is sample AI project for Intelligent Data Classification
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;