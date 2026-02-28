import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const poolData = [
  {
    id: 1,
    poolId: 'brz',
    region: 'BR',
    regionClass: 'region-br',
    name: 'BRZ Stablecoin',
    peg: 'BRL Pegged',
    platform: 'Curve Finance',
    tvl: '$142M',
    risk: 'A+',
    yield: '8.92%',
  },
  {
    id: 2,
    poolId: 'jpyc',
    region: 'JP',
    regionClass: 'region-jp',
    name: 'JPYC Coin',
    peg: 'JPY Pegged',
    platform: 'Uniswap V3',
    tvl: '$89M',
    risk: 'B+',
    yield: '14.2%',
  },
  {
    id: 3,
    poolId: 'xsgd',
    region: 'SG',
    regionClass: 'region-jp',
    name: 'XSGD',
    peg: 'SGD Pegged',
    platform: 'StraitsX',
    tvl: '$10.6M',
    risk: 'A',
    yield: '4.18%',
  },
  {
    id: 4,
    poolId: 'cngn',
    region: 'NG',
    regionClass: 'region-ng',
    name: 'cNGN',
    peg: 'NGN Pegged',
    platform: 'Aave V3',
    tvl: '$45M',
    risk: 'B+',
    yield: '12.5%',
  },
  {
    id: 5,
    poolId: 'xidr',
    region: 'ID',
    regionClass: 'region-jp',
    name: 'XIDR',
    peg: 'IDR Pegged',
    platform: 'StraitsX',
    tvl: '$5.2M',
    risk: 'B+',
    yield: '5.2%',
  },
];

const filters = ['All', 'LATAM', 'APAC', 'AFRICA'];

export default function PoolsTable() {
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  return (
    <div className="pools-container">
      <div className="section-header">
        <div className="section-title">
          <span className="cube-icon"></span> Regional Performance
        </div>
        <div className="filter-group">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <table className="data-table">
        <thead>
            <tr>
              <th>Asset Name</th>
              <th>Platform</th>
              <th>TVL (24h)</th>
              <th>Risk</th>
              <th>Net Yield</th>
            </tr>
        </thead>
        <tbody>
          {poolData.map((pool) => (
            <tr 
              key={pool.id} 
              onClick={() => navigate(`/vault/${pool.poolId}`)}
              style={{ cursor: 'pointer' }}
              className="pool-row"
            >
              <td>
                <div className="col-pool">
                  <div className={`region-flag ${pool.regionClass}`}>
                    {pool.region}
                  </div>
                  <div>
                    <div>{pool.name}</div>
                    <div className="subtitle">{pool.peg}</div>
                  </div>
                </div>
              </td>
              <td>{pool.platform}</td>
              <td>{pool.tvl}</td>
              <td>
                <span className="risk-badge">{pool.risk}</span>
              </td>
              <td className="yield-val">{pool.yield}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
