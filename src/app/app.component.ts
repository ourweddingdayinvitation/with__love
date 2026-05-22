import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  audio!: HTMLAudioElement;
  isPlaying = false;

  /** Sept 5, 2026 (local calendar date) */
  private readonly weddingDate = new Date(2026, 8, 5, 0, 0, 0, 0);

  countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  isWeddingDayOrPast = false;
  private countdownInterval: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.audio = document.getElementById('bg-music') as HTMLAudioElement;
    this.audio.loop = true;

    // Start muted so autoplay works
    this.audio.muted = true;

    this.updateCountdown();
    this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  private updateCountdown(): void {
    const end = this.weddingDate.getTime();
    const now = Date.now();
    const diff = end - now;

    if (diff <= 0) {
      this.isWeddingDayOrPast = true;
      this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
      }
      return;
    }

    this.isWeddingDayOrPast = false;
    const totalSec = Math.floor(diff / 1000);
    this.countdown = {
      days: Math.floor(totalSec / 86400),
      hours: Math.floor((totalSec % 86400) / 3600),
      minutes: Math.floor((totalSec % 3600) / 60),
      seconds: totalSec % 60,
    };
  }

  pad2(n: number): string {
    return n.toString().padStart(2, '0');
  }

  toggleAudio() {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
      // On user interaction unmute and play
      this.audio.muted = false;
      this.audio.play();
      this.isPlaying = true;
    }
  }
}
