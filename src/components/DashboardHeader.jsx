export default function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <div className="header-title">
        <h1>Global Yields</h1>
        <p>Real-time analysis of local stablecoin liquidity pools across 12 distinct regions.</p>
      </div>
      <div className="ai-status">
        <div className="status-dot"></div>
        AI Analysis Active
      </div>
    </header>
  );
}
