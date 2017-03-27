import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('[data-submenu]').submenupicker();
     // $(function(){
     //      this.function2();
     // })

  }


  // function2(callBack){
  //   var aj=[{id:"1",state:"正常工作",contacts:"张三1",tel:"122"},
  //     {id:"2",state:"离线工作",contacts:"张三1",tel:"122"}];
  //   var returnNumber= aj[0][0];
  //   callBack(returnNumber)
  // };
  //
  // var callBack = function (status){
  // alert(status);
  // };
}
