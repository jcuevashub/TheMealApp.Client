import { Injectable } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    private hubConnection!: HubConnection;

    public startConnection = () => {
        this.hubConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:5188/notificationHub', {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
        }).withAutomaticReconnect().build();
   
        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err));
    }

    public addReceiveMessageListener = () => {
        this.hubConnection.on('ReceiveMessage', (user, message) => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${message}`,
                text: message,
                showConfirmButton: false,
                timer: 1500
              });
        });
    }
}
