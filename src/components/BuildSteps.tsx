
import React from 'react';
import { BuildStep } from '../types/types';
import StatusBadge from './StatusBadge';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface BuildStepsProps {
  steps: BuildStep[];
}

const BuildSteps: React.FC<BuildStepsProps> = ({ steps }) => {
  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full">
        {steps.map((step) => (
          <AccordionItem key={step.id} value={step.id}>
            <AccordionTrigger className="py-2 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-2">
                <div className="flex items-center space-x-3">
                  <StatusBadge status={step.status} size="sm" />
                  <span className="font-medium text-sm">{step.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-muted-foreground">{step.startTime ? new Date(step.startTime).toLocaleTimeString() : '-'}</span>
                  <span className="text-xs font-mono">{step.duration}</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {step.logs ? (
                <div className="bg-black rounded-md p-3 font-mono text-xs text-green-400 overflow-x-auto max-h-60 overflow-y-auto">
                  {step.logs.map((log, i) => (
                    <div key={i} className="py-0.5">
                      {log}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  No logs available for this step.
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default BuildSteps;
