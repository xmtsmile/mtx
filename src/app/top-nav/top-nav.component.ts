import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpPost } from '../../providers/httpPost';
import { Group } from '../models/group.model';
import { Sandbox } from '../models/sandbox.model';

declare var $: any;
declare var _: any;

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  adminTag = false;
  loginUser: any = {};

  constructor(public router: Router, public httpPost: HttpPost) { }

  private phpMyAdminUrl = "/operations/index.php";
  private loginForm =
    '<form action="__url__" target="phpmyadmin" method="post">' +
    '<input type="hidden" name="pma_servername" value="__server__">' +
    '<input type="hidden" name="pma_username" value="__username__">' +
    '<input type="hidden" name="pma_password" value="__password__">' +
    '<input type="hidden" name="collation_connection" value="utf8mb4_unicode_ci">' +
    '</form>';
  private backForm = '<form action="__url__" target="phpmyadmin"></form>';

  // mock data
  private groups: Group[] = [];

  // current sandbox info
  currentGroupId: string;
  currentSandboxId: string;

  ngOnInit() {
    var self = this;
    this.loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log('loginUser--', this.loginUser)

    if (this.loginUser.isAdmin == '0') {
      this.adminTag = false;
    } else {
      this.adminTag = true;
    }

    // load data here and in the callback function, call submenupicker() to ensure the submenu worked
    this.httpPost.dataAjax('GET', '/mtx/user/recipe/sandboxes', 'x-www-form-urlencoded', {}, function (res) {
      if (res.code == '0') {
        // translate the data into this.groups
        _.each(res.result, function (group) {
          var tmpGroup = new Group(group.groupId, group.groupName, []);
          _.each(group.sandboxes, function (sandbox) {
            tmpGroup.sandboxes.push(new Sandbox(
              sandbox.sandboxId,
              sandbox.groupId,
              sandbox.sandboxName,
              sandbox.address,
              sandbox.port,
              sandbox.username,
              sandbox.password
            ))
          });
          self.groups.push(tmpGroup);
        });

        // need a liitle to wait angular to init view
        setTimeout(function () {
          $('[data-submenu]').submenupicker();
        }, 300);
      }
    });
  }

  /**
   * jump to the target phpmyadmin page
   * @param groupId
   * @param sandboxId
   */
  operate(groupId: string, sandboxId: string) {
    this.currentGroupId = groupId;
    this.currentSandboxId = sandboxId;
    this.router.navigateByUrl("/workspace/operations");
  }

  fetchPage(prevUrls: any, sid: string) {
    var self = this;
    if (!this.currentGroupId || !this.currentSandboxId) {
      // if directly enter in /workspace/operations then do nothing
      return;
    }

    var group = _.filter(this.groups, function (group) {
      return group.id == self.currentGroupId;
    })[0];
    var sandbox = _.filter(group.sandboxes, function (sandbox) {
      return sandbox.id == self.currentSandboxId;
    })[0];

    var str;
    var prevUrl;
    if (!prevUrls || !(prevUrl = prevUrls.get(sid)) || prevUrl.index) {
      str = this.build(
        this.phpMyAdminUrl,
        sandbox.address + ":" + sandbox.port,
        sandbox.username,
        sandbox.password
      );
    } else {
      str = this.backForm.replace("__url__", prevUrl.url);
    }

    var post = $(str);
    $("body").append(post);
    post.submit();
    post.remove();
  }

  private build(url:string, server: string, username: string, password: string): string {
    return this.loginForm.replace("__url__", url)
      .replace("__server__", server)
      .replace("__username__", username)
      .replace("__password__", password);
  }

  logOut() {
    var that = this;
    this.httpPost.dataAjax('GET', '/mtx/user/logout', 'x-www-form-urlencoded', {}, function (res) {
      if (res.code == '0') {
        that.router.navigateByUrl('login');
      }
    });
  }

  getUser() {
    var that = this;
    this.httpPost.dataAjax('GET', '/mtx/user/info', 'x-www-form-urlencoded', {}, function (res) {
      if (res.code == '0') {
       sessionStorage.setItem('userInfo', JSON.stringify(res.result));
      }
    });
  }

}
