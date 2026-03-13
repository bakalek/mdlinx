type WordCloudProps = {
  items: string[];
};

export function WordCloud({ items }: WordCloudProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <span key={item} className="border border-dotted border-mdlinx-teal px-3 py-2 text-sm text-mdlinx-navy">
          {item}
        </span>
      ))}
    </div>
  );
}
