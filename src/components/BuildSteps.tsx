
import React, { useState } from 'react';
import { BuildStep } from '../types/types';
import StatusBadge from './StatusBadge';
import { cn } from '@/lib/utils';
import { ChevronRight, Terminal } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BuildStepsProps {
  steps: BuildStep[];
}

const BuildSteps: React.FC<BuildStepsProps> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  
  const progressVariants = {
    initial: { width: 0 },
    animate: (i: number) => ({
      width: `${(i + 1) * (100 / steps.length)}%`,
      transition: { duration: 0.5, ease: "easeInOut" }
    })
  };

  return (
    <div className="w-full space-y-3">
      {/* Progress tracker */}
      <div className="relative h-1 bg-muted rounded-full overflow-hidden">
        {steps.map((step, i) => {
          const isCompleted = step.status === 'success';
          const isFailed = step.status === 'failed';
          const isActive = step.status === 'running';
          
          if (isActive || isCompleted) {
            return (
              <motion.div
                key={step.id}
                className={cn(
                  "absolute top-0 left-0 h-full",
                  isCompleted ? "bg-success" : "bg-info"
                )}
                custom={i}
                variants={progressVariants}
                initial="initial"
                animate="animate"
              />
            );
          }
          if (isFailed) {
            return (
              <motion.div
                key={step.id}
                className="absolute top-0 left-0 h-full bg-error"
                custom={i}
                variants={progressVariants}
                initial="initial"
                animate="animate"
              />
            );
          }
          return null;
        })}
      </div>

      <Accordion type="single" collapsible value={activeStep || undefined} onValueChange={setActiveStep} className="w-full">
        {steps.map((step, index) => (
          <AccordionItem 
            key={step.id} 
            value={step.id}
            className={cn(
              "border border-border rounded-md mb-2 overflow-hidden",
              step.status === 'running' && "bg-info-lighter border-info",
              step.status === 'failed' && "bg-error-lighter border-error",
              step.status === 'success' && "bg-success-lighter/30"
            )}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AccordionTrigger className="py-2 px-3 hover:no-underline">
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
            </motion.div>
            <AccordionContent>
              <div className="p-3">
                {step.logs ? (
                  <div className="relative">
                    <div className="absolute top-2 right-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Terminal size={14} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View full log</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="bg-black rounded-md p-3 font-mono text-xs text-green-400 overflow-x-auto max-h-60 overflow-y-auto">
                      {step.logs.map((log, i) => (
                        <motion.div 
                          key={i} 
                          className="py-0.5"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          {log}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    No logs available for this step.
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default BuildSteps;
