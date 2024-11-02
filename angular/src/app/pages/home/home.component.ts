import { Component } from '@angular/core';
import { SpeechRecognitionComponent } from '../../components/speech-recognition/speech-recognition.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SpeechRecognitionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
