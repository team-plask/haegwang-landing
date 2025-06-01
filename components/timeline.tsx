

export interface TimelineItem {
  name: string;
  dateTime: string;
  date: string;
  description: string;
}

export default function Timeline({ timelineitems }: { timelineitems: TimelineItem[] }) {
  return (
    <div className="mx-auto -mt-8 max-w-7xl px-6 lg:px-8">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
        {timelineitems.map((item) => (
          <div key={item.name}>
      <time dateTime={item.dateTime} className="flex items-center text-sm/6 font-semibold text-brand">
        <svg viewBox="0 0 4 4" aria-hidden="true" className="mr-4 size-1 flex-none">
          <circle r={2} cx={2} cy={2} fill="currentColor" />
        </svg>
        {item.date}
        <div
          aria-hidden="true"
          className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
        />
      </time>
      <p className="mt-6 text-lg/8 font-semibold tracking-tight text-gray-900">{item.name}</p>
      <p className="mt-1 text-base/7 text-gray-600">{item.description}</p>
    </div>
  ))}
</div>
</div>
  );
}
