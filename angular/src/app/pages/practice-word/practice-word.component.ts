import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-practice-word',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './practice-word.component.html',
  styleUrl: './practice-word.component.css',
})
export class PracticeWordComponent {
  word: string = '';
  phonetic: string = '';
  instructions: string = '';
  isRecording: boolean = false;
  transcript: string = '';
  feedback: string = '';
  recognitionRef: any = null;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    // const navigation = this.router.getCurrentNavigation();
    // const state = navigation?.extras?.state as {
    //   word: string;
    //   phonetic: string;
    // };

    // GET WORD AND PHONETIC
    const state = history.state as { word: string; phonetic: string };

    this.word = state?.word;
    this.phonetic = state?.phonetic;

    console.log(this.instructions);

    // GET INSTRUCTIONS
    if (this.phonetic) {
      this.getInstruction(this.phonetic);
    }

    console.log(this.instructions);
  }

  // GET INSTRUCTIONS FUNCTION--------------------------------------------------------
  getInstruction(phonetic: string): void {
    this.http
      .post('http://localhost:5000/instructions', { phonetic: phonetic })
      .subscribe(
        (response: any) => {
          this.instructions = response;
        },
        (error: any) => {
          console.error('Error getting instructions:', error);
        }
      );
  }

  // START RECORDING VOICE FUNCTION--------------------------------------------------------
  startRecording(): void {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    this.recognitionRef.current = recognition;

    recognition.lang = 'en-GB';
    recognition.continuous = false;
    recognition.interimResults = false;

    // Event: when recognition starts
    recognition.onstart = () => {
      console.log('Speech recognition started');
      this.isRecording = true;
    };

    // Event: when recognition result is received
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      // this.transcript = transcript;

      this.http
        .post('http://localhost:5000/analyse', {
          recognisedText: transcript,
          expectedWord: this.word,
        })
        .subscribe(
          (response: any) => {
            this.feedback = response.data;
          },
          (error) => {
            console.error('Error comparing phonetics:', error);
          }
        );
    };

    // Event: when recognition ends
    recognition.onend = () => {
      console.log('Speech recognition ended');
      this.isRecording = false;
    };

    // Event: on error
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      this.isRecording = false;
    };

    // Start recognition
    recognition.start();
  }

  // STOP RECORDING VOICE FUNCTION--------------------------------------------------------
  stopRecording(): void {
    if (this.recognitionRef.current) {
      this.recognitionRef.current.stop();
    }
  }
}