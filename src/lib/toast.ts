import { toast } from 'sonner';

export function showSuccessToast(title: string, description?: string) {
  toast.success(title, {
    description,
    style: {
      backgroundColor: '#e6ffed',
      color: '#256029',
      border: '1px solid #a3d9a5',
    },
    descriptionClassName: 'text-success-description',
  });
}

export function showErrorToast(title: string, description?: string) {
  toast.error(title, {
    description,
    style: {
      backgroundColor: '#fff',
      color: '#d32f2f',
      border: '1px solid #f44336',
    },
    descriptionClassName: 'text-error-description',
  });
}
