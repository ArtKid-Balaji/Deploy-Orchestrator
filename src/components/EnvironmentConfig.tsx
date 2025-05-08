
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Server, CloudCog, Lock, Globe, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function EnvironmentConfig() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Environment settings saved",
      description: "Your environment configuration has been updated."
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Server size={20} />
          Environment Configuration
        </CardTitle>
        <CardDescription>
          Configure deployment environments and infrastructure settings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="environments">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="environments">Environments</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="secrets">Secrets & Variables</TabsTrigger>
          </TabsList>

          <TabsContent value="environments">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Deployment Environments</h3>
                <Button size="sm">
                  <Plus size={14} className="mr-1" /> Add Environment
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Production</TableCell>
                    <TableCell>
                      <Badge className="bg-error-lighter text-error-darker">Production</Badge>
                    </TableCell>
                    <TableCell>https://app.example.com</TableCell>
                    <TableCell>
                      <Badge className="bg-success-lighter text-success-darker">Active</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Staging</TableCell>
                    <TableCell>
                      <Badge className="bg-warning-lighter text-warning-darker">Staging</Badge>
                    </TableCell>
                    <TableCell>https://staging.example.com</TableCell>
                    <TableCell>
                      <Badge className="bg-success-lighter text-success-darker">Active</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Development</TableCell>
                    <TableCell>
                      <Badge className="bg-info-lighter text-info-darker">Development</Badge>
                    </TableCell>
                    <TableCell>https://dev.example.com</TableCell>
                    <TableCell>
                      <Badge className="bg-success-lighter text-success-darker">Active</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Card className="bg-muted/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Environment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="env-name">Environment Name</Label>
                      <Input id="env-name" defaultValue="Production" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="env-url">Base URL</Label>
                      <div className="flex items-center gap-2">
                        <Globe size={16} className="text-muted-foreground" />
                        <Input id="env-url" defaultValue="https://app.example.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="env-cluster">Cluster</Label>
                      <Input id="env-cluster" defaultValue="prod-cluster-east" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="env-namespace">Namespace</Label>
                      <Input id="env-namespace" defaultValue="production" />
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="env-auto-deploy" className="flex items-center gap-2">
                        Auto-deploy changes
                      </Label>
                      <Switch id="env-auto-deploy" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="env-approval" className="flex items-center gap-2">
                        Require approval before deployment
                      </Label>
                      <Switch id="env-approval" defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="infrastructure">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <CloudCog size={18} />
                <h3 className="text-lg font-medium">Infrastructure Providers</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-muted/50">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">AWS</CardTitle>
                      <Badge className="bg-success-lighter text-success-darker">Connected</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="aws-region">Region</Label>
                      <Input id="aws-region" defaultValue="us-east-1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aws-profile">Profile</Label>
                      <Input id="aws-profile" defaultValue="deployment-role" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">Kubernetes</CardTitle>
                      <Badge className="bg-success-lighter text-success-darker">Connected</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="k8s-context">Context</Label>
                      <Input id="k8s-context" defaultValue="prod-cluster" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="k8s-namespace">Default Namespace</Label>
                      <Input id="k8s-namespace" defaultValue="default" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6 h-[200px]">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Plus size={16} />
                    Add New Provider
                  </Button>
                </Card>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Cpu size={18} />
                  <h3 className="text-lg font-medium">Resource Allocation</h3>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Environment</TableHead>
                      <TableHead>CPU</TableHead>
                      <TableHead>Memory</TableHead>
                      <TableHead>Storage</TableHead>
                      <TableHead className="text-right">Scale</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Production</TableCell>
                      <TableCell>4 cores</TableCell>
                      <TableCell>8 GB</TableCell>
                      <TableCell>100 GB SSD</TableCell>
                      <TableCell className="text-right">1-10 replicas</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Staging</TableCell>
                      <TableCell>2 cores</TableCell>
                      <TableCell>4 GB</TableCell>
                      <TableCell>50 GB SSD</TableCell>
                      <TableCell className="text-right">1-3 replicas</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Development</TableCell>
                      <TableCell>1 core</TableCell>
                      <TableCell>2 GB</TableCell>
                      <TableCell>20 GB SSD</TableCell>
                      <TableCell className="text-right">1 replica</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="secrets">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock size={18} />
                  <h3 className="text-lg font-medium">Secrets Management</h3>
                </div>
                <Button size="sm">
                  <Plus size={14} className="mr-1" /> Add New Secret
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Environment</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">API_KEY</TableCell>
                    <TableCell>All</TableCell>
                    <TableCell>2 days ago</TableCell>
                    <TableCell>Secret</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">DATABASE_URL</TableCell>
                    <TableCell>Production</TableCell>
                    <TableCell>1 week ago</TableCell>
                    <TableCell>Secret</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">REDIS_PASSWORD</TableCell>
                    <TableCell>All</TableCell>
                    <TableCell>2 weeks ago</TableCell>
                    <TableCell>Secret</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Card className="bg-muted/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Add New Secret</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="secret-name">Secret Name</Label>
                      <Input id="secret-name" placeholder="e.g., API_KEY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secret-env">Environment</Label>
                      <Input id="secret-env" placeholder="All, Production, Staging..." defaultValue="All" />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="secret-value">Secret Value</Label>
                      <Input id="secret-value" type="password" placeholder="Enter secret value" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Save Secret</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave}>Save Settings</Button>
      </CardFooter>
    </Card>
  );
}
