import { XIcon } from '@phosphor-icons/react';
import { useEffect, type MouseEvent, type ReactNode } from 'react';
import { classNames } from '../utils/classNames';

interface Props {
  titleId: string;
  isDelayed?: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const Modal: React.FC<Props> = (props) => {
  const { titleId, isDelayed = false, onClose, children } = props;
  const backdropClassName = classNames('modal-backdrop', isDelayed && 'modal-backdrop--delayed');
  const modalClassName = classNames('modal', isDelayed && 'modal--delayed');

  useEffect(() => {
    if (!onClose) return;
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key !== 'Escape') return;
      onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (ev: MouseEvent<HTMLDivElement>) => {
    if (ev.target !== ev.currentTarget) return;
    onClose?.();
  };

  return (
    <div className={backdropClassName} onClick={handleBackdropClick}>
      <div className={modalClassName} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        {onClose && (
          <button type="button" className="modal__close" aria-label="Închide" onClick={onClose}>
            <XIcon size={20} weight="bold" aria-hidden="true" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
