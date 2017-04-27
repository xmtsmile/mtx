import { Component, OnInit, NgModule } from '@angular/core';
import { HttpPost} from '../../providers/httpPost';
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
  description: any;
  verifySkipped: boolean;
  bundleType: any;
  showTag: boolean = false;
  formerBundleId: any;

  constructor(public httpPost: HttpPost) { }

  ngOnInit() {
    var that = this;
    $(function (){
      const screenHeight = $(window).height() - 61;
      $('.divHeight').css('height', screenHeight + 'px');
      that.httpPost.dataAjax('POST', '/mtx/deployment/sandbox/available/list', 'x-www-form-urlencoded', {}, function(res) {
          if (res.code == '0') {
            that.availableList = res.result;
          }
        });
      that.httpPost.dataAjax('GET', '/mtx/deployment/sandbox/list', 'x-www-form-urlencoded', {}, function(res) {
        if (res.code == '0') {
          console.log('mtx/deployment/sandbox/list', res);
          that.sandboxList = res.result;
        }
      });
    });
  }
  applySandbox() {
    var that = this;
    if (this.sandboxId == null || this.sandboxId == '') {
      alert('请选择沙盒名称！');
    }else if (this.description == null || this.description == '') {
      alert('请填写沙盒描述！');
    }else {
      var params = {
        'sandboxId': this.sandboxId,
        'description': this.description
      };
      this.httpPost.dataAjax('POST', '/mtx/deployment/sandbox/acquire', 'application/json;charset=UTF-8',
        JSON.stringify(params), function(res) {
          if (res.code == '0') {
            alert(res.msg);
            that.sandboxlist();
            $('#applysandBox')[0].reset();
          }
        });
    }
  }
  deploymentInfo(){
    this.httpPost.dataAjax('GET', '/mtx/deployment/sandbox/list', 'x-www-form-urlencoded', {}, function(res) {
      if (res.code == '0') {
        console.log('/mtx/deployment/sandbox/list', res.result);
      }
    });
  };
  deletesandBox(available) {
    var sandId = available.sandboxId;
    var that = this;
    const params = {'sandboxId': sandId};
    this.httpPost.dataAjax('GET', '/mtx/deployment/sandbox/release', 'x-www-form-urlencoded', params, function(res) {
      if (res.code == '0') {
        that.sandboxlist();
        console.log('/mtx/deployment/sandbox/release', res);
      }
    });
 };
  showdeployHistory() {
    const that = this;
    this.httpPost.dataAjax('GET', '/mtx/deployment/history/deploy', 'x-www-form-urlencoded', {}, function(res) {
      if (res.code == '0') {
        console.log('/mtx/deployment/history/deploy', res);
        that.deployHistoryList = res.result;
      }
    });
  };
  showbundleHistory() {
    const that = this;
    this.httpPost.dataAjax('GET', '/mtx/deployment/history/bundle', 'x-www-form-urlencoded', {}, function(res) {
      if (res.code == '0') {
        console.log('/mtx/deployment/history/bundle', res);
        that.bundleHistoryList = res.result;
      }
    });
  };
  showTagFunction (event) {
    if (event == '0') {
      this.showTag = true;
    }else {
      this.showTag = false;
    }
  };
  deploy() {
    var params = {
      'sandboxId': this.sandboxId,
      'description': this.description,
      'verifySkipped': this.verifySkipped
    };
    this.httpPost.dataAjax('POST', '/mtx/deployment/action/deploy', 'application/json;charset=UTF-8',
      JSON.stringify(params), function(res) {
        if (res.code == '0') {
          alert(res.msg);
          $('#applysandBox')[0].reset();
        }
      });
  };
  bundle() {
    if (this.showTag == false) {
      var params = {
        'description': this.description
      };
      this.httpPost.dataAjax('POST', '/mtx/deployment/action/bundle', 'application/json;charset=UTF-8',
        JSON.stringify(params), function(res) {
          if (res.code == '0') {
            alert(res.msg);
            $('#bundleForm')[0].reset();
          }
        });
    }else {
      var params1 = {
        'formerBundleId': this.formerBundleId,
        'description': this.description,
      };
    }
    this.httpPost.dataAjax('POST', '/mtx/deployment/action/bundle', 'application/json;charset=UTF-8',
      JSON.stringify(params1), function(res) {
        if (res.code == '0') {
          alert(res.msg);
          $('#bundleForm')[0].reset();
        }
      });
  };
  // sandboxlist
  sandboxlist() {
    var that = this;
    that.httpPost.dataAjax('GET', '/mtx/deployment/sandbox/list', 'x-www-form-urlencoded', {}, function(res) {
      if (res.code == '0') {
        console.log('mtx/deployment/sandbox/list', res);
        that.sandboxList = res.result;
      }
    });
  }
}
