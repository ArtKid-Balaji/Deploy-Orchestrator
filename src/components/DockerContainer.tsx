
import React from 'react';
import { DockerContainerInfo } from '../types/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Square, RotateCw, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DockerContainerProps {
  container: DockerContainerInfo;
}

const DockerContainer: React.FC<DockerContainerProps> = ({ container }) => {
  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-success bg-success-lighter';
      case 'exited':
        return 'text-error bg-error-lighter';
      case 'stopped':
        return 'text-warning bg-warning-lighter';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <span className="w-2 h-2 rounded-full bg-success animate-pulse mr-1.5" />;
      case 'exited':
        return <AlertCircle size={14} className="mr-1.5 text-error" />;
      case 'stopped':
        return <Square size={14} className="mr-1.5 text-warning" />;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium flex items-center">
            <span className="truncate">{container.name}</span>
          </CardTitle>
          <span
            className={cn(
              'flex items-center text-xs px-2 py-0.5 rounded-full font-medium',
              getStatusClasses(container.status)
            )}
          >
            {getStatusIcon(container.status)}
            {container.status}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1 truncate">{container.image}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-y-2 text-xs mb-3">
          <div className="text-muted-foreground">Container ID:</div>
          <div className="font-mono truncate">{container.id}</div>
          <div className="text-muted-foreground">Ports:</div>
          <div>{container.ports}</div>
          <div className="text-muted-foreground">Created:</div>
          <div>{new Date(container.created).toLocaleString()}</div>
          <div className="text-muted-foreground">CPU Usage:</div>
          <div>{container.cpu}</div>
          <div className="text-muted-foreground">Memory:</div>
          <div>{container.memory}</div>
        </div>
        <div className="flex space-x-2 mt-2">
          {container.status !== 'running' ? (
            <Button size="sm" variant="outline" className="h-7 text-xs w-full" disabled={container.status === 'exited'}>
              <Play size={12} className="mr-1" /> Start
            </Button>
          ) : (
            <Button size="sm" variant="outline" className="h-7 text-xs w-full">
              <Square size={12} className="mr-1" /> Stop
            </Button>
          )}
          <Button size="sm" variant="outline" className="h-7 text-xs w-full">
            <RotateCw size={12} className="mr-1" /> Restart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DockerContainer;
