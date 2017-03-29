import { Component, OnInit } from '@angular/core';
import { GroupDatas,ProjectDatas,DeveloperDatas} from '../../providers/DataHelpers';
declare var $:any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  groupDatas: any =[]=GroupDatas;
  projectDatas: any =[];
  developerDatas: any =[];
  constructor() { }

  ngOnInit() {
    $(function (){
      var screenHeight=$(window).height()-61;
      $(".borderRight").css("height",screenHeight+"px");
    })
  }

  groupChild(){
    this.projectDatas = ProjectDatas;
  }

  projectChild(){
     this.developerDatas = DeveloperDatas;
  }

}
