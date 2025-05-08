
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, RefreshCw, Settings, Bell, MoreVertical } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const handleRefresh = () => {
    setRefreshing(true);
    toast({
      title: "Refreshing data",
      description: "Fetching the latest pipeline information..."
    });
    
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
      toast({
        title: "Data refreshed",
        description: "Pipeline information is now up to date."
      });
    }, 1500);
  };

  const handleNewPipeline = () => {
    toast({
      title: "New pipeline",
      description: "The new pipeline creation dialog would open here."
    });
  };

  return (
    <header className="bg-background border-b sticky top-0 z-10">
      <div className="container py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Deploy Orchestrator</h1>
            <div className="bg-success-lighter text-success-darker text-xs px-2 py-0.5 rounded-full font-medium">
              v1.0.0
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="icon" onClick={handleRefresh} disabled={refreshing}>
              <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
            </Button>
            <Button variant="outline" size="icon">
              <Bell size={16} />
            </Button>
            <Button variant="outline" size="icon">
              <Settings size={16} />
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
              <TabsTrigger value="deployments">Deployment History</TabsTrigger>
              <TabsTrigger value="containers">Docker Containers</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button size="sm" className="ml-4" onClick={handleNewPipeline}>
            <PlusCircle size={16} className="mr-2" />
            New Pipeline
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
