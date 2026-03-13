type BarrierBreakdownProps = {
  data: { role: string; barrier: string }[];
};

export function BarrierBreakdown({ data }: BarrierBreakdownProps) {
  return (
    <div className="space-y-3 text-sm">
      {data.map((item, index) => (
        <div key={`${item.role}-${index}`} className="flex items-center justify-between border-b border-dotted border-mdlinx-secondary/20 pb-3">
          <span className="text-mdlinx-secondary">{item.role}</span>
          <span className="font-medium capitalize text-mdlinx-body">{item.barrier.replaceAll("_", " ")}</span>
        </div>
      ))}
    </div>
  );
}
