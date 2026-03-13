type MaturityGaugeProps = {
  value: number;
};

export function MaturityGauge({ value }: MaturityGaugeProps) {
  return (
    <div className="flex min-h-48 items-center justify-center border border-dotted border-mdlinx-secondary/30 bg-mdlinx-light">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-mdlinx-teal">Average maturity</p>
        <p className="font-serif text-6xl text-mdlinx-navy">{value.toFixed(1)}</p>
        <p className="text-sm text-mdlinx-secondary">out of 5</p>
      </div>
    </div>
  );
}
