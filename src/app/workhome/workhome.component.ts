import { Component, OnInit } from '@angular/core';
import { HttpPost} from '../../providers/httpPost';
declare var $: any;

@Component({
  selector: 'app-workhome',
  templateUrl: './workhome.component.html',
  styleUrls: ['./workhome.component.css']
})
export class WorkhomeComponent implements OnInit {
  projectInfo: any = [];
  constructor(public httpPost: HttpPost) { }

  ngOnInit() {
  //   $(function (){
  //     const screenHeight = $(window).height() - 61;
  //     $('.rightTop').css('height', screenHeight / 2 + 'px');
  //     $('.rightBottom').css('height', screenHeight / 2 + 'px');
  //     setTimeout(function(){
  //       this.projectInfo = JSON.parse(sessionStorage.getItem('projectInfo'));
  //       console.log('sadaaaaaaaaaaa', this.projectInfo);
  //     }, 30000);
  //   });
  }
}
