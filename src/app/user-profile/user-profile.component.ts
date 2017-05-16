import {Component, OnInit, NgModule, ViewChild} from '@angular/core';
import {HttpPost} from '../../providers/httpPost';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
declare var $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  avatarPath: any;
  userName: any;
  gitEmail: any;
  gitName: any;
  data: any;
  userInfo: any = [];
  userId: any;
  cropperSettings: CropperSettings;
  croppedWidth: number;
  croppedHeight: number;
  file: File;
  
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  
  constructor(public httpPost: HttpPost) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;
    this.cropperSettings.keepAspect = false;
    
    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;
    
    this.cropperSettings.canvasWidth = 500;
    this.cropperSettings.canvasHeight = 300;
    
    this.cropperSettings.minWidth = 100;
    this.cropperSettings.minHeight = 100;
    
    this.cropperSettings.rounded = true;
    this.cropperSettings.minWithRelativeToResolution = false;
    
    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings.noFileInput = true;
    
    this.data = {};
  }
  
  ngOnInit() {
    this.userInfo = JSON.parse(sessionStorage.getItem('loginUser'));
    console.log('userInfo', this.userInfo);
    this.userId = this.userInfo.userId;
    this.userName = this.userInfo.userName;
    this.gitEmail = this.userInfo.gitEmail;
    this.gitName = this.userInfo.gitName;
    this.avatarPath = this.userInfo.avatarPath;
  };
  
  cropped(bounds: Bounds) {
    this.croppedHeight = bounds.bottom - bounds.top;
    this.croppedWidth = bounds.right - bounds.left;
  }
  
  fileChangeListener($event) {
    this.file = $event.target.files[0];
    
    var image: any = new Image();
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    
    myReader.readAsDataURL(this.file);
  }
  
  saveChangeInfo() {
    var formdata = new FormData();
    formdata.append("file", this.file);
    var that = this;
    
    if (this.file) {
      $.ajax({
        type: 'POST',
        url: '/mtx/user/avatar/upload',
        cache: false,
        data: formdata,
        processData: false,
        contentType: false
      }).done(function (res) {
        if (res.code == '0') {
          console.log('result', res);
          var params = {
            'userName': that.userName,
            'gitEmail': that.gitEmail,
            'gitName': that.gitName,
            'userId': that.userId,
            'avatarPath': that.avatarPath
          };
          that.httpPost.dataAjax('POST', '/mtx/user/update', 'application/json;charset=UTF-8', JSON.stringify(params), function (res) {
            if (res.code == '0') {
              alert('修改成功！');
            }
          });
        }
      }).fail(function () {
        // warn me please !!!
      });
    } else {
      var params = {
        'userName': that.userName,
        'gitEmail': that.gitEmail,
        'gitName': that.gitName,
        'userId': that.userId,
        'avatarPath': that.avatarPath
      };
      that.httpPost.dataAjax('POST', '/mtx/user/update', 'application/json;charset=UTF-8', JSON.stringify(params), function (res) {
        if (res.code == '0') {
          alert('修改成功！');
        }
      });
    }
  }
  
}
