import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(function (){
      const screenHeight = $(window).height() - 61;
      $('.scroll-view').css('height', screenHeight + 'px');
      $.sidebarMenu($('.sidebar-menu'));
    });
  }


}
