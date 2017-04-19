import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  constructor(@Inject("windowObject") private window: Window) { }

  ngOnInit() {
    if (!(<any>window).mainui) {
      (<any>window).mainui = new (<any>window).MainUi();
    }
  }

}
