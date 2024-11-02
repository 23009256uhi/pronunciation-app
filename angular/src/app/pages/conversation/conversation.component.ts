import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChatMessageComponent } from '../../components/chat-message/chat-message.component';
import { UserChatMessageComponent } from '../../components/user-chat-message/user-chat-message.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ChatMessageComponent,
    UserChatMessageComponent,
    FormsModule,
  ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css',
})
export class ConversationComponent {
  conversation: any = null;
  inputValue: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages(): void {
    try {
      this.http
        .get('http://localhost:5000/messages')
        .subscribe((response: any) => {
          console.log(response);
          this.conversation = response.messages;
          console.log(this.conversation);
        });
    } catch (error) {
      console.error('Error fetching messages', error);
    }
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.handleSendMessage();
    }
  }

  async handleSendMessage() {
    if (!this.inputValue.trim()) return; // Prevent sending empty messages

    const updatedConversation = [
      ...this.conversation,
      { role: 'user', text: this.inputValue },
    ];

    try {
      const response: any = await this.http
        .post('http://localhost:5000/conversation', {
          inputValue: this.inputValue,
        })
        .toPromise();
      const aiMessage = { role: 'ai', text: response };
      this.conversation = [...updatedConversation, aiMessage];

      // Clear the input field
      this.inputValue = '';
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  // async function handleSendMessage() {
  //   if (!inputValue.trim()) return; // Prevent sending empty messages

  //   try {
  //     const updatedConversation = [
  //       ...conversation,
  //       { role: "user", text: inputValue },
  //     ];

  //     const response = await axios.post("http://localhost:5000/conversation", {
  //       inputValue,
  //     });

  //     console.log(response.data);
  //     const aiMessage = { role: "ai", text: response.data };
  //     setConversation([...updatedConversation, aiMessage]);

  //     setInputValue("");

  //     // fetchMessages();
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // }
}
