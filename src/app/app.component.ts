import { Component, OnInit } from '@angular/core';
import { SocketioService } from './socketio.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'socketio-angular';
  
  messageText:String;
 
  messageArray:Array<{message:String}> = [];
  constructor(private socketioService:SocketioService){
    console.log("1");
    
    this.socketioService.setupSocketConnection()
    .subscribe(data=>{     
      this.messageArray.push(data)});

    this.socketioService.newMessageReceived()
    .subscribe(data=>this.messageArray.push(data));
  }

  ngOnInit(): void {
  }

//sending mesages
  sendMessage() {
    this.socketioService.sendMessage(this.messageText);
   
  }
 
 
}
