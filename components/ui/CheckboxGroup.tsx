type Option = {
  value: string;
  label: string;
};

type CheckboxGroupProps = {
  options: Option[];
  values: string[];
  onChange: (values: string[]) => void;
  maxSelections?: number;
  showSelectionOrder?: boolean;
};

export function CheckboxGroup({ options, values, onChange, maxSelections, showSelectionOrder = false }: CheckboxGroupProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const checked = values.includes(option.value);
        const selectedOrder = values.indexOf(option.value);
        const selectionLimitReached = !checked && typeof maxSelections === "number" && values.length >= maxSelections;

        return (
          <label
            key={option.value}
            className={`flex items-start gap-3 border px-4 py-3 text-sm transition ${
              checked ? "border-mdlinx-teal bg-mdlinx-light" : "border-mdlinx-secondary/30"
            } ${selectionLimitReached ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`
            }
          >
            <input
              type="checkbox"
              className="mt-1"
              checked={checked}
              disabled={selectionLimitReached}
              onChange={() => {
                if (checked) {
                  onChange(values.filter((value) => value !== option.value));
                  return;
                }

                if (selectionLimitReached) {
                  return;
                }

                onChange([...values, option.value]);
              }}
            />
            {showSelectionOrder ? (
              <span
                className={`mt-0.5 inline-flex h-6 w-6 items-center justify-center border text-xs font-bold ${
                  checked
                    ? "border-mdlinx-teal bg-mdlinx-teal text-white"
                    : "border-mdlinx-secondary/30 text-mdlinx-secondary"
                }`}
              >
                {checked ? selectedOrder + 1 : ""}
              </span>
            ) : null}
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}
