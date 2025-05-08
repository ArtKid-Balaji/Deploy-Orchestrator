
import React from 'react';
import { StatusType } from '../types/types';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, AlertCircle, Clock, StopCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  showIcon?: boolean;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  showIcon = true,
  showLabel = true,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  const iconSize = {
    sm: 14,
    md: 16,
    lg: 18
  };

  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case 'success':
        return {
          bgColor: 'bg-success-lighter text-success-darker',
          icon: <CheckCircle size={iconSize[size]} className="text-success" />,
          label: 'Success'
        };
      case 'failed':
        return {
          bgColor: 'bg-error-lighter text-error-darker',
          icon: <XCircle size={iconSize[size]} className="text-error" />,
          label: 'Failed'
        };
      case 'running':
        return {
          bgColor: 'bg-info-lighter text-info-darker',
          icon: <AlertCircle size={iconSize[size]} className="text-info animate-bounce-gentle" />,
          label: 'Running'
        };
      case 'canceled':
        return {
          bgColor: 'bg-muted text-muted-foreground',
          icon: <StopCircle size={iconSize[size]} className="text-gray-500" />,
          label: 'Canceled'
        };
      case 'pending':
      default:
        return {
          bgColor: 'bg-pending-lighter text-pending-darker',
          icon: <Clock size={iconSize[size]} className="text-pending" />,
          label: 'Pending'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium gap-1',
        config.bgColor,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && config.icon}
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};

export default StatusBadge;
