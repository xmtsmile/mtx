import { Component, OnInit } from '@angular/core';
import {GroupDatas} from '../../providers/DataHelpers';
declare var $: any;

@Component({
  selector: 'app-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.css']
})
export class DevelopmentComponent implements OnInit {
  revision: any = [] = GroupDatas;

  constructor() {
  }

  ngOnInit() {
    $(function () {
      const screenHeight = $(window).height() - 61;
      $('.borderRight').css('height', screenHeight + 'px');
      $('.leftTop').css('height', screenHeight / 2 + 'px');
      $('.leftBottom').css('height', screenHeight / 2 + 'px');
      $('.middleTop').css('height', (screenHeight / 4) * 3 + 'px');
      $('.middleBottom').css('height', (screenHeight / 4) * 1 + 'px');
      $.addtabs({iframeHeight: 320});
      var ace = window['ace'];
      const editor = ace.edit('editor');
      editor.setTheme('ace/theme/textmate');
      editor.getSession().setMode('ace/mode/sql');
      editor.getSession().setTabSize(4);
      editor.setValue('select * from a_table;');

      editor.mtx = {
        deploySession: editor.getSession(),
        revertSession: ace.createEditSession('', 'ace/mode/sql'),
        verifySession: ace.createEditSession('', 'ace/mode/sql')
      };

      $('input:radio[name=mode]').change(function () {
        const session = editor.mtx[$(this).val() + 'Session'];
        editor.setSession(session);
      });

      $('#generate-btn').click(function () {
        const deployText = editor.getValue();
        // retrive the result
        $.post('/xxx', {'deploy': deployText}, function () {
          const revertText = '';
          const verifyText = '';

          editor.mtx.revertSession.setValue(revertText);
          editor.mtx.verifySession.setValue(verifyText);
        });
      });

      $('#verify-btn').click(function () {
        // act like save, save first and verify
      });

      $('#save-btn').click(function () {
        const deployText = editor.getValue();
        const revertText = editor.mtx.revertSession.getValue();
        const verifyText = editor.mtx.verifySession.getValue();

        // post the data
        $.post('/xxx', {
          'deploy': deployText,
          'revert': revertText,
          'verify': verifyText
        }, function () {
          // done
        });
      });
      function tabCallback(this) {
        // callback
        console.log('this', this);
      }
    });
  };
}
