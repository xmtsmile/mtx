import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {HttpPost} from '../../providers/httpPost';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  name: any;
  pass: any;
  
  constructor(public router: Router, public httpPost: HttpPost) {
  }
  
  ngOnInit() {
    $("body")
    .css("background-image", "url('assets/images/dark.jpg')")
    .css("background-size", "100% 100%")
    .css("background-repeat", "no-repeat");
  }
  
  ngOnDestroy() {
    $("body")
    .css("background-image", "")
    .css("background-size", "")
    .css("background-repeat", "");
  }
  
  login() {
    let message;
    var that = this;
    if (!this.name) {
      
      message = 'Please input the username';
      alert(message);
      
    } else if (!this.pass) {
      
      message = 'Please input the password';
      alert(message);
      
    } else {
      const params = {'name': this.name, 'pass': this.pass};
      this.httpPost.dataAjax('GET', '/mtx/user/login', 'x-www-form-urlencoded', params, function (res) {
        if (res.code == '0') {
          console.log(res.result);
          sessionStorage.setItem('loginUser', JSON.stringify(res.result));
          that.router.navigateByUrl('workspace');
        }
      });
    }
  }
  
}
