import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import ErObjectsTab from "@/components/ErObjectsTab";
import TermsTab from "@/components/TermsTab";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="er-objects" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="er-objects" className="data-[state=active]:bg-idc-primary data-[state=active]:text-primary-foreground">
              ER Objects
            </TabsTrigger>
            <TabsTrigger value="terms" className="data-[state=active]:bg-idc-primary data-[state=active]:text-primary-foreground">
              Terms
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="er-objects" className="mt-0">
            <ErObjectsTab />
          </TabsContent>
          
          <TabsContent value="terms" className="mt-0">
            <TermsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
