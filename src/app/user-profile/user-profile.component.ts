import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(function () {
      $('#myTab a:last').tab('show');
    })
    $('#myTab a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    })
  }

}
