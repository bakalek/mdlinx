type ScaleInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export function ScaleInput({ value, onChange, min = 1, max = 5 }: ScaleInputProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
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
  );
}
