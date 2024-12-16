import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { WebService } from './web.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MessageModel } from './models/messages.model';
import { RasaModel } from './models/rasa-model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgIf, NgFor, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  webService = WebService.getInstance()
  title = 'interakcija-covek-racunar-2024';
  year = new Date().getFullYear();

  ngOnInit(): void {
    if(!localStorage.getItem('messages')){
      localStorage.setItem('messages', JSON.stringify([
        { type: 'bot', text: 'How can I help you?' }
      ]))
    }

    this.messages = JSON.parse(localStorage.getItem('messages')!)
  }

  isChatVisible = false
  userMessage: string = ''
  messages: MessageModel[] = []

  pushMessage(message: MessageModel){
    // if(message.type == 'bot'){
    //   for(let m of this.messages){
    //     if(m.text == 'Thinking...' && m.type == 'bot'){
    //       m.text = message.text
    //     }
    //   }
    // }else{
    //   this.messages.push(message)
    // }

    this.messages.push(message)

    localStorage.setItem('messages', JSON.stringify(this.messages))
  }

  toggleChat() {
    this.isChatVisible = !this.isChatVisible
  }
  sendMessage() {
    if (this.userMessage.trim()) {
      const trimmedInput = this.userMessage

      this.userMessage = ''

      this.pushMessage({ type: 'user', text: trimmedInput })
      this.pushMessage({ type: 'bot', text: 'Thinking...' })

      this.webService.sendRasaMessage(trimmedInput)
        .subscribe((rsp: RasaModel[]) => {
          if (rsp.length == 0) {
            this.pushMessage({
              type: 'bot',
              text: 'Sorry I did not understand your question.'
            })
            return
          }
          rsp.map(msg => msg.image ? `<img src="${msg.image}" width="200">` : msg.text).forEach(msg => {
            this.pushMessage({
              type: 'bot',
              text: msg!
            })
          })
        },
          (err: HttpErrorResponse) => {
            this.pushMessage({
              type: 'bot',
              text: 'Sorry, I am not available at the moment.'
            })

      })
    }
  }
}
