type ScaleInputProps = {
  value: number | null;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  instruction?: string;
  minLabel?: string;
  maxLabel?: string;
};

export function ScaleInput({ value, onChange, min = 1, max = 5, instruction, minLabel, maxLabel }: ScaleInputProps) {
  return (
    <div className="space-y-3">
      {instruction ? <p className="text-sm text-mdlinx-secondary">{instruction}</p> : null}
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${max - min + 1}, minmax(0, 1fr))` }}>
        {Array.from({ length: max - min + 1 }, (_, index) => {
          const option = min + index;
          const selected = value === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`border px-3 py-4 text-sm font-semibold transition ${
                selected
                  ? "border-mdlinx-navy bg-mdlinx-navy text-white"
                  : "border-mdlinx-secondary/30 bg-white text-mdlinx-body hover:border-mdlinx-teal"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      <div className="flex items-start justify-between gap-4 text-xs uppercase tracking-[0.14em] text-mdlinx-secondary">
        <span className="max-w-[45%]">{minLabel}</span>
        <span className="max-w-[45%] text-right">{maxLabel}</span>
      </div>
    </div>
  );
}
