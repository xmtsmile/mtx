import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { User } from '../models/user.model';
import { Router} from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User = new User();

  constructor(public router: Router) { }

  ngOnInit() {
  }

  login(){
    var reg = /[\u4e00-\u9fa5]+/;
    if(!this.user.username) {

      let message = "用户名不能为空";
      alert(message);

    } else if(!this.user.password){

      let message = "请输入密码";
      alert(message);

    } else if(reg.test(this.user.password)){

      let message = "密码中不能输入中文";
      alert(message);

    } else{

      this.router.navigateByUrl("workspace");
    }
  }

}
