import { Component, OnInit } from '@angular/core';
import { HttpPost} from '../../providers/httpPost';
declare var $: any;

@Component({
  selector: 'app-workhome',
  templateUrl: './workhome.component.html',
  styleUrls: ['./workhome.component.css']
})
export class WorkhomeComponent implements OnInit {
  projectInfo: any = [];
  constructor(public httpPost: HttpPost) { }

  ngOnInit() {
  }
}
