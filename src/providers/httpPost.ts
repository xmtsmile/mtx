/**
 * Created by Administrator on 2017/4/19.
 */
import {Injectable} from '@angular/core';
declare var $: any;

@Injectable()
export class HttpPost {
  constructor() {}
  dataAjax(postType, url, contentType, params, successfn) {
  $.ajax({
    type: postType,
    url: url,
    cache: false,
    data: params,
    dataType: 'json',
    traditional: true,
    contentType: contentType     // 'application/json;charset=UTF-8'   'x-www-form-urlencoded'
  }).done(function (result) {
    console.log('postresult', result);
    if (result.code == '0') {
      successfn(result);
    }else {
      alert(result.msg);
    }
  }).fail(function(){
    setTimeout(function(){

    }, 1500);
  });
 };
}


