import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, @Inject("windowObject") private window: Window) {
    // because of angular would delete the original template, so create the 'repository' every time
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd && event.url == '/workspace/repository') {
        console.log(event);
        (<any>window).mainui = new (<any>window).MainUi();
      }
    });
  };

  ngOnInit() {
    $(function () {
      $.addtabs();
    });
  }
}
