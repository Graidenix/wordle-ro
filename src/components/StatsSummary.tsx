import { useMemo } from 'react';
import { useStats } from '../contexts/StatsContext';
import { buildStatsItems } from '../utils/buildStatsItems';

const StatsSummary: React.FC = () => {
  const stats = useStats();
  const items = useMemo(() => buildStatsItems(stats), [stats]);

  return (
    <dl className="stats">
      {items.map((item) => (
        <div key={item.id} className="stats__item">
          <dt className="stats__label">{item.label}</dt>
          <dd className="stats__value">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
};

export default StatsSummary;
