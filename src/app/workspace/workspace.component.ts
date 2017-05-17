import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {Router, NavigationEnd, RoutesRecognized} from '@angular/router';
import {PageCacheService} from '../page-cache.service';
import {TopNavComponent} from '../top-nav/top-nav.component';

declare var $: any;

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
  providers: [PageCacheService]
})
export class WorkspaceComponent implements OnInit {
  
  @ViewChild(TopNavComponent)
  topNavComponent: TopNavComponent;
  
  private pageCacheKeys: string[] = [
    "/workspace/repository",
    "/workspace/development",
    "/workspace/operations",
    "/workspace/workhome"
  ];
  
  constructor(private router: Router, @Inject("windowObject") window: Window,
              private pageCacheService: PageCacheService) {
    
    router.events.forEach((event) => {
      // NavigationStart -> RoutesRecognized -> NavigationEnd
      if (event instanceof NavigationEnd) {
        
        switch (event.url) {
          case this.pageCacheKeys[0]:
            var repo = this.pageCacheService.get(this.pageCacheKeys[0]);
            if (repo && repo.length > 0) {
              // dynamic create the page so no need to empty the node
              $("#page-repository").append(repo);
            } else {
              (<any>window).mainui = new (<any>window).MainUi();
            }
            var screenHeight = $(window).height() - 61;
            $("#page-repository").find("#global-container").css("height", screenHeight + "px");
            break;
          
          case this.pageCacheKeys[1]:
            var devel = this.pageCacheService.get(this.pageCacheKeys[1]);
            if (devel && devel.length > 0) {
              $("#page-development").empty().append(devel);
              $.addtabs();
            }
            break;
          
          case this.pageCacheKeys[2]:
            // console.log("end: " + this.pageCacheService.get(this.pageCacheKeys[2]));
            this.topNavComponent.fetchPage(
              this.pageCacheService.get(this.pageCacheKeys[2]),
              this.topNavComponent.currentSandboxId
            );
            break;
          
          case this.pageCacheKeys[3]:
            var whome = this.pageCacheService.get(this.pageCacheKeys[3]);
            if (whome && whome.length > 0) {
              $("#page-workhome").empty().append(whome);
            }
            break;
        }
      } else if (event instanceof RoutesRecognized) {
        
        var current: any;
        if ((current = $('#page-repository')).length > 0) {
          this.pageCacheService.put(this.pageCacheKeys[0], $("#page-repository").children());
        } else if ((current = $('#page-development')).length > 0) {
          this.pageCacheService.put(this.pageCacheKeys[1], $("#page-development").children());
        } else if ((current = $('#page-operations').find("iframe")).length > 0) {
          var document = current[0].contentWindow.document;
          var href = document.location.href;
          var title = document.title;
          // console.log("reco: " + document.location.href);
          
          var sandboxes = this.pageCacheService.get(this.pageCacheKeys[2]);
          if (!sandboxes) {
            sandboxes = new Map();
            this.pageCacheService.put(this.pageCacheKeys[2], sandboxes);
          }
          
          sandboxes.set(this.topNavComponent.currentSandboxId, {
            "index": title == "" || title == "phpMyAdmin",
            "url": href && href != "about:blank" ? href : undefined
          });
        } else if ((current = $('#page-workhome')).length > 0) {
          this.pageCacheService.put(this.pageCacheKeys[3], $("#page-workhome").children());
        }
      }
    });
    
  };
  
  ngOnInit() {
  }
  
}
