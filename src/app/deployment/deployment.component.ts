import {Component, OnInit, NgModule} from '@angular/core';
import {HttpPost} from '../../providers/httpPost';
declare var $: any;

@Component({
  selector: 'app-deployment',
  templateUrl: './deployment.component.html',
  styleUrls: ['./deployment.component.css']
})
export class DeploymentComponent implements OnInit {
  availableList: any = [];
  sandboxList: any = [];
  deployHistoryList: any = [];
  bundleHistoryList: any = [];
  sandboxId: any;
  databaseName: string;
  description: any;
  verifySkipped: boolean = true;
  bundleType: any = 1;
  showTag: boolean = false;
  formerBundleId: any;
  deployCommitId: string;
  bundleCommitId: string;
  
  constructor(public httpPost: HttpPost) {
  }
  
  ngOnInit() {
    var that = this;
    $(function () {
      const screenHeight = $(window).height() - 61;
      $('.divHeight').css('height', screenHeight + 'px');
      that.httpPost.dataAjax('POST', '/mtx/deployment/sandbox/available/list', 'x-www-form-urlencoded', {}, function (res) {
        if (res.code == '0') {
          that.availableList = res.result;
        }
      });
      that.httpPost.dataAjax('GET', '/mtx/deployment/sandbox/list', 'x-www-form-urlencoded', {}, function (res) {
        if (res.code == '0') {
          console.log('mtx/deployment/sandbox/list', res);
          that.sandboxList = res.result;
        }
      });
    });
  }
  
  applySandbox() {
    var that = this;
    if (!this.sandboxId) {
      alert('Please select the sandbox name');
    } else if (!this.databaseName) {
      alert('Please write the database name');
    } else if (!this.description) {
      alert('Please write the sandbox description');
    } else {
      var params = {
        'sandboxId': this.sandboxId,
        'databaseName': this.databaseName,
        'description': this.description
      };
      this.httpPost.dataAjax('POST', '/mtx/deployment/sandbox/acquire', 'application/json;charset=UTF-8',
        JSON.stringify(params), function (res) {
          if (res.code == '0') {
            alert(res.msg);
            that.sandboxlist();
            that.httpPost.dataAjax('POST', '/mtx/deployment/sandbox/available/list', 'x-www-form-urlencoded', {}, function (res2) {
              if (res2.code == '0') {
                that.availableList = res2.result;
              }
            });
            $('#applysandBox')[0].reset();
          }
        });
    }
  }
  
  deploymentInfo() {
    this.httpPost.dataAjax('GET', '/mtx/deployment/sandbox/list', 'x-www-form-urlencoded', {}, function (res) {
      if (res.code == '0') {
        console.log('/mtx/deployment/sandbox/list', res.result);
      }
    });
  };
  
  deletesandBox(available) {
    var sandId = available.sandboxId;
    var that = this;
    const params = {'sandboxId': sandId};
    this.httpPost.dataAjax('GET', '/mtx/deployment/sandbox/release', 'x-www-form-urlencoded', params, function (res) {
      if (res.code == '0') {
        that.sandboxlist();
        that.httpPost.dataAjax('POST', '/mtx/deployment/sandbox/available/list', 'x-www-form-urlencoded', {}, function (res1) {
          if (res1.code == '0') {
            that.availableList = res1.result;
          }
        });
        console.log('/mtx/deployment/sandbox/release', res);
      }
    });
  };
  
  showdeployHistory() {
    const that = this;
    this.httpPost.dataAjax('GET', '/mtx/deployment/history/deploy', 'x-www-form-urlencoded', {}, function (res) {
      if (res.code == '0') {
        console.log('/mtx/deployment/history/deploy', res);
        that.deployHistoryList = res.result;
      }
    });
  };
  
  showbundleHistory() {
    const that = this;
    this.httpPost.dataAjax('GET', '/mtx/deployment/history/bundle', 'x-www-form-urlencoded', {}, function (res) {
      if (res.code == '0') {
        console.log('/mtx/deployment/history/bundle', res);
        that.bundleHistoryList = res.result;
        if (that.bundleHistoryList.formerBundleId == null || that.bundleHistoryList.formerBundleId == '') {
          that.bundleHistoryList.formerBundleId = '-';
        }
      }
    });
  };
  
  showTagFunction(event) {
    if (event == '0') {
      this.showTag = true;
    } else {
      this.showTag = false;
    }
  };
  
  deploy() {
    var params = {
      'sandboxId': this.sandboxId,
      'description': this.description,
      'verifySkipped': this.verifySkipped ? '1' : '0',
      'commitId': 'fake_commit_id_1234'
    };
    this.httpPost.dataAjax('POST', '/mtx/deployment/action/deploy', 'application/json;charset=UTF-8',
      JSON.stringify(params), function (res) {
        if (res.code == '0') {
          alert(res.msg);
          $('#applysandBox')[0].reset();
        }
      });
  };
  
  bundle() {
    var params = {
      'commitId': 'fake-commint-id-1234',
      'formerBundleId': !this.showTag ? '' : this.formerBundleId,
      'description': this.description
    };
    
    this.httpPost.dataAjax('POST', '/mtx/deployment/action/bundle', 'application/json;charset=UTF-8',
      JSON.stringify(params), function (res) {
        if (res.code == '0') {
          alert(res.msg);
          $('#bundleForm')[0].reset();
        }
      });
  };
  
  download(bundleId: string): void {
    var form = $("<form style='display: none;' target='bundle_download' method='post' " +
      "action='/mtx/deployment/history/bundle/download'>" +
        "<input type='hidden' name='bundleId' value='" + bundleId +
      "'/></form>");
    $('body').append(form);
    form.submit();
  }
  
  // sandboxlist
  sandboxlist() {
    var that = this;
    that.httpPost.dataAjax('GET', '/mtx/deployment/sandbox/list', 'x-www-form-urlencoded', {}, function (res) {
      if (res.code == '0') {
        console.log('mtx/deployment/sandbox/list', res);
        that.sandboxList = res.result;
      }
    });
  }
}
