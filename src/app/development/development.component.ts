import { Component, OnInit } from '@angular/core';
import {GroupDatas} from '../../providers/DataHelpers';
declare var $: any;

@Component({
  selector: 'app-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.css']
})
export class DevelopmentComponent implements OnInit {
  revision: any = [] = GroupDatas;

  constructor() { }

  ngOnInit() {
    $(function () {
      const screenHeight = $(window).height() - 61;
      $('.borderRight').css('height', screenHeight + 'px');
      $('.leftTop').css('height', screenHeight / 2 + 'px');
      $('.leftBottom').css('height', screenHeight / 2 + 'px');
      $('.middleTop').css('height', (screenHeight / 4) * 3 + 'px');
      $('.middleBottom').css('height', (screenHeight / 4) * 1 + 'px');
    });
  }
}
