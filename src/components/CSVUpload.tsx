import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { parseCSVFile } from "@/lib/csvParser";

interface CSVUploadProps {
  onDataParsed: (data: any[]) => void;
  expectedColumns: string[];
  type: "er-objects" | "terms";
}

const CSVUpload = ({ onDataParsed, expectedColumns, type }: CSVUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
      return;
    }

    try {
      const data = await parseCSVFile(file, expectedColumns, type);
      onDataParsed(data);
      toast({
        title: "File uploaded successfully",
        description: `Parsed ${data.length} ${type} from CSV file.`,
      });
    } catch (error) {
      toast({
        title: "Error parsing CSV",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <Label htmlFor={`csv-upload-${type}`} className="text-sm font-medium">
          Upload CSV File
        </Label>
        <Input
          ref={fileInputRef}
          id={`csv-upload-${type}`}
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
      <Button
        onClick={handleButtonClick}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Upload className="h-4 w-4" />
        Choose File
      </Button>
    </div>
  );
};

export default CSVUpload;