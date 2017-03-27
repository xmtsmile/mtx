import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('[data-submenu]').submenupicker();
  }
}
