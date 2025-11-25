import { Injectable } from '@angular/core';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }

  openPayment(options: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const rzp = new Razorpay({
        ...options,
        handler: (response: any) => {
          resolve(response);
        },
        modal: {
          ondismiss: () => {
            reject('Payment cancelled');
          }
        }
      });
      rzp.open();
    });
  }
}
