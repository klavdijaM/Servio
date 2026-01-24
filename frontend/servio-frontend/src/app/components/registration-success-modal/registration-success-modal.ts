import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-registration-success-modal',
  standalone: true,
  template: `
    <div class="modal-backdrop">
      <div class="success-modal">
        <h2>Registration successful 🎉</h2>
        <p>You can now log in to your account.</p>

        <button class="primary-btn" (click)="goToLogin()">Go to login</button>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .success-modal {
      background: #fff;
      padding: 32px;
      border-radius: 16px;
      width: 360px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }

    .primary-btn {
      margin-top: 24px;
      padding: 12px 24px;
      border-radius: 999px;
      border: none;
      background: #f8bebc;
      font-weight: 600;
      cursor: pointer;
    }
  `]
})
export class RegistrationSuccessModal {
  @Output() loginRequested = new EventEmitter<void>();

  goToLogin() {
    this.loginRequested.emit();
  }
}
