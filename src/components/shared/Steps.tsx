interface StepsProps {
  items: { title: string; text: string }[]
}

export function Steps({ items }: StepsProps) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((step, i) => (
        <li key={step.title} className="rounded-xl border bg-card p-7">
          <span className="mb-4 inline-block rounded-full bg-gold/15 px-3 py-1 text-sm font-extrabold text-gold-700">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
          <p className="text-muted-foreground">{step.text}</p>
        </li>
      ))}
    </ol>
  )
}
