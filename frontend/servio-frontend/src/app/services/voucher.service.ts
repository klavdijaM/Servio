import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Voucher {
  id: number;
  code: string;
  discount_type: 'percentage' | 'fixed' | 'free_delivery';
  discount_value: number;
}

@Injectable({
  providedIn: 'root'
})

export class VoucherService {

  private apiUrl = 'http://localhost:3000/vouchers';

  constructor(private http: HttpClient) {}

  validateVoucher(code: string) {
    // the expected backend response shape
    return this.http.post<{
      valid: boolean;
      reason?: string;
      voucher?: Voucher;
    }>(
      // http request
      `${this.apiUrl}/validate`,
      { code } // request body sent to backend
    );
  }
}
