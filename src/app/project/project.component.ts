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
  projectDeveloper: any = [];
  developerAll: any = [];
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
  projectId: any;
  constructor(public httpPost: HttpPost) { }

  ngOnInit() {
    var that = this;
    $(function (){
      const screenHeight = $(window).height() - 61;
      $('.borderRight').css('height', screenHeight + 'px');
      $('.rightTop').css('height', screenHeight / 2 + 'px');
      $('.rightBottom').css('height', screenHeight / 2 + 'px');
    });
    this.httpPost.dataAjax('GET', '/mtx/administration/work/group/list', 'x-www-form-urlencoded', {}, function(res) {
      if (res.code == '0') {
        that.groupList = res.result;
        console.log('/mtx/administration/work/group/list',  that.groupList);
      }
    });
    this.httpPost.dataAjax('GET', '/mtx/administration/work/developers', 'x-www-form-urlencoded', {}, function(res) {
      if (res.code == '0') {
        console.log('developers', res);
        that.developerAll = res.result;
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
        var params1 = {'groupId': that.groupTag};
        var thatt = that;
        that.httpPost.dataAjax('GET', '/mtx/administration/work/group/project/list', 'x-www-form-urlencoded', params1, function(res1) {
          if (res1.code == '0') {
            thatt.projectList = res1.result;
          }
        });
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
        if (res.result.gitPass == ''|| res.result.gitPass == null) {
          that.passKey = '1';
        } else {
          that.passKey = '0';
        }
        that.groupId = res.result.groupId;
        that.projectId = res.result.projectId;
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
      'projectId': this.projectId,
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
        var params1 = {'groupId': that.groupTag};
        var thatt = that;
        that.httpPost.dataAjax('GET', '/mtx/administration/work/group/project/list', 'x-www-form-urlencoded', params1, function(res1) {
          if (res.code == '0') {
            thatt.projectList = res1.result;
          }
        });
        $('#editProject').modal('hide');
        alert('修改成功！');
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
            var thattt = that;
            var params1 = {'groupId': thatt.groupTag};
            thatt.httpPost.dataAjax('GET', '/mtx/administration/work/group/project/list', 'x-www-form-urlencoded', params1, function(res1) {
              if (res.code == '0') {
                thattt.projectList = res1.result;
              }
            });
          }
        });
      },
      cancel: function(){
      }
    });
  };
  moveProject(project) {
    console.log('project--', project);
    var that = this;
    var params = {
      'projectId': project.projectId
    };
    this.httpPost.dataAjax('GET', '/mtx/administration/work/group/project/info', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        console.log('res', res);
        that.groupId = res.result.groupId;
        that.projectId = res.result.projectId;
        $('#moveProject').modal('show');
      }
    });
  };
  saveMove() {
    var that = this;
    var params = {
      'groupId': this.groupId,
      'projectId': this.projectId
    };
    this.httpPost.dataAjax('GET', '/mtx/administration/work/group/project/add', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        console.log('moveProject', res);
        var params1 = {'groupId': that.groupTag};
        var thatt = that;
        that.httpPost.dataAjax('GET', '/mtx/administration/work/group/project/list', 'x-www-form-urlencoded', params1, function(res1) {
          if (res.code == '0') {
            thatt.projectList = res1.result;
          }
        });
        $('#moveProject').modal('hide');
        alert('修改分组成功！');
      }
    });
  };
  showDeveloper(project) {
    console.log('project--', project);
    var that = this;
    var params = {
      'projectId': project.projectId
    };
    this.httpPost.dataAjax('GET', '/mtx/administration/work/group/project/developer/list', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        console.log('developer/list', res);
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
}
