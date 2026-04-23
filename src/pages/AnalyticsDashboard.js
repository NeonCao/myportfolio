import { useEffect, useMemo, useState } from 'react';
import { clearClickEvents, readClickEvents, summarizeClickEvents } from '../utils/clickAnalytics';

function getTotalForKey(rows, key) {
  return rows.reduce((total, row) => total + row[key], 0);
}

function AnalyticsDashboard() {
  const [events, setEvents] = useState(() => readClickEvents());

  function refreshEvents() {
    setEvents(readClickEvents());
  }

  useEffect(() => {
    window.addEventListener('storage', refreshEvents);
    window.addEventListener('focus', refreshEvents);
    window.addEventListener('portfolio-click-analytics-updated', refreshEvents);

    return () => {
      window.removeEventListener('storage', refreshEvents);
      window.removeEventListener('focus', refreshEvents);
      window.removeEventListener('portfolio-click-analytics-updated', refreshEvents);
    };
  }, []);

  const rows = useMemo(() => summarizeClickEvents(events), [events]);
  const totals = {
    allTime: getTotalForKey(rows, 'total'),
    sevenDays: getTotalForKey(rows, 'sevenDays'),
    thirtyDays: getTotalForKey(rows, 'thirtyDays'),
    year: getTotalForKey(rows, 'year'),
  };

  function handleClearData() {
    clearClickEvents();
  }

  return (
    <main className="min-h-screen bg-base-200">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Local Site Analytics</p>
            <h1 className="mt-3 text-5xl font-bold leading-tight md:text-6xl">Click information across the site</h1>
            <p className="mt-5 max-w-3xl leading-relaxed text-base-content/70">
              This dashboard summarizes clicks captured by this React app in the current browser. Because the
              portfolio is static, these numbers are local to this device unless a backend analytics service is
              connected later.
            </p>
          </div>

          <div className="rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-base-content/45">Stored Events</p>
            <p className="mt-3 text-5xl font-black text-primary">{events.length}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" className="btn btn-primary" onClick={refreshEvents}>
                Refresh Data
              </button>
              <button type="button" className="btn btn-outline" onClick={handleClearData}>
                Clear Local Data
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          <div className="stat rounded-[1.5rem] border border-base-300 bg-base-100 shadow-xl">
            <div className="stat-title">All-Time Clicks</div>
            <div className="stat-value text-primary">{totals.allTime}</div>
          </div>
          <div className="stat rounded-[1.5rem] border border-base-300 bg-base-100 shadow-xl">
            <div className="stat-title">Previous 7 Days</div>
            <div className="stat-value">{totals.sevenDays}</div>
          </div>
          <div className="stat rounded-[1.5rem] border border-base-300 bg-base-100 shadow-xl">
            <div className="stat-title">Previous 30 Days</div>
            <div className="stat-value text-secondary">{totals.thirtyDays}</div>
          </div>
          <div className="stat rounded-[1.5rem] border border-base-300 bg-base-100 shadow-xl">
            <div className="stat-title">Previous 365 Days</div>
            <div className="stat-value text-accent">{totals.year}</div>
          </div>
        </div>

        <section className="mt-10 overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Path</th>
                  <th className="text-right">All Time</th>
                  <th className="text-right">7 Days</th>
                  <th className="text-right">30 Days</th>
                  <th className="text-right">365 Days</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.path}>
                    <td className="font-semibold">{row.label}</td>
                    <td className="font-mono text-xs text-base-content/60">{row.path}</td>
                    <td className="text-right font-bold">{row.total}</td>
                    <td className="text-right">{row.sevenDays}</td>
                    <td className="text-right">{row.thirtyDays}</td>
                    <td className="text-right">{row.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}

export default AnalyticsDashboard;
