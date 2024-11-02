import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() isSidebarOpen!: boolean; // Receives the state from the parent
  @Output() toggleSidebar = new EventEmitter<void>(); // Emits even to toglle sidebar

  onToggle() {
    this.toggleSidebar.emit(); // Emits the event to the parent when called
  }
}
