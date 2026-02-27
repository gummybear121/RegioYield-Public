export default function MetricCard({ label, value, sub, highlight }) {
  return (
    <div className={`card ${highlight ? `highlight-${highlight}` : ''}`}>
      <div>
        <div className="metric-label">{label}</div>
        <div className="metric-value">{value}</div>
      </div>
      <div className="metric-sub">{sub}</div>
    </div>
  );
}
