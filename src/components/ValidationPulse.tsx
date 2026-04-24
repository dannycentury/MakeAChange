const simulatedPulseData = [
  {
    topic: 'Animal Rights',
    active_students: 342,
    status: 'Trending',
  },
  {
    topic: 'Environmental Justice',
    active_students: 198,
    status: 'Steady',
  },
  {
    topic: 'Campus Equity',
    active_students: 276,
    status: 'Trending',
  },
];

export default function ValidationPulse() {
  return (
    <section className="card p-6 mb-6">
      <div className="space-y-5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-dusty-rose-dark">
            Pulse Tracker
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-charcoal">
            Student Interest Pulse (24h)
          </h2>
          <p className="mt-2 text-sm text-dark-grey max-w-2xl">
            This insight card shows how many students are exploring issues right now, giving you shared momentum before you even choose your next action.
          </p>
        </div>

        <div className="space-y-4">
          {simulatedPulseData.map((item) => (
            <div key={item.topic} className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal">{item.topic}</p>
                  <p className={`mt-1 text-xs font-semibold ${item.status === 'Trending' ? 'text-dusty-rose-dark' : 'text-dark-grey'}`}>
                    {item.status}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="relative flex h-4 w-4">
                    <span className="pulse-dot absolute inset-0" />
                  </span>
                  <span className="text-3xl font-semibold text-sage-green">
                    {item.active_students}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-sm text-dark-grey">
                {item.active_students} students at University of New Orleans are exploring {item.topic} today.
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-dusty-rose-light bg-dusty-rose-light/70 p-4">
          <p className="text-sm font-semibold text-dusty-rose-dark">
            🔥 High Engagement (Local NOLA):
          </p>
          <p className="mt-2 text-sm text-charcoal">
            Over 500 users explored “Animal Shelter Weekend Event” in the last 48 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
