import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.services';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div class="toast-container">
      <div class="toast" 
           *ngFor="let t of toastService.toasts"
           [ngClass]="t.type">
        {{ t.message }}
      </div>
    </div>
  `,
  imports: [CommonModule],
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}
