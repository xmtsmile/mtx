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
  // hoverTag :boolean = false;

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

  delete(params){
    $.confirm({
      title: '确认!',
      content: '确认删除该文件!',
      buttons: {
        确认: function () {
          console.log("params----",params) //取得要删除的project  操作...
          $.alert('删除成功!');
        },
        取消: function () {

        }
      }
    });
  }
}
