import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent {
  word: string | null = null;
  wordData: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.word = params.get('word');
      this.fetchWordData();
    });
  }

  fetchWordData(): void {
    if (this.word) {
      this.http
        .post('http://localhost:5000/fetchword', { userInput: this.word })
        .subscribe(
          (response: any) => {
            this.wordData = response;
          },
          (error: any) => {
            console.error('Error fetching word data:', error);
            this.wordData = null;
          }
        );
    } else {
      console.error('Word is null, cannot fetch data');
    }
  }

  handlePracticeClick(word: string, phonetic: string): void {
    this.router.navigate(['/practice'], { state: { word, phonetic } });
  }
}
