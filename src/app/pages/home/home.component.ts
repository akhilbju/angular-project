import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.services';
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

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer) {}

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
        console.error('Failed to stream video', err);
      }
    });
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
