import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ConversationComponent } from './pages/conversation/conversation.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { PracticeWordComponent } from './pages/practice-word/practice-word.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route (home page)
  { path: 'about', component: AboutComponent },
  { path: 'conversation', component: ConversationComponent },
  { path: 'search/:word', component: SearchResultsComponent },
  { path: 'practice', component: PracticeWordComponent },
];
