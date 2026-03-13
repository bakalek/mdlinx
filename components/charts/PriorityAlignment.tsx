type PriorityAlignmentProps = {
  data: { label: string; value: number }[];
};

export function PriorityAlignment({ data }: PriorityAlignmentProps) {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.label} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-mdlinx-secondary">{item.label}</span>
            <span className="text-mdlinx-body">{item.value}</span>
          </div>
          <div className="h-2 bg-mdlinx-secondary/10">
            <div className="h-full bg-mdlinx-teal" style={{ width: `${item.value * 25}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
