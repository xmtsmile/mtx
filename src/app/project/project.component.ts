import { Component, OnInit } from '@angular/core';
import { GroupDatas, ProjectDatas, DeveloperDatas} from '../../providers/DataHelpers';
declare var $: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  groupDatas: any = [] = GroupDatas;
  projectDatas: any = [];
  developerDatas: any = [];
  // hoverTag :boolean = false;

  constructor() { }

  ngOnInit() {
    $(function (){
      const screenHeight = $(window).height() - 61;
      $('.borderRight').css('height', screenHeight + 'px');
    });
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
      confirm: function(){
        alert('the user clicked confirm');
      },
      cancel: function(){
        alert('the user clicked cancel');
      }
    });
  }
}
