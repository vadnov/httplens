import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from "@angular/router"
import {ActivatedRoute} from '@angular/router';
import {v4 as uuidv4} from 'uuid';
import {HubConnection, HubConnectionBuilder, LogLevel} from '@microsoft/signalr';

@Component({
  selector: 'app-component-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css']
})

export class InspectComponent implements OnInit {

  binId = ''
  private _hubConnection: HubConnection = new HubConnectionBuilder()
    .withUrl('/binHub').build();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
  ) {
  }

  ngOnInit() {
    this.title.setTitle('Bin - HttpLens');
    this.route.params.subscribe( params => {
      let binId = params['id'];
      if (binId == undefined) {
        let myuuid = uuidv4();
        this.router.navigate(['/inspect', myuuid]);
      }
      this.binId = binId;
      this.connect();
    });
  }

  private connect(): void {

    this._hubConnection.on('RequestReceived', (message) => {
      console.log(message);
    });

    this._hubConnection.start()
      .then(() => {
        console.log('connection started');
        this._hubConnection.invoke("JoinBin", this.binId).then(() => {
          console.log('joined bin ' + this.binId);
        });
      })
      .catch((err) => console.log('error while establishing signalr connection: ' + err));
  }

}
