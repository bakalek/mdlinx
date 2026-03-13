type Option = {
  value: string;
  label: string;
};

type RadioGroupProps = {
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export function RadioGroup({ name, options, value, onChange }: RadioGroupProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <label
            key={option.value}
            className={`flex cursor-pointer items-start gap-3 border px-4 py-3 text-sm transition ${
              selected ? "border-mdlinx-teal bg-mdlinx-light" : "border-mdlinx-secondary/30"
            }`}
          >
            <input
              type="radio"
              name={name}
              className="mt-1"
              checked={selected}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}
