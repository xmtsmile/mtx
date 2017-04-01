import { Component, OnInit } from '@angular/core';
import {GroupDatas} from '../../providers/DataHelpers';
declare var $:any;
declare var _:any;

@Component({
  selector: 'app-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.css']
})
export class DevelopmentComponent implements OnInit {
  revision: any = [] = GroupDatas;

  constructor() { }

  ngOnInit() {
    $(function (){
      var screenHeight=$(window).height()-61;
      $(".borderRight").css("height",screenHeight+"px");
      $(".leftTop").css("height",screenHeight/2+"px");
      $(".leftBottom").css("height",screenHeight/2+"px");
      $(".middleTop").css("height",(screenHeight/4)*3+"px");
      $(".middleBottom").css("height",(screenHeight/4)*1+"px");

      var documents = {};
      var tabs;
      var editor;

        tabs = new Tabs({
          shell: $('.tabs-shell'),
          minWidth: 45,
          maxWidth: 180
        });

        editor = ace.edit('code');
        editor.setValue("");
        editor.setTheme("ace/theme/monokai");

        new Document();

        $('.new').on('click', function(ev){
          new Document();
        });
      });

      var AceDocument = ace.require("ace/document");
      var EditSession = ace.require("ace/edit_session");
      var UndoManager = ace.require("ace/undomanager");

      var Document = function() {
        var self = this;
        var id = 'document-' + _.uniqueId();
        this.id = id;

        this.tab =  tabs.add({title: 'untitled'});

        this.tab.data('id', id);

        this.tab.on('activate', function(){
          switchTab($(this).data('id'));
        });

        this.tab.on('close', function(){
          delete documents[self.id];
          tabs.closeTab(self.tab);
        });

        var aceDocument = new AceDocument.Document('');
        this.aceDocument = aceDocument;

        this.aceSession = new EditSession.EditSession(this.aceDocument, 'ace/mode/text');
        this.aceSession.setUndoManager(new UndoManager.UndoManager());

        documents[this.id] = this;

        switchTab(this.id);
      }

      var switchTab = function(id){
          var doc = documents[id];
          editor.setSession(doc.aceSession);
          editor.focus();
        }
  }


}
