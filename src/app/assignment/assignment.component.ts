import { Component, OnInit } from '@angular/core';
import { HttpPost} from '../../providers/httpPost';
declare var $: any;
@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  taskGroupList: any = [];
  taskProjectList: any = [];
  unassignedtaskList: any = [];
  assignedtaskList: any = [];
  developersList: any = [];
  showTag: boolean = true;
  taskId: any;
  developer: any;
  taskTag: any;
  assignTag: any;
  projectIdTag: any;
  constructor(public httpPost: HttpPost) {}

  ngOnInit() {
    var that = this;
    $(function(){
      const screenHeight = $(window).height() - 61;
      $('.borderRight').css('height', screenHeight + 'px');
      $('.rightTop').css('height', screenHeight / 2 + 'px');
      $('.rightBottom').css('height', screenHeight / 2 + 'px');
    });
    this.httpPost.dataAjax('GET', '/mtx/administration/dist/group/list', 'x-www-form-urlencoded', {}, function(res) {
      if (res.code == '0') {
        that.taskGroupList = res.result;
        console.log('/mtx/administration/dist/group/list',  that.taskGroupList);
      }
    });
  };
  showTaskProject(taskGroup) {
    var that = this;
    var groupId = taskGroup.groupId;
    var params = {'groupId': groupId};
    this.httpPost.dataAjax('GET', '/mtx/administration/dist/group/project/list', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        console.log('/mtx/administration/resource/group/sandbox/list', res);
        that.taskProjectList = res.result;
      }
    });
  };
  showTask(taskProject) {
    var that = this;
    this.projectIdTag = taskProject.projectId;
    var params = {'projectId': this.projectIdTag};
    this.httpPost.dataAjax('GET', '/mtx/administration/dist/group/project/task/unassigned/list', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        console.log('/mtx/administration/dist/group/project/task/unassigned/list', res);
        that.unassignedtaskList = res.result;
      }
    });
    this.httpPost.dataAjax('GET', '/mtx/administration/dist/group/project/task/assigned/list', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        console.log('/mtx/administration/dist/group/project/task/assigned/list', res);
        that.assignedtaskList = res.result;
      }
    });
  };
  assignTask(unassignedtask) {
    this.taskTag = unassignedtask.taskId;
    var that = this;
    this.httpPost.dataAjax('GET', '/mtx/administration/dist/developers', 'x-www-form-urlencoded', {}, function(res) {
      if (res.code == '0') {
        that.developersList = res.result;
        that.taskId = that.unassignedtaskList.taskId;
        console.log('/mtx/administration/dist/group/list',  that.developersList);
      }
    });
    $('#assignTask').modal('show');
  };
  ignore(unassignedtask) {
    this.taskTag = unassignedtask.taskId;
    var that = this;
    var params = {'taskId': this.taskTag};
    this.httpPost.dataAjax('GET', '/mtx/administration/dist/group/project/task/ignore', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        that.showTwoTask();
        alert('忽略成功！');
        console.log('/mtx/administration/dist/group/list', res);
      }
    });
  };
  assignTaskByDeveloper() {
    var that = this;
    var params = {'taskId': this.taskTag, 'developer': this.developer};
    this.httpPost.dataAjax('GET', '/mtx/administration/dist/group/project/task/assign', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        that.showTwoTask();
        $('#assignTask').modal('hide');
        alert('任务分配成功！');
      }
    });
  };
  reassignTask(assignedtask) {
    this.assignTag = assignedtask.taskId;
    var that = this;
    this.httpPost.dataAjax('GET', '/mtx/administration/dist/developers', 'x-www-form-urlencoded', {}, function(res) {
      if (res.code == '0') {
        that.developersList = res.result;
        that.taskId = that.unassignedtaskList.taskId;
        console.log('/mtx/administration/dist/group/list',  that.developersList);
      }
    });
    $('#reassignTask').modal('show');
  };
  reassignTaskByDeveloper() {
    var that = this;
    var params = {'taskId': this.assignTag, 'developer': this.developer};
    this.httpPost.dataAjax('GET', '/mtx/administration/dist/group/project/task/reassign', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        that.showTwoTask();
        $('#reassignTask').modal('hide');
        alert('任务重新分配成功！');
      }
    });
  };
  // postrequest
  showTwoTask() {
    var that = this;
    var params = {'projectId': this.projectIdTag};
    this.httpPost.dataAjax('GET', '/mtx/administration/dist/group/project/task/unassigned/list', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        console.log('/mtx/administration/dist/group/project/task/unassigned/list', res);
        that.unassignedtaskList = res.result;
      }
    });
    this.httpPost.dataAjax('GET', '/mtx/administration/dist/group/project/task/assigned/list', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        console.log('/mtx/administration/dist/group/project/task/assigned/list', res);
        that.assignedtaskList = res.result;
      }
    });
  }
}
