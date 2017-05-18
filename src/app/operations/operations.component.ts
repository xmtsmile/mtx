import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(function () {
      // var screenHeight = $(window).height() - 61;
      // $("#page-operations").css("height", screenHeight + "px");
      
      $("#page-operations").css("height", "635px");
    })
  }

}
