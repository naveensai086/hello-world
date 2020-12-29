import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket;
  constructor() { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    console.log("2");
   
    let observable = new Observable<{ message: String }>(observer => {
      //handler for new user welcome message and connection and disconnection message to all clients except the current userand also for chat messages
      this.socket.on("new user", (arg) => {
        console.log("3");
        console.log(arg);
        observer.next(arg);
        console.log("4");
      });
      console.log("5");
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }


  //emitting event when user send msg
  sendMessage(msg) {
    this.socket.emit('newMessage', msg);
  }

  //receiving messages
  newMessageReceived() {
    let observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('newMessage', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }


}
