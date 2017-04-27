import { Component, OnInit } from '@angular/core';
import { HttpPost} from '../../providers/httpPost';
declare var $: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  groupList: any = [];
  constructor(public httpPost: HttpPost) { }

  ngOnInit() {
    var that = this;
    $(function (){
      const screenHeight = $(window).height() - 61;
      $('.borderRight').css('height', screenHeight + 'px');
    });
    this.httpPost.dataAjax('GET', '/mtx/administration/work/group/list', 'x-www-form-urlencoded', {}, function(res) {
      if (res.code == '0') {
        that.groupList = res.result;
        console.log('/mtx/administration/work/group/list',  that.groupList);
      }
    });
  };
  delete(params) {
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
  };
  showProject() {
  }
}
