
import React, { useState } from 'react';
import Header from '../components/Header';
import PipelineList from '../components/PipelineList';
import DeploymentHistory from '../components/DeploymentHistory';
import DockerContainer from '../components/DockerContainer';
import { mockPipelines, mockDeployments, mockDockerContainers } from '../utils/mockData';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("pipelines");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPipelines = mockPipelines.filter(pipeline => 
    pipeline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pipeline.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDeployments = mockDeployments.filter(deployment =>
    deployment.pipelineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deployment.environment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContainers = mockDockerContainers.filter(container =>
    container.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    container.image.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search pipelines, deployments, or containers..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter size={16} className="mr-2" /> Filter
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} className="w-full">
            <TabsContent value="pipelines" className="mt-0">
              <h2 className="text-lg font-medium mb-4">Pipelines</h2>
              <PipelineList pipelines={filteredPipelines} />
            </TabsContent>
            
            <TabsContent value="deployments" className="mt-0">
              <h2 className="text-lg font-medium mb-4">Deployment History</h2>
              <DeploymentHistory deployments={filteredDeployments} />
            </TabsContent>
            
            <TabsContent value="containers" className="mt-0">
              <h2 className="text-lg font-medium mb-4">Docker Containers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContainers.map(container => (
                  <DockerContainer key={container.id} container={container} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="bg-muted/30 border-t py-4">
        <div className="container">
          <div className="text-center text-sm text-muted-foreground">
            <p>Deploy Orchestrator &copy; 2025. All rights reserved.</p>
            <p className="text-xs mt-1">Powered by Jenkins and Docker</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
