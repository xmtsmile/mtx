import { Component, OnInit } from '@angular/core';
import { HttpPost} from '../../providers/httpPost';
declare var $: any;

@Component({
  selector: 'app-sand-boxes',
  templateUrl: './sand-boxes.component.html',
  styleUrls: ['./sand-boxes.component.css']
})
export class SandBoxesComponent implements OnInit {
  sandBoxsGroupList: any = [];
  sandBoxList: any = [];
  groupName: any;
  groupId: any;
  sandboxName: any;
  port: any;
  address: any;
  username: any;
  password: any;
  description: any;
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
}
