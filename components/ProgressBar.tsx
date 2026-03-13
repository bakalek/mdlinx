type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const width = Math.min((currentStep / totalSteps) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-mdlinx-secondary">
        <span>Progress</span>
        <span>
          {currentStep} / {totalSteps}
        </span>
      </div>
      <div className="h-2 w-full bg-mdlinx-secondary/10">
        <div className="h-full bg-mdlinx-teal transition-all duration-300" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
