import { Component, OnInit } from '@angular/core';
import { HttpPost} from '../../providers/httpPost';
declare var $: any;

@Component({
  selector: 'app-deployment',
  templateUrl: './deployment.component.html',
  styleUrls: ['./deployment.component.css']
})
export class DeploymentComponent implements OnInit {

  constructor(public httpPost: HttpPost) { }

  ngOnInit() {
    $(function (){
      const screenHeight = $(window).height() - 61;
      $('.divHeight').css('height', screenHeight + 'px');
      $('.left-top').css('height', screenHeight / 2 + 'px');
      $('.left-bottom').css('height', screenHeight / 2 + 'px');
    });
  }
  deploymentInfo(){
    this.httpPost.dataAjax('POST', '/mtx/deployment/sandbox/list', 'x-www-form-urlencoded', {}, function(res) {
      if (res.code == '0') {
        console.log('13411111111111111111',res.result);
      }
    });
  }

}
