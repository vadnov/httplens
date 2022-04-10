import {Component, HostListener, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from "@angular/router"
import {ActivatedRoute} from '@angular/router';
import {v4 as uuidv4} from 'uuid';

import {BinRequest} from "./shared/bin.request.model";
import {BinRequestsService} from "./shared/bin-requests.service";

@Component({
  selector: 'app-component-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.css']
})

export class BinComponent implements OnInit {

  binId = ''
  requests: BinRequest[] = [];
  binUrl = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private binRequestService: BinRequestsService
  ) {
  }

  ngOnInit() {
    this.title.setTitle('Bin - HttpLens');
    this.binRequestService.binId$.subscribe(binId => this.binId = binId);
    this.binRequestService.requests$.subscribe(requests => this.requests = requests);
    this.binRequestService.binUrl$.subscribe(binUrl => this.binUrl = binUrl);

    this.route.params.subscribe(async params => {
      let binId = params['id'];
      if (binId == undefined) {
        let myuuid = uuidv4();
        await this.router.navigate(['/bin', myuuid], {replaceUrl: true});
      }
      this.binRequestService.setBinId(binId);
    });
  }


  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.key == KEY_CODE.DOWN_ARROW) {
    }
    if (event.key == KEY_CODE.UP_ARROW) {
    }
  }

}

export enum KEY_CODE {
  UP_ARROW = "ArrowUp",
  DOWN_ARROW = "ArrowDown"
}
