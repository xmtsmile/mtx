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
  projectList: any = [];
  groupName: any;
  groupId: any;
  projectName: any;
  repositoryUrl: any;
  gitName: any;
  gitEmail: any;
  passKey: any = '0';
  gitPass: any;
  gitPrivateKey: any;
  scriptPath: any;
  description: any;
  groupTag: any;
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
  createGroup() {
    var that = this;
    var params = {
      'groupName': this.groupName
    };
    this.httpPost.dataAjax('GET', '/mtx/administration/work/group/create', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        that.sandboxGroupList();
        $('#newGroup').modal('hide');
        alert('创建成功！');
      }
    });
  };
  delete(group) {
    var that = this;
    $.confirm({
      title: '确认!',
      content: '确认删除该项目组!',
      confirm: function(){
        var thatt = that;
        var groupId = group.groupId;
        var params = {'groupId': groupId};
        thatt.httpPost.dataAjax('GET', '/mtx/administration/work/group/delete', 'x-www-form-urlencoded', params, function(res) {
          if (res.code == '0') {
            thatt.sandboxGroupList();
          }
        });
      },
      cancel: function(){
      }
    });
  };
  showProject(group) {
    var that = this;
    this.groupTag = group.groupId;
    var params = {'groupId': this.groupTag};
    this.httpPost.dataAjax('GET', '/mtx/administration/work/group/project/list', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        that.projectList = res.result;
      }
    });
  };
  getGroupInfo(group) {
    var that = this;
    var groupId = group.groupId;
    var params = {'groupId': groupId};
    this.httpPost.dataAjax('GET', '/mtx/administration/work/group/info', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        that.groupName = res.result.groupName;
        that.groupId = res.result.groupId;
      }
    });
    $('#editGroup').modal('show');
  };
  saveGroupName() {
    var that = this;
    var params = {
      'groupId': this.groupId,
      'groupName': this.groupName
    };
    this.httpPost.dataAjax('GET', '/mtx/administration/work/group/update', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        that.sandboxGroupList();
        $('#editGroup').modal('hide');
        alert('修改成功！');
      }
    });
  };
  createProject() {
    var that = this;
    var params = {
      'groupId': this.groupId,
      'projectName': this.projectName,
      'repositoryUrl': this.repositoryUrl,
      'gitName': this.gitName,
      'gitEmail': this.gitEmail,
      'gitPass': this.gitPass,
      'gitPrivateKey': this.gitPrivateKey,
      'scriptPath': this.scriptPath,
      'description': this.description
    };
    this.httpPost.dataAjax('POST', '/mtx/administration/work/group/project/create', 'application/json;charset=UTF-8', JSON.stringify(params), function(res) {
      if (res.code == '0') {
        console.log('/mtx/administrati/group/project/create', res);
        $('#newProject').modal('hide');
        alert('创建成功！');
      }
    });
  };
  editProject(project) {
    var that = this;
    var projectId = project.projectId;
    var params = {'projectId': projectId};
    this.httpPost.dataAjax('GET', '/mtx/administration/work/group/project/info', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        console.log('/mtx/administration/work/group/project/info', res);
        that.groupId = res.result.groupId;
        that.projectName = res.result.projectName;
        that.repositoryUrl = res.result.repositoryUrl;
        that.gitName = res.result.gitName;
        that.gitEmail = res.result.gitEmail;
        that.gitPass = res.result.gitPass;
        that.gitPrivateKey = res.result.gitPrivateKey;
        that.scriptPath = res.result.scriptPath;
        that.description = res.result.description;
      }
    });
    $('#editProject').modal('show');
  };
  saveProject() {
    var that = this;
    var params = {
      'groupId': this.groupId,
      'projectName': this.projectName,
      'repositoryUrl': this.repositoryUrl,
      'gitName': this.gitName,
      'gitEmail': this.gitEmail,
      'gitPass': this.gitPass,
      'gitPrivateKey': this.gitPrivateKey,
      'scriptPath': this.scriptPath,
      'description': this.description
    };
    this.httpPost.dataAjax('POST', '/mtx/administration/work/group/project/update', 'application/json;charset=UTF-8', JSON.stringify(params), function(res) {
      if (res.code == '0') {
        that.sandboxGroupList();
        $('#editProject').modal('hide');
        alert('修改成功！');
      }
    });
  };
  // refresh
  sandboxGroupList() {
    var that = this;
    this.httpPost.dataAjax('GET', '/mtx/administration/work/group/list', 'x-www-form-urlencoded', {}, function(res) {
      if (res.code == '0') {
        that.groupList = res.result;
        console.log('/mtx/administration/work/group/list',  that.groupList);
      }
    });
  };
  deleteProject(project) {
    var that = this;
    $.confirm({
      title: '确认!',
      content: '确认删除该项目组!',
      confirm: function(){
        var thatt = that;
        var projectId = project.projectId;
        var params = {'projectId': projectId};
        thatt.httpPost.dataAjax('GET', '/mtx/administration/work/group/project/delete', 'x-www-form-urlencoded', params, function(res) {
          if (res.code == '0') {

          }
        });
      },
      cancel: function(){
      }
    });
  }
}
