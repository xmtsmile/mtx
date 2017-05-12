import { Component, OnInit , NgModule, ViewChild} from '@angular/core';
import { HttpPost} from '../../providers/httpPost';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
declare var $:any;

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
  btnFont: any = '修改资料';
  inputTag: any = 'true';

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
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log('userInfo', this.userInfo);
    this.userId= this.userInfo.userId;
    this.userName = this.userInfo.userName;
    this.gitEmail = this.userInfo.gitEmail;
    this.gitName = this.userInfo.gitName;
  };
  cropped(bounds: Bounds) {
    this.croppedHeight = bounds.bottom-bounds.top;
    this.croppedWidth = bounds.right-bounds.left;
  }

  fileChangeListener($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
      var formdata = new FormData();
      formdata.append("file", file);
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
        }
      }).fail(function(){
        // warn me please !!!
      });
    };

    myReader.readAsDataURL(file);
  }
  uploadPic() {

}
  saveChangeInfo() {
    if (this.btnFont == '修改资料') {
      this.inputTag = false;
      this.btnFont = '确认修改';
    }else if (this.btnFont == '确认修改') {
      var that = this;
      this.inputTag = true;
      this.btnFont = '修改资料';
      var params = {
        'userName': this.userName,
        'gitEmail': this.gitEmail,
        'gitName': this.gitName,
        'userId': this.userId
      };
      this.httpPost.dataAjax('POST', '/mtx/user/update', 'application/json;charset=UTF-8', JSON.stringify(params), function(res) {
        if (res.code == '0') {
          alert('修改成功！');
        }
      });
    }
  }

}
