
import React from 'react';
import { Deployment } from '../types/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from './StatusBadge';
import { getTimeAgo } from '../utils/mockData';

interface DeploymentHistoryProps {
  deployments: Deployment[];
}

const DeploymentHistory: React.FC<DeploymentHistoryProps> = ({ deployments }) => {
  return (
    <div className="rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pipeline</TableHead>
            <TableHead>Environment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Triggered By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deployments.map((deployment) => (
            <TableRow key={deployment.id}>
              <TableCell className="font-medium">{deployment.pipelineName}</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs font-medium">
                  {deployment.environment}
                </span>
              </TableCell>
              <TableCell>
                <StatusBadge status={deployment.status} size="sm" />
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {getTimeAgo(deployment.timestamp)}
              </TableCell>
              <TableCell className="font-mono text-sm">{deployment.duration}</TableCell>
              <TableCell className="text-sm">{deployment.triggeredBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DeploymentHistory;
