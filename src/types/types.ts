
export type StatusType = 'success' | 'failed' | 'running' | 'pending' | 'canceled';

export interface BuildStep {
  id: string;
  name: string;
  status: StatusType;
  duration: string;
  startTime: string;
  logs?: string[];
}

export interface Pipeline {
  id: string;
  name: string;
  status: StatusType;
  lastRun: string;
  duration: string;
  branch: string;
  commit: string;
  author: string;
  steps: BuildStep[];
}

export interface Deployment {
  id: string;
  pipelineId: string;
  pipelineName: string;
  environment: string;
  status: StatusType;
  timestamp: string;
  duration: string;
  triggeredBy: string;
}

export interface DockerContainerInfo {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'stopped' | 'exited';
  created: string;
  ports: string;
  cpu: string;
  memory: string;
}
