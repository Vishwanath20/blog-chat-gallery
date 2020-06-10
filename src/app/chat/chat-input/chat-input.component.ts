import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../message.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {

  message:string;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private auth: AuthService
    ) { }

  ngOnInit() {
  }

  send(){
    console.log("### Inside the chat-input-- send()");
    const channelId = this.route.snapshot.paramMap.get('id');
    console.log("### Inside the chat-input-- send()-- channelId is:::"+channelId);
    
    const photoURL = this.auth.authState.photoURL;
    console.log("### Inside the chat-input-- send()-- photoURL is:::"+photoURL);
    
    const sender = this.auth.authState.displayName || this.auth.authState.email;
    console.log("### Inside the chat-input-- send()-- sender is:::"+sender);

    const senderId = this.auth.currentUserId;
    console.log("### Inside the chat-input-- send()-- senderId is:::"+senderId);
    const message = this.message;
    this.messageService.sendMessage(channelId, photoURL, sender, senderId, message);
    this.message = ""
  }

  handleSubmit(event){
    if(event.keyCode === 13){
      console.log(event);
      this.send();
    }
  }
}
