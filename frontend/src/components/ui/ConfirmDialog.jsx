import { useTranslation } from 'react-i18next';
import Button from './Button';
import Modal from './Modal';

/**
 * Accessible delete/action confirmation dialog.
 * @param {boolean}    open
 * @param {() => void} onCancel
 * @param {() => void} onConfirm
 * @param {string}     title
 * @param {string}     message
 * @param {boolean}    loading
 */
export default function ConfirmDialog({
  open,
  onCancel,
  onConfirm,
  title,
  message,
  loading = false,
}) {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onCancel} title={title} size="sm">
      <p className="text-sm text-slate-600 mb-6">{message}</p>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          {t('common.cancel')}
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? t('transactions.saving') : t('common.confirm')}
        </Button>
      </div>
    </Modal>
  );
}
