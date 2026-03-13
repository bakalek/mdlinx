type ToolLandscapeProps = {
  data: { label: string; value: number }[];
};

export function ToolLandscape({ data }: ToolLandscapeProps) {
  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.label} className="grid grid-cols-[120px_1fr_32px] items-center gap-3 text-sm">
          <span className="text-mdlinx-secondary">{item.label}</span>
          <div className="h-3 bg-mdlinx-secondary/10">
            <div className="h-full bg-mdlinx-navy" style={{ width: `${item.value * 25}%` }} />
          </div>
          <span className="text-right text-mdlinx-body">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
