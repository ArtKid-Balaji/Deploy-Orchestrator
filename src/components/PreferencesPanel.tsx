
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Settings, Bell, Clock, User, Palette, Shield } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function PreferencesPanel() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoRefreshInterval, setAutoRefreshInterval] = useState(30);
  const { toast } = useToast();

  const handleSavePreferences = () => {
    toast({
      title: "Preferences saved",
      description: "Your preferences have been saved successfully."
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Settings size={20} />
          User Preferences
        </CardTitle>
        <CardDescription>
          Customize your deployment orchestrator experience.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Clock size={18} />
                    Auto-refresh
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically refresh pipeline statuses
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-refresh"
                    checked={autoRefreshInterval > 0}
                    onCheckedChange={(checked) => setAutoRefreshInterval(checked ? 30 : 0)}
                  />
                </div>
              </div>

              {autoRefreshInterval > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="refresh-interval">Refresh Interval: {autoRefreshInterval}s</Label>
                  </div>
                  <Slider
                    id="refresh-interval"
                    min={5}
                    max={60}
                    step={5}
                    value={[autoRefreshInterval]}
                    onValueChange={(value) => setAutoRefreshInterval(value[0])}
                  />
                  <span className="flex justify-between text-xs text-muted-foreground">
                    <span>5s</span>
                    <span>60s</span>
                  </span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="default-environment">Default Environment</Label>
                <Input id="default-environment" defaultValue="production" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Bell size={18} />
                    Push Notifications
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get notified when builds complete or fail
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notifications"
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
              </div>

              {notificationsEnabled && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="notification-success" defaultChecked />
                    <Label htmlFor="notification-success">Successful builds</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notification-failed" defaultChecked />
                    <Label htmlFor="notification-failed">Failed builds</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notification-started" />
                    <Label htmlFor="notification-started">Started builds</Label>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="appearance">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                  <Palette size={18} />
                  Theme Options
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-sm">Select theme:</span>
                  <ThemeSwitcher />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="density">UI Density</Label>
                <Slider
                  id="density"
                  min={0}
                  max={2}
                  step={1}
                  defaultValue={[1]}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Compact</span>
                  <span>Comfortable</span>
                  <span>Spacious</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Shield size={18} />
                  Security Settings
                </h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  Manage your account security preferences.
                </p>

                <div className="flex items-center space-x-2 mb-4">
                  <Switch id="security-session" defaultChecked />
                  <Label htmlFor="security-session">Auto-logout after 30 minutes of inactivity</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="security-api" />
                  <Label htmlFor="security-api">Require confirmation for API key usage</Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reset to Defaults</Button>
        <Button onClick={handleSavePreferences}>Save Preferences</Button>
      </CardFooter>
    </Card>
  );
}
