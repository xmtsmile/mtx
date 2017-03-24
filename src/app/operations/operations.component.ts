import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(function (){
      var screenHeight=$(window).height()-61;
      $(".phpIframe").css("height",screenHeight+"px");
      // $(".php").load("../phpmyadmin-mod/index.php")
    })
  }

}
