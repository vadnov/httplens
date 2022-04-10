import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {BinRequest} from "./bin.request.model";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";

@Injectable({providedIn: 'root'})
export class BinRequestsService {

  private readonly _binId = new BehaviorSubject<string>("");
  private readonly _requests = new BehaviorSubject<BinRequest[]>([]);
  private readonly _binUrl = new BehaviorSubject<string>("");

  readonly binId$ = this._binId.asObservable();
  readonly requests$ = this._requests.asObservable();
  readonly binUrl$ = this._binUrl.asObservable();

  private _hubConnection: HubConnection = new HubConnectionBuilder()
    .withUrl('/binHub').build();

  constructor() {
    this._hubConnection.on('RequestReceived', (message: BinRequest) => {
      const requests = this._requests.value;
      message.received = new Date(Date.now());
      requests.unshift(message);
      this._requests.next(requests);
      console.log(message);
    });
    this._hubConnection.on('Init', (url: string) => {
      this._binUrl.next(url);
    });
  }

  get binId(): string {
    return this._binId.getValue();
  }

  get binUrl(): string {
    return this._binUrl.getValue();
  }

  setBinId(id: string) {
    this._binId.next(id);
    console.log('set binId to ' + id);
    this.connect();
  }

  private connect(): void {
    if (this.binId == undefined) return;
    console.log('init connect');
    this._hubConnection.stop().then(() => {
      console.log('connection stoped');
      this.startConnection();
    });

  }

  private startConnection() {
    this._hubConnection.start()
      .then(() => {
        console.log('connection started');
        if (this.binId != undefined) {
          this._hubConnection.invoke("JoinBin", this.binId).then(() => {
            console.log('joined bin ' + this.binId);
          });
        }
      })
      .catch((err) => console.log('error while establishing signalr connection: ' + err));
  }

}
