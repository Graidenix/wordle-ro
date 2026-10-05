import { useMemo } from 'react';
import { useStats } from '../contexts/StatsContext';
import { buildDistributionBars } from '../utils/buildDistributionBars';

interface Props {
  highlightAttempt: number | null;
}

const GuessDistribution: React.FC<Props> = (props) => {
  const { highlightAttempt } = props;
  const { distribution } = useStats();
  const bars = useMemo(() => buildDistributionBars(distribution, highlightAttempt), [distribution, highlightAttempt]);

  return (
    <section className="distribution" aria-labelledby="distribution-title">
      <h3 id="distribution-title" className="distribution__title">
        Distribuția încercărilor
      </h3>
      {bars.map((bar) => (
        <div key={bar.id} className="distribution__row">
          <span className="distribution__attempt">{bar.attempt}</span>
          <span
            className="distribution__bar"
            data-highlighted={bar.isHighlighted}
            style={{ width: bar.width }}
          >
            {bar.count}
          </span>
        </div>
      ))}
    </section>
  );
};

export default GuessDistribution;
