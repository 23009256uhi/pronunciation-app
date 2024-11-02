import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-chat-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-chat-message.component.html',
  styleUrl: './user-chat-message.component.css',
})
export class UserChatMessageComponent {
  @Input() message!: string;
  @Input() className!: string;
}
