import Nav from '../components/Nav';
import DashboardHeader from '../components/DashboardHeader';
import MetricCard from '../components/MetricCard';
import PoolsTable from '../components/PoolsTable';
import Analytics from '../components/Analytics';

const metrics = [
  {
    label: 'Total Value Locked',
    value: '$4.2B',
    sub: <><span className="trend-up">↗ 2.4%</span> vs last week</>,
  },
  {
    label: 'Highest Region',
    value: '14.2%',
    sub: 'Japan (JPYC) Pool',
    highlight: 'purple',
  },
  {
    label: 'Trending',
    value: '8.9%',
    sub: 'Brazil (BRZ) Pool',
    highlight: 'gold',
  },
  {
    label: 'Risk Index',
    value: 'Low',
    sub: '0.12 Volatility Score',
  },
];

export default function Dashboard() {
  return (
    <div className="layout">
      <Nav />
      <DashboardHeader />
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
      <div className="content-split">
        <PoolsTable />
        <Analytics />
      </div>
    </div>
  );
}
