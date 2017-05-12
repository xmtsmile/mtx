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
  userPass: any;
  projectTag: any;
  userName: any;
  gitName: any;
  gitEmail: any;
  passKey: any = '0';
  gitPass: any;
  gitPrivateKey: any;
  scriptPath: any;
  description: any;
  groupTag: any;
  projectId: any;
  projectGroupList: any;
  avatarPath: any;
  isAdmin: any;
  developerId: any;
  userId: any;
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
    this.projectTag = project.projectId;
    console.log('project--', project);
    var that = this;
    var params = {
      'projectId': project.projectId
    };
    this.httpPost.dataAjax('GET', '/mtx/administration/work/group/project/developer/list', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        console.log('developer/list', res);
        that.projectDeveloper = res.result;
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
  showprojectGroup(event) {
    console.log('event', event);
    var that = this;
    this.groupTag = event;
    var params = {'groupId': this.groupTag};
    this.httpPost.dataAjax('GET', '/mtx/administration/work/group/project/list', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        that.projectGroupList = res.result;
      }
    });
  };
  // 创建
  newDeveloper() {
    var that = this;
    var params = {
      'groupId': this.groupId,
      'projectId': this.projectId,
      'userName': this.userName,
      'userPass': this.userPass,
      'avatarPath': this.avatarPath,
      'gitName': this.gitName,
      'gitEmail': this.gitEmail,
      'isAdmin': this.isAdmin,
    };
    this.httpPost.dataAjax('POST', '/mtx/administration/work/group/project/developer/create', 'application/json;charset=UTF-8', JSON.stringify(params), function(res) {
      if (res.code == '0') {
        alert('创建新开发人员成功！')
        $('#newDeveloperForm')[0].reset();
        $('#newDeveloper').modal('hide');
        console.log('developwer', res);
      }
    });
  }
  // 已有开发人员分配
  allot() {
    var that = this;
    this.httpPost.dataAjax('GET', '/mtx/administration/work/developers', 'x-www-form-urlencoded', {}, function(res) {
      if (res.code == '0') {
        console.log('developers', res);
        that.developerAll = res.result;
      }
    });
    $('#moveDeveloper').modal('show');
  }
  saveAllot() {
    var that = this;
    var params = {
      'projectId': this.projectId,
      'developerId': this.developerId,
    };
    this.httpPost.dataAjax('GET', '/mtx/administration/work/group/project/developer/add', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        alert('人员重新分配成功！');
        $('#moveDeveloperForm')[0].reset();
        $('#moveDeveloper').modal('hide');
      }
    });
  }
  // 修改用户信息
  editDeveloper(developerProject) {
    var that = this;
    this.developerId = developerProject.userId;
    var params = {'developerId': this.developerId};
    this.httpPost.dataAjax('GET', '/mtx/administration/work/group/project/developer/info', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        console.log('developer', res.result);
          that.groupId =  res.result.groupId;
          that.projectId = res.result.projectId;
          that.userName = res.result.userName;
          that.userPass = res.result.userPass;
          that.avatarPath = res.result.avatarPath;
          that.gitName = res.result.gitName;
          that.gitEmail = res.result.gitEmail;
          that.isAdmin = res.result.isAdmin;
        $('#editDeveloper').modal('show');
      }
    });
  }
  // 确认修改
  saveEditDeveloper() {
    var that = this;
    var params = {
      'groupId': this.groupId,
      'projectId': this.projectId,
      'userId': this.userId,
      'userName': this.userName,
      'userPass': this.userPass,
      'avatarPath': this.avatarPath,
      'gitName': this.gitName,
      'gitEmail': this.gitEmail,
      'isAdmin': this.isAdmin,
    };
    this.httpPost.dataAjax('POST', '/mtx/administration/work/group/project/developer/update', 'application/json;charset=UTF-8', JSON.stringify(params), function(res) {
      if (res.code == '0') {
        alert('修改开发人员信息成功！')
        $('#editDeveloperForm')[0].reset();
        $('#editDeveloper').modal('hide');
      }
    });
  }
  // 删除
  deleteDeveloper(developerProject) {
    console.log('developerProject', developerProject);
    var that = this;
    $.confirm({
      title: '确认!',
      content: '确认从此项目下删除该开发人员!',
      confirm: function(){
        var thatt = that;
        var developerId = developerProject.userId;
        var projectId = thatt.projectTag;
        var params = {'developerId': developerId, 'projectId': projectId
                     };
        thatt.httpPost.dataAjax('GET', '/mtx/administration/work/group/project/developer/delete', 'x-www-form-urlencoded', params, function(res) {
          if (res.code == '0') {
            var thattt = that;
            thatt.showDeveloper(thatt.projectTag);
          }
        });
      },
      cancel: function(){
      }
    });
 }
}
