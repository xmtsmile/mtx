import { Component, OnInit } from '@angular/core';
import { CommonDatas} from '../../providers/DataHelpers';
declare var $:any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  commonDatas: any = CommonDatas;
  constructor() { }

  ngOnInit() {
    $(function (){
      var screenHeight=$(window).height()-61;
      $(".borderRight").css("height",screenHeight+"px");

      console.log("CommonDatas",this.commonDatas.name)
    })
  }

}
