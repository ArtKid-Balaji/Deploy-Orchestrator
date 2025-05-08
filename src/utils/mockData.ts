
import { Pipeline, Deployment, DockerContainerInfo } from '../types/types';

export const mockPipelines: Pipeline[] = [
  {
    id: "p1",
    name: "web-frontend",
    status: "success",
    lastRun: "2025-05-08T08:30:00Z",
    duration: "4m 12s",
    branch: "main",
    commit: "a7c3e9d",
    author: "Sarah Chen",
    steps: [
      { id: "s1p1", name: "Checkout", status: "success", duration: "4s", startTime: "2025-05-08T08:30:00Z" },
      { id: "s2p1", name: "Install Dependencies", status: "success", duration: "1m 2s", startTime: "2025-05-08T08:30:04Z" },
      { id: "s3p1", name: "Lint", status: "success", duration: "35s", startTime: "2025-05-08T08:31:06Z" },
      { id: "s4p1", name: "Unit Tests", status: "success", duration: "1m 20s", startTime: "2025-05-08T08:31:41Z" },
      { id: "s5p1", name: "Build", status: "success", duration: "45s", startTime: "2025-05-08T08:33:01Z" },
      { id: "s6p1", name: "Docker Build", status: "success", duration: "26s", startTime: "2025-05-08T08:33:46Z" },
    ]
  },
  {
    id: "p2",
    name: "api-service",
    status: "running",
    lastRun: "2025-05-08T09:15:00Z",
    duration: "2m 30s (running)",
    branch: "feature/new-endpoints",
    commit: "b8d45f1",
    author: "Michael Rodriguez",
    steps: [
      { id: "s1p2", name: "Checkout", status: "success", duration: "3s", startTime: "2025-05-08T09:15:00Z" },
      { id: "s2p2", name: "Install Dependencies", status: "success", duration: "45s", startTime: "2025-05-08T09:15:03Z" },
      { id: "s3p2", name: "Lint", status: "success", duration: "28s", startTime: "2025-05-08T09:15:48Z" },
      { id: "s4p2", name: "Unit Tests", status: "running", duration: "1m 14s (running)", startTime: "2025-05-08T09:16:16Z" },
      { id: "s5p2", name: "Build", status: "pending", duration: "0s", startTime: "" },
      { id: "s6p2", name: "Docker Build", status: "pending", duration: "0s", startTime: "" },
    ]
  },
  {
    id: "p3",
    name: "database-migrations",
    status: "failed",
    lastRun: "2025-05-08T07:45:00Z",
    duration: "1m 32s",
    branch: "main",
    commit: "c6f2e1a",
    author: "Alex Thompson",
    steps: [
      { id: "s1p3", name: "Checkout", status: "success", duration: "4s", startTime: "2025-05-08T07:45:00Z" },
      { id: "s2p3", name: "Install Dependencies", status: "success", duration: "38s", startTime: "2025-05-08T07:45:04Z" },
      { id: "s3p3", name: "Lint", status: "success", duration: "22s", startTime: "2025-05-08T07:45:42Z" },
      { id: "s4p3", name: "Migration Tests", status: "failed", duration: "28s", startTime: "2025-05-08T07:46:04Z", 
        logs: [
          "Running migration test suite...",
          "Testing migration 20250503_add_user_preferences...",
          "Testing migration 20250504_update_indexes...",
          "Error: Constraint violation in migration 20250504_update_indexes",
          "Details: Foreign key constraint failed for table 'user_settings'",
          "Migration tests failed!"
        ]
      },
    ]
  },
  {
    id: "p4",
    name: "analytics-service",
    status: "pending",
    lastRun: "2025-05-08T09:30:00Z",
    duration: "0s",
    branch: "develop",
    commit: "d9e7b3c",
    author: "Jamie Wilson",
    steps: [
      { id: "s1p4", name: "Checkout", status: "pending", duration: "0s", startTime: "" },
      { id: "s2p4", name: "Install Dependencies", status: "pending", duration: "0s", startTime: "" },
      { id: "s3p4", name: "Tests", status: "pending", duration: "0s", startTime: "" },
      { id: "s4p4", name: "Build", status: "pending", duration: "0s", startTime: "" },
      { id: "s5p4", name: "Docker Build", status: "pending", duration: "0s", startTime: "" },
    ]
  },
];

export const mockDeployments: Deployment[] = [
  {
    id: "d1",
    pipelineId: "p1",
    pipelineName: "web-frontend",
    environment: "production",
    status: "success",
    timestamp: "2025-05-08T08:35:00Z",
    duration: "2m 45s",
    triggeredBy: "Automated - CI/CD Pipeline",
  },
  {
    id: "d2",
    pipelineId: "p1",
    pipelineName: "web-frontend",
    environment: "staging",
    status: "success",
    timestamp: "2025-05-07T15:20:00Z",
    duration: "2m 30s",
    triggeredBy: "Sarah Chen",
  },
  {
    id: "d3",
    pipelineId: "p2",
    pipelineName: "api-service",
    environment: "development",
    status: "success",
    timestamp: "2025-05-07T14:10:00Z",
    duration: "1m 55s",
    triggeredBy: "Michael Rodriguez",
  },
  {
    id: "d4",
    pipelineId: "p3",
    pipelineName: "database-migrations",
    environment: "staging",
    status: "failed",
    timestamp: "2025-05-07T10:45:00Z",
    duration: "45s",
    triggeredBy: "Alex Thompson",
  },
  {
    id: "d5",
    pipelineId: "p1",
    pipelineName: "web-frontend",
    environment: "production",
    status: "success",
    timestamp: "2025-05-06T11:30:00Z",
    duration: "3m 10s",
    triggeredBy: "Automated - CI/CD Pipeline",
  }
];

export const mockDockerContainers: DockerContainerInfo[] = [
  {
    id: "c123abc",
    name: "web-frontend-prod",
    image: "mycompany/web-frontend:latest",
    status: "running",
    created: "2025-05-08T08:35:00Z",
    ports: "80:3000",
    cpu: "0.5%",
    memory: "156MB / 512MB"
  },
  {
    id: "c456def",
    name: "api-service-dev",
    image: "mycompany/api-service:develop",
    status: "running",
    created: "2025-05-07T14:15:00Z",
    ports: "8080:8080",
    cpu: "1.2%",
    memory: "245MB / 1GB"
  },
  {
    id: "c789ghi",
    name: "database-staging",
    image: "postgres:14",
    status: "running",
    created: "2025-05-05T09:20:00Z",
    ports: "5432:5432",
    cpu: "0.8%",
    memory: "312MB / 1GB"
  },
  {
    id: "c012jkl",
    name: "redis-cache",
    image: "redis:7",
    status: "running",
    created: "2025-05-05T09:25:00Z",
    ports: "6379:6379",
    cpu: "0.2%",
    memory: "48MB / 256MB"
  },
  {
    id: "c345mno",
    name: "legacy-service",
    image: "mycompany/legacy-service:v2",
    status: "stopped",
    created: "2025-05-03T12:40:00Z",
    ports: "8000:8000",
    cpu: "0%",
    memory: "0MB / 512MB"
  }
];

export const getTimeAgo = (dateString: string): string => {
  if (!dateString) return '';
  
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};
