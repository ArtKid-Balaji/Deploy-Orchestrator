
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { GitBranch, Settings, Server, Clock, Code, FileText, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PipelineConfig() {
  const [activeTab, setActiveTab] = useState("settings");
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Pipeline configuration saved",
      description: "Your pipeline configuration has been updated."
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Settings size={20} />
          Pipeline Configuration
        </CardTitle>
        <CardDescription>
          Configure build and deployment settings for your pipeline.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="settings">Basic Settings</TabsTrigger>
            <TabsTrigger value="triggers">Triggers</TabsTrigger>
            <TabsTrigger value="environment">Environment</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pipeline-name">Pipeline Name</Label>
                  <Input id="pipeline-name" placeholder="e.g., Frontend Deployment" defaultValue="web-frontend" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pipeline-type">Pipeline Type</Label>
                  <Select defaultValue="build-deploy">
                    <SelectTrigger id="pipeline-type">
                      <SelectValue placeholder="Select pipeline type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="build">Build Only</SelectItem>
                      <SelectItem value="deploy">Deploy Only</SelectItem>
                      <SelectItem value="build-deploy">Build & Deploy</SelectItem>
                      <SelectItem value="test">Test Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pipeline-description">Description</Label>
                <Textarea 
                  id="pipeline-description" 
                  placeholder="Describe the purpose of this pipeline"
                  defaultValue="Builds and deploys the main frontend application to production"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeout">Timeout (minutes)</Label>
                  <Input id="timeout" type="number" defaultValue="30" min="1" max="120" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="concurrency">Max Concurrent Builds</Label>
                  <Input id="concurrency" type="number" defaultValue="1" min="1" max="10" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="triggers">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-base">Source Control</Label>
                <div className="bg-muted/50 p-4 rounded-md space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="repository">Repository</Label>
                      <Input id="repository" placeholder="owner/repo" defaultValue="company/web-frontend" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch Pattern</Label>
                      <div className="flex items-center gap-2">
                        <GitBranch size={16} className="text-muted-foreground" />
                        <Input id="branch" placeholder="e.g., main, feature/*" defaultValue="main" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Trigger Events</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer">Push</Badge>
                      <Badge className="bg-muted hover:bg-muted/80 cursor-pointer">Pull Request</Badge>
                      <Badge className="bg-muted hover:bg-muted/80 cursor-pointer">Tag</Badge>
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer">Manual</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-base">Schedule</Label>
                <div className="bg-muted/50 p-4 rounded-md">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock size={18} />
                    <span>Scheduled Triggers</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cron">Cron Expression</Label>
                      <Input id="cron" placeholder="e.g., 0 0 * * *" defaultValue="0 4 * * *" />
                      <p className="text-xs text-muted-foreground">Runs at 4:00 AM every day</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="UTC">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                          <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                          <SelectItem value="CST">Central Time (CST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="environment">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="target-env">Target Environment</Label>
                  <Select defaultValue="production">
                    <SelectTrigger id="target-env">
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="infra-provider">Infrastructure Provider</Label>
                  <Select defaultValue="aws">
                    <SelectTrigger id="infra-provider">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aws">AWS</SelectItem>
                      <SelectItem value="gcp">Google Cloud</SelectItem>
                      <SelectItem value="azure">Azure</SelectItem>
                      <SelectItem value="k8s">Kubernetes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-base flex items-center gap-2">
                  <Server size={16} />
                  Environment Variables
                </Label>
                <div className="bg-muted/50 p-4 rounded-md">
                  <div className="space-y-3">
                    <div className="grid grid-cols-5 gap-2">
                      <div className="col-span-2">
                        <Input placeholder="Key" defaultValue="NODE_ENV" />
                      </div>
                      <div className="col-span-2">
                        <Input placeholder="Value" defaultValue="production" />
                      </div>
                      <Button variant="ghost" size="icon" className="h-10 w-10">
                        <span>×</span>
                      </Button>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="col-span-2">
                        <Input placeholder="Key" defaultValue="API_URL" />
                      </div>
                      <div className="col-span-2">
                        <Input placeholder="Value" defaultValue="https://api.example.com" />
                      </div>
                      <Button variant="ghost" size="icon" className="h-10 w-10">
                        <span>×</span>
                      </Button>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="col-span-2">
                        <Input placeholder="Key" />
                      </div>
                      <div className="col-span-2">
                        <Input placeholder="Value" />
                      </div>
                      <Button variant="ghost" size="icon" className="h-10 w-10">
                        <span>+</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-base flex items-center gap-2">
                  <Code size={16} />
                  Custom Build Script
                </Label>
                <Textarea 
                  rows={5}
                  defaultValue="#!/bin/bash\nnpm ci\nnpm run lint\nnpm run test\nnpm run build\n"
                  className="font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base flex items-center gap-2">
                  <FileText size={16} />
                  Configuration File
                </Label>
                <div className="bg-muted/50 p-4 rounded-md">
                  <div className="space-y-2">
                    <Label htmlFor="config-path">Configuration Path</Label>
                    <Input id="config-path" defaultValue=".deploy/config.yml" />
                    <p className="text-xs text-muted-foreground">
                      Relative path to configuration file in the repository
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="retry-strategy">Retry Strategy</Label>
                  <Select defaultValue="linear">
                    <SelectTrigger id="retry-strategy">
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Retries</SelectItem>
                      <SelectItem value="linear">Linear Backoff</SelectItem>
                      <SelectItem value="exponential">Exponential Backoff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retry-attempts">Max Retry Attempts</Label>
                  <Input id="retry-attempts" type="number" defaultValue="3" min="0" max="10" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave}>
          <Play size={16} className="mr-2" />
          Save & Run Pipeline
        </Button>
      </CardFooter>
    </Card>
  );
}
