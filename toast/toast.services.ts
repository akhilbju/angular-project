import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(message: string, type: 'success' | 'error' = 'success') {
    const id = Date.now();
    this.toasts.push({ id, message, type });

    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
    }, 3000); // auto-close in 3 seconds
  }
}
