import { Component, OnInit} from '@angular/core';
import { HttpPost} from '../../providers/httpPost';
declare var $: any;

@Component({
  selector: 'app-sand-boxes',
  templateUrl: './sand-boxes.component.html',
  styleUrls: ['./sand-boxes.component.css']
})
export class SandBoxesComponent implements OnInit{
  sandBoxsGroupList: any = [];
  sandBoxList: any = [];
  groupName: any;
  groupId: any;
  sandboxId: any;
  sandboxName: any;
  port: any;
  address: any;
  username: any;
  password: any;
  description: any;
  showTag: boolean = true;
  constructor(public httpPost: HttpPost) { }

  ngOnInit() {
    var that = this;
    $(function (){
      const screenHeight = $(window).height() - 61;
      $('.borderRight').css('height', screenHeight + 'px');
    });
    this.httpPost.dataAjax('GET', '/mtx/administration/resource/group/list', 'x-www-form-urlencoded', {}, function(res) {
      if (res.code == '0') {
        that.sandBoxsGroupList = res.result;
        console.log('list', that.sandBoxsGroupList);
      }
    });
  };
  showsandBoxList(sandBoxsGroup) {
     var that = this;
     var groupId = sandBoxsGroup.groupId;
     var params = {'groupId': groupId};
    this.httpPost.dataAjax('GET', '/mtx/administration/resource/group/sandbox/list', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        console.log('/mtx/administration/resource/group/sandbox/list', res);
        that.sandBoxList = res.result;
      }
    });
  };
  delete(sandBoxsGroup) {
    var that = this;
    $.confirm({
      title: '确认!',
      content: '确认删除该分组!',
      confirm: function(){
        var thatt = that;
        var groupId = sandBoxsGroup.groupId;
        var params = {'groupId': groupId};
        thatt.httpPost.dataAjax('GET', '/mtx/administration/resource/group/delete', 'x-www-form-urlencoded', params, function(res) {
          if (res.code == '0') {
            thatt.sandboxgroup();
            console.log('/mtx/administration/resource/group/delete', res);
          }
        });
      },
      cancel: function(){
      }
    });
  };
  // sandboxgroup
  showGroup(sandBoxsGroup) {
    var that = this;
    var acquId = sandBoxsGroup.groupId;
    var params = {'groupId': acquId};
    this.httpPost.dataAjax('GET', '/mtx/administration/resource/group/info', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        console.log('/mtx/administration/resource/group/info', res);
        that.groupName = res.result.groupName;
        that.groupId = res.result.groupId;
      }
    });
    $('#edit').modal('show');
  };
  newGroupName() {
    var that = this;
    var params = {
      'groupName': this.groupName
    };
    this.httpPost.dataAjax('GET', '/mtx/administration/resource/group/create', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        that.sandboxgroup();
        $('#newGroup').modal('hide');
        alert('创建成功！');
      }
    });
  }
  saveGroupName() {
    var that = this;
    var params = {
      'groupId': this.groupId,
      'groupName': this.groupName
    };
    this.httpPost.dataAjax('GET', '/mtx/administration/resource/group/update', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        that.sandboxgroup();
        $('#edit').modal('hide');
        alert('修改成功！');
      }
    });
  };
  // sandbox
  newSandBoxes() {
    var that = this;
    var params = {
    'groupId': this.groupId,
    'sandboxName': this.sandboxName,
    'address': this.address,
    'port': this.port,
    'username': this.username,
    'password': this.password,
    'description': this.description
    };
    this.httpPost.dataAjax('GET', '/mtx/administration/resource/group/sandbox/create', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        console.log('/mtx/administration/resource/group/create', res);
        $('#newSandBoxes').modal('hide');
        alert('创建成功！');
      }
    });
  };
  deletesandBox(sandBox) {
    var that = this;
    $.confirm({
      title: '确认!',
      content: '确认删除该sandbox!',
      confirm: function(){
        var thatt = that;
        var sandboxId = sandBox.sandboxId;
        var params = {'sandboxId': sandboxId};
        thatt.httpPost.dataAjax('GET', '/mtx/administration/resource/group/sandbox/delete', 'x-www-form-urlencoded', params, function(res) {
          if (res.code == '0') {
            console.log('/mtx/administration/resource/group/sandbox/delete', res);
          }
        });
      },
      cancel: function(){
      }
    });
  };
  editsandBox(sandBox) {
    var that = this;
    var params = {
      'sandboxId': sandBox.sandboxId
    };
    this.httpPost.dataAjax('GET', '/mtx/administration/resource/group/sandbox/info', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        console.log('/mtx/administration/resource/group/sandbox/info', res);
        that.groupId = res.result.groupId;
        that.sandboxName = res.result.sandboxName;
        that.address = res.result.address;
        that.port = res.result.port;
        that.username = res.result.username;
        that.password = res.result.password;
        that.description = res.result.description;
      }
    });
    $('#editSandBoxes').modal('show');
  };
  saveSandBoxes() {
    var params = {
      'groupId': this.groupId,
      'sandboxName': this.sandboxName,
      'address': this.address,
      'port': this.port,
      'username': this.username,
      'password': this.password,
      'description': this.description
    };
    this.httpPost.dataAjax('POST', '/mtx/administration/resource/group/sandbox/update', 'application/json;charset=UTF-8', JSON.stringify(params), function(res) {
      if (res.code == '0') {
        console.log('editsandbox', res);
        $('#editSandBoxes').modal('hide');
        alert('修改成功！');
      }
    });
  };
  movesandBox(sandBox) {
    var that = this;
    var params = {
      'sandboxId': sandBox.sandboxId
    };
    this.httpPost.dataAjax('GET', '/mtx/administration/resource/group/sandbox/info', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        that.groupId = res.result.groupId;
        that.sandboxId = res.result.sandboxId;
        $('#moveSandBoxes').modal('show');
      }
    });
  };
  saveMove() {
    var params = {
      'groupId': this.groupId,
      'sandboxId': this.sandboxId
    };
    this.httpPost.dataAjax('GET', '/mtx/administration/resource/group/sandbox/add', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        console.log('movesandbox', res);
        $('#moveSandBoxes').modal('hide');
        alert('修改分组成功！');
      }
    });
  }
  // post or get request
  sandboxgroup() {
    var that = this;
    this.httpPost.dataAjax('GET', '/mtx/administration/resource/group/list', 'x-www-form-urlencoded', {}, function(res) {
      if (res.code == '0') {
        that.sandBoxsGroupList = res.result;
        console.log('list', that.sandBoxsGroupList);
      }
    });
  };
}
