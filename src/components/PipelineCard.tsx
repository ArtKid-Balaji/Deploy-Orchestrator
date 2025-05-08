
import React, { useState } from 'react';
import { Pipeline } from '../types/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import StatusBadge from './StatusBadge';
import BuildSteps from './BuildSteps';
import { ArrowRight, GitBranch, GitCommit, Clock, User, ChevronDown, ChevronUp } from 'lucide-react';
import { getTimeAgo } from '../utils/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface PipelineCardProps {
  pipeline: Pipeline;
  expandedByDefault?: boolean;
}

const PipelineCard: React.FC<PipelineCardProps> = ({ pipeline, expandedByDefault = false }) => {
  const [expanded, setExpanded] = useState(expandedByDefault);

  return (
    <Card className={`shadow-sm hover:shadow transition-shadow duration-200 border-l-4 ${getStatusBorderColor(pipeline.status)}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold group">
            <span className="group-hover:underline cursor-pointer">{pipeline.name}</span>
            <span className={`ml-2 text-xs font-normal ${getStatusTextColor(pipeline.status)}`}>#{pipeline.id.substring(0, 6)}</span>
          </CardTitle>
          <StatusBadge status={pipeline.status} />
        </div>
        <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-md">
            <Clock size={14} />
            <span>{getTimeAgo(pipeline.lastRun)}</span>
          </div>
          <div className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-md">
            <GitBranch size={14} />
            <span>{pipeline.branch}</span>
          </div>
          <div className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-md">
            <GitCommit size={14} />
            <span className="font-mono">{pipeline.commit.substring(0, 7)}</span>
          </div>
          <div className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-md">
            <User size={14} />
            <span>{pipeline.author}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setExpanded(!expanded)} 
          className="w-full flex items-center justify-between mb-2 bg-muted/30 hover:bg-muted"
        >
          <span>Build Steps</span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
        
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <BuildSteps steps={pipeline.steps} />
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4">
        <div className="flex justify-between items-center w-full">
          <span className="text-xs text-muted-foreground">Duration: {pipeline.duration}</span>
          <motion.button 
            whileHover={{ x: 5 }}
            className="flex items-center text-xs font-medium text-primary hover:underline"
          >
            View Details <ArrowRight size={12} className="ml-1" />
          </motion.button>
        </div>
      </CardFooter>
    </Card>
  );
};

function getStatusBorderColor(status: string): string {
  switch (status) {
    case 'success':
      return 'border-success';
    case 'failed':
      return 'border-error';
    case 'running':
      return 'border-info';
    case 'pending':
      return 'border-pending';
    case 'canceled':
      return 'border-muted';
    default:
      return 'border-muted';
  }
}

function getStatusTextColor(status: string): string {
  switch (status) {
    case 'success':
      return 'text-success';
    case 'failed':
      return 'text-error';
    case 'running':
      return 'text-info';
    case 'pending':
      return 'text-pending';
    case 'canceled':
      return 'text-muted-foreground';
    default:
      return 'text-muted-foreground';
  }
}

export default PipelineCard;
