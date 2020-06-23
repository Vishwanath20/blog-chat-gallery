import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ThreadService } from '../thread.service';
import { Observable } from 'rxjs';
import { Thread } from '../thread.model';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent implements OnInit {
  @ViewChild('scroller', { static: true })
  private feed: ElementRef;

  threadId:string;
  threads: Observable<Thread[]>;

  constructor(
    public el: ElementRef,
    private threadService: ThreadService
    ) {}

  ngOnInit() {  
    this.getThread();
  }

  getThread(){
    this.threads = this.threadService.getThreads();
    console.log("### Inside the chat detail -- this.threads is::"+this.threads);
    this.threads.subscribe( thread => {
      thread.map(data => {
        this.threadId = data.id;
        console.log("### Inside the chat detail -- this.threadId is::"+this.threadId);
      });
    })
  }

  // delete(){
  //   this.threadService.deleteThread(this.threadId);
  // }
  
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector('.chat-feed');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }
}

// import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';



// @Component({
//   selector: 'app-chat-detail',
//   templateUrl: './chat-detail.component.html',
//   styleUrls: ['./chat-detail.component.css']
// })
// export class ChatDetailComponent implements OnInit {

//   @ViewChild('scroller', { static: true }) private feed: ElementRef;

//   constructor( public el: ElementRef) { }

//   ngOnInit() {
//   }

//   ngAfterViewChecked(){
//     this.scrollToButtom()
//   }

//   scrollToButtom():void{
//     const scrollPane:any = this.el.nativeElement.querySelector('.chat-feed');
//     scrollPane.scrollTop = scrollPane.scrollHeight;
    
//   }

// }
