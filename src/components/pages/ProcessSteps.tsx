import { Check } from 'lucide-react';
import { cn } from '../ui/utils';

interface ProcessStepsProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  { number: 1, label: 'Choose file' },
  { number: 2, label: 'Process' },
  { number: 3, label: 'Download' },
];

export function ProcessSteps({ currentStep }: ProcessStepsProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                  currentStep > step.number
                    ? 'bg-primary text-primary-foreground'
                    : currentStep === step.number
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {currentStep > step.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <span
                className={cn(
                  'mt-2 transition-colors',
                  currentStep >= step.number
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 h-[2px] mx-4 mt-[-24px]">
                <div
                  className={cn(
                    'h-full transition-all',
                    currentStep > step.number
                      ? 'bg-primary'
                      : 'bg-muted'
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
