type Option = {
  value: string;
  label: string;
};

type CheckboxGroupProps = {
  options: Option[];
  values: string[];
  onChange: (values: string[]) => void;
};

export function CheckboxGroup({ options, values, onChange }: CheckboxGroupProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const checked = values.includes(option.value);

        return (
          <label
            key={option.value}
            className={`flex cursor-pointer items-start gap-3 border px-4 py-3 text-sm transition ${
              checked ? "border-mdlinx-teal bg-mdlinx-light" : "border-mdlinx-secondary/30"
            }`}
          >
            <input
              type="checkbox"
              className="mt-1"
              checked={checked}
              onChange={() => {
                if (checked) {
                  onChange(values.filter((value) => value !== option.value));
                } else {
                  onChange([...values, option.value]);
                }
              }}
            />
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}
