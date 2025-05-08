
import React from 'react';
import { Pipeline } from '../types/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import StatusBadge from './StatusBadge';
import BuildSteps from './BuildSteps';
import { ArrowRight, GitBranch, GitCommit, Clock, User } from 'lucide-react';
import { getTimeAgo } from '../utils/mockData';

interface PipelineCardProps {
  pipeline: Pipeline;
}

const PipelineCard: React.FC<PipelineCardProps> = ({ pipeline }) => {
  return (
    <Card className="shadow-sm hover:shadow transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">{pipeline.name}</CardTitle>
          <StatusBadge status={pipeline.status} />
        </div>
        <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{getTimeAgo(pipeline.lastRun)}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitBranch size={14} />
            <span>{pipeline.branch}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitCommit size={14} />
            <span className="font-mono">{pipeline.commit}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{pipeline.author}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <BuildSteps steps={pipeline.steps} />
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        <div className="flex justify-between items-center w-full">
          <span className="text-xs text-muted-foreground">Duration: {pipeline.duration}</span>
          <button className="flex items-center text-xs font-medium text-primary hover:underline">
            View Details <ArrowRight size={12} className="ml-1" />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PipelineCard;
