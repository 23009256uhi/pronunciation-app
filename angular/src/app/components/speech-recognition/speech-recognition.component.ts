import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-speech-recognition',
  standalone: true,
  imports: [],
  templateUrl: './speech-recognition.component.html',
  styleUrl: './speech-recognition.component.css',
})
export class SpeechRecognitionComponent {
  inputValue: string = '';

  constructor(private router: Router) {}

  navigateToResults() {
    this.router.navigate([`/search/${this.inputValue}`]); // Navigate to results page
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.navigateToResults();
    }
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.inputValue = target.value;
  }
}
