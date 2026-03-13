type UrgencySpectrumProps = {
  data: { name: string; role: string; urgency: number }[];
};

export function UrgencySpectrum({ data }: UrgencySpectrumProps) {
  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.name} className="grid grid-cols-[120px_1fr_24px] items-center gap-3 text-sm">
          <span className="text-mdlinx-secondary">{item.name}</span>
          <div className="flex gap-2">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={`h-3 flex-1 ${
                  index < item.urgency ? "bg-mdlinx-red" : "bg-mdlinx-secondary/10"
                }`}
              />
            ))}
          </div>
          <span className="text-right text-mdlinx-body">{item.urgency}</span>
        </div>
      ))}
    </div>
  );
}
