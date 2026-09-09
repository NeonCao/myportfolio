export const analyticsDashboardContent = {
  eyebrow: 'Local Site Analytics',
  heading: 'Click information across the site',
  description:
    'This dashboard summarizes clicks captured by this React app in the current browser. Because the portfolio is static, these numbers are local to this device unless a backend analytics service is connected later.',
  storedEventsLabel: 'Stored Events',
  refreshButtonLabel: 'Refresh Data',
  clearButtonLabel: 'Clear Local Data',
  totalsStats: [
    { key: 'allTime', label: 'All-Time Clicks', valueClassName: 'text-primary' },
    { key: 'sevenDays', label: 'Previous 7 Days', valueClassName: '' },
    { key: 'thirtyDays', label: 'Previous 30 Days', valueClassName: 'text-secondary' },
    { key: 'year', label: 'Previous 365 Days', valueClassName: 'text-accent' },
  ],
  table: {
    columns: ['Page', 'Path', 'All Time', '7 Days', '30 Days', '365 Days'],
  },
};

export default analyticsDashboardContent;
