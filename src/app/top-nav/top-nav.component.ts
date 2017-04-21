import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { HttpPost} from '../../providers/httpPost';
declare var $: any;
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  adminTag = false;
  loginUser: any = {};
  constructor(public router: Router, public httpPost: HttpPost) { }

  ngOnInit() {
    $('[data-submenu]').submenupicker();
    this.loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log('loginUser--', this.loginUser)
    if (this.loginUser.isAdmin == '0') {
      this.adminTag = false;
    }else {
      this.adminTag = true;
    }
  }
  logOut() {
    var that = this;
    this.httpPost.dataAjax('GET', 'http://localhost:80/user/logout', 'x-www-form-urlencoded', {}, function(res){
      if (res.code == '0') {
        that.router.navigateByUrl('login');
      }
    });
  }
}
