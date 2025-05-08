
import React, { useState } from 'react';
import { Pipeline } from '../types/types';
import PipelineCard from './PipelineCard';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface PipelineListProps {
  pipelines: Pipeline[];
}

const PipelineList: React.FC<PipelineListProps> = ({ pipelines }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [expandedView, setExpandedView] = useState(false);

  const toggleView = () => {
    setViewMode(prev => prev === 'grid' ? 'compact' : 'grid');
  };

  const toggleExpandView = () => {
    setExpandedView(prev => !prev);
  };

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Animation variants for each card
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">
            {pipelines.length} Pipelines Running
          </h3>
          <p className="text-sm text-muted-foreground">
            {pipelines.filter(p => p.status === 'success').length} successful,
            {' '}{pipelines.filter(p => p.status === 'failed').length} failed
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleView}
            className="flex items-center gap-1"
          >
            {viewMode === 'grid' ? 'Compact View' : 'Grid View'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleExpandView}
            className="flex items-center gap-1"
          >
            {expandedView ? (
              <>
                <ChevronUp size={16} /> Collapse
              </>
            ) : (
              <>
                <ChevronDown size={16} /> Expand All
              </>
            )}
          </Button>
        </div>
      </div>

      <motion.div 
        className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2' : 'grid-cols-1'} gap-6`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {pipelines.map((pipeline) => (
          <motion.div key={pipeline.id} variants={cardVariants}>
            <PipelineCard pipeline={pipeline} expandedByDefault={expandedView} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PipelineList;
