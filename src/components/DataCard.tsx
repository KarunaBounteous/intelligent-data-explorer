import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DataCardProps {
  name: string;
  description: string;
  type?: "er-object" | "term";
}

const DataCard = ({ name, description, type = "er-object" }: DataCardProps) => {
  return (
    <Card className="hover:shadow-md transition-all duration-200 border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            {name}
          </CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            type === "er-object" 
              ? "bg-idc-light text-idc-primary" 
              : "bg-muted text-muted-foreground"
          }`}>
            {type === "er-object" ? "ER Object" : "Term"}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default DataCard;