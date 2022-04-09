import { Component, OnInit } from '@angular/core';
import {BinRequestsService} from "../modules/bin/shared/bin-requests.service";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  binId = '';

  constructor(
    private binRequestService: BinRequestsService
  ) {
  }

  ngOnInit(){
    this.binRequestService.binId$.subscribe(binId => this.binId = binId);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
