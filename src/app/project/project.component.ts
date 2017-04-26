import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    $(function (){
      const screenHeight = $(window).height() - 61;
      $('.borderRight').css('height', screenHeight + 'px');
    });
  }
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
  }
}
