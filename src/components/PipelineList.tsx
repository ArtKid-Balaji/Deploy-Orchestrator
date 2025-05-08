
import React from 'react';
import { Pipeline } from '../types/types';
import PipelineCard from './PipelineCard';

interface PipelineListProps {
  pipelines: Pipeline[];
}

const PipelineList: React.FC<PipelineListProps> = ({ pipelines }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {pipelines.map((pipeline) => (
        <PipelineCard key={pipeline.id} pipeline={pipeline} />
      ))}
    </div>
  );
};

export default PipelineList;
