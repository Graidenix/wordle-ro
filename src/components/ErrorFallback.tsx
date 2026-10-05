import { WarningIcon } from '@phosphor-icons/react';

const ErrorFallback: React.FC = () => (
  <div className="error-fallback" role="alert">
    <WarningIcon size={48} weight="fill" className="error-fallback__icon" aria-hidden="true" />
    <p className="error-fallback__text">Ups, ceva n-a mers bine.</p>
    <button type="button" className="button" onClick={() => window.location.reload()}>
      Reîncarcă
    </button>
  </div>
);

export default ErrorFallback;
