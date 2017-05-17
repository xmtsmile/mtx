import {Component, OnInit} from '@angular/core';
import {HttpPost} from '../../providers/httpPost';
declare var $: any;

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {
  groupList: any = [];
  projectList: any = [];
  projectInfo: any = [];
  taskList: any = [];
  taskWorkingList: any = [];
  sandboxesList: any = [];
  projectinfoTag: boolean;
  checkoutTag: boolean;
  projectCheck: any;
  projectTag: any;
  
  constructor(public httpPost: HttpPost) {
  }
  
  ngOnInit() {
    $(function () {
      const screenHeight = $(window).height() - 61;
      $('.divHeight').css('height', screenHeight + 'px');
      $('.rightTop').css('height', screenHeight / 2 + 'px');
      $('.rightBottom').css('height', screenHeight / 2 + 'px');
      $('.leftNavTop').css('height', ((screenHeight / 2) + 100) + 'px');
      $('.leftNavBottom').css('height', ((screenHeight / 2) - 100) + 'px');
    });
    var that = this;
    // ProjectList
    this.httpPost.dataAjax('POST', '/mtx/main/groups', 'x-www-form-urlencoded', {'projectId': this.projectCheck}, function (res) {
      if (res.code == '0') {
        that.groupList = res.result;
      }
    });
    // SandboxesInfo
    this.httpPost.dataAjax('GET', '/mtx/main/sandboxes', 'x-www-form-urlencoded', {}, function (res) {
      if (res.code == '0') {
        console.log('aaaaaaaaaaaaaaaaaaaaaaasandboxesInfo', res.result);
        that.sandboxesList = res.result;
      }
    });
  }
  
  showProject(group) {
    var that = this;
    const params = {'groupId': group.groupId};
    this.httpPost.dataAjax('GET', '/mtx/main/group/project/list', 'x-www-form-urlencoded', params, function (res) {
      if (res.code == '0') {
        that.projectList = res.result;
      }
    });
  };
  
  showProjectInfo(project) {
    console.log('project------', project);
    this.projectTag = project.projectId;
    var that = this;
    const params = {'projectId': this.projectTag};
    sessionStorage.setItem('projectCheck', params.projectId);
    // 项目基本信息
    this.httpPost.dataAjax('GET', '/mtx/main/group/project/info', 'x-www-form-urlencoded', params, function (res) {
      if (res.code == '0') {
        that.projectinfoTag = true;
        console.log('aaaaaaaaaaaaaaaaaaaaaaaprojectInfo', res.result);
        that.projectInfo = res.result;
      }
    });
    this.httpPost.dataAjax('GET', '/mtx/main/group/project/checkout', 'x-www-form-urlencoded', params, function (res) {
      if (res.code == '0') {
        that.checkoutTag = true;
        console.log('ttttttttt', res);
        sessionStorage.setItem("projectInfo", res.res);
      }
    });
    // TaskInfo
    this.httpPost.dataAjax('GET', '/mtx/main/group/project/tasks/assgined', 'x-www-form-urlencoded', params, function (res) {
      if (res.code == '0') {
        that.taskList = res.result;
      }
    });
    // taskWorkingList
    this.httpPost.dataAjax('GET', '/mtx/main/group/project/tasks/working', 'x-www-form-urlencoded', params, function (res) {
      if (res.code == '0') {
        that.taskWorkingList = res.result;
      }
    });
  };
  
  sureAccept(task) {
    var taskId = task.taskId;
    var params = {
      'taskId': taskId
    };
    var that = this;
    console.log('params---', params);
    this.httpPost.dataAjax('GET', '/mtx/main/group/project/task/accept', 'x-www-form-urlencoded', params, function (res) {
      if (res.code == '0') {
        alert('Succeed accept the task');
        that.httpPost.dataAjax('GET', '/mtx/main/group/project/tasks/assgined', 'x-www-form-urlencoded', {'projectId': that.projectTag}, function (res1) {
          if (res1.code == '0') {
            that.taskList = res1.result;
          }
        });
        that.httpPost.dataAjax('GET', '/mtx/main/group/project/tasks/working', 'x-www-form-urlencoded', {'projectId': that.projectTag}, function (res2) {
          if (res2.code == '0') {
            that.taskWorkingList = res2.result;
          }
        });
      }
    });
  }
}


