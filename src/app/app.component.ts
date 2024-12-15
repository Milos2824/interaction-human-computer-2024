import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgIf, NgFor, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  webService = WebService.getInstance()
  title = 'interakcija-covek-racunar-2024';
  year = new Date().getFullYear();

  isChatVisible = false
  userMessage: string = ''
  messages = [
    { type: 'bot', text: 'How can I help you?' }
  ]
  toggleChat() {
    this.isChatVisible = !this.isChatVisible
  }
  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ type: 'user', text: this.userMessage })
      const obs = this.webService.sendRasaMessage(this.userMessage)
      this.userMessage = ''
      obs.subscribe(rsp => {
        if (rsp.length == 0) {
          this.messages.push({
            type: 'bot',
            text: 'Sorry I did not understand your question.'
          })
          return
        }
        rsp.map(msg => msg.image ? `<img src="${msg.image}">` : msg.text).forEach(msg => {
          this.messages.push({
            type: 'bot',
            text: msg!
          })
        })
      })
    }
  }
}
