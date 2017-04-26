import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpPost } from '../../providers/httpPost';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: any;
  pass: any;
  constructor(public router: Router, public httpPost: HttpPost) { }

  ngOnInit() {
  }

  login() {
    let message;
    var that = this;
    const reg = /[\u4e00-\u9fa5]+/;
    if (!this.name) {

      message = '用户名不能为空';
      alert(message);

    } else if (!this.pass) {

      message = '请输入密码';
      alert(message);

    } else if (reg.test(this.pass)) {

      message = '密码中不能输入中文';
      alert(message);

    } else {
      const params = { 'name': this.name, 'pass': this.pass };
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
