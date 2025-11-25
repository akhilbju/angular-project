import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.services';
import { PaymentService } from '../../services/payment.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface Video {
  id: string;
  name: string;
  link: string;
  genre: string;
  rating: number;
  description: string;
  price: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  currentVideo: Video | null = null;
  currentStreamUrl: SafeUrl | null = null;
  videoObjectUrl: string | null = null;
  videos: Video[] = [];

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer, private paymentService: PaymentService) {}

  ngOnInit() {
    this.apiService.getRecommendedMovies().subscribe({
      next: (data) => {
        this.videos = data;
      },
      error: (err) => {
        console.error('Failed to fetch videos', err);
      }
    });
  }

  playVideo(video: Video) {
    this.currentVideo = video;
    this.apiService.streamVideo(video.id).subscribe({
      next: (blob) => {
        const objectUrl = URL.createObjectURL(blob);
        this.videoObjectUrl = objectUrl; // Store for cleanup
        this.currentStreamUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      },
      error: (err) => {
        if (err.status === 402) {
          this.handlePayment(video);
        } else {
          console.error('Failed to stream video', err);
        }
      }
    });
  }

  handlePayment(video: Video) {
    const options = {
      key: 'rzp_test_1DP5mmOlF5G5ag', // Replace with your actual Razorpay Key ID
      amount: video.price * 100, // Amount in paise
      currency: 'INR',
      name: 'Video Stream',
      description: `Payment for ${video.name}`,
      image: 'https://angular.io/assets/images/logos/angular/angular.png',
      handler: (response: any) => {
        console.log('Payment successful', response);
        // Retry playing the video after successful payment
        // In a real app, you might verify the payment with the backend here
        this.playVideo(video);
      },
      prefill: {
        name: 'Sandeep',
        email: 'sandeep@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#3399cc'
      }
    };

    this.paymentService.openPayment(options).then(
      (response: any) => {
        console.log('Payment flow completed', response);
      },
      (error: any) => {
        console.error('Payment failed or cancelled', error);
      }
    );
  }

  closePlayer() {
    this.currentVideo = null;
    this.currentStreamUrl = null;
    if (this.videoObjectUrl) {
      URL.revokeObjectURL(this.videoObjectUrl);
      this.videoObjectUrl = null;
    }
  }
}
