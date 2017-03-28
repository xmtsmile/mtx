import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    $('[data-submenu]').submenupicker();
  }
  logOut(){
    this.router.navigateByUrl("login");
  }
}
