type AdoptionChartProps = {
  data: { label: string; value: number }[];
};

export function AdoptionChart({ data }: AdoptionChartProps) {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.label} className="space-y-1">
          <div className="flex items-center justify-between text-sm text-mdlinx-secondary">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
          <div className="h-3 bg-mdlinx-secondary/10">
            <div className="h-full bg-mdlinx-teal" style={{ width: `${item.value * 20}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
