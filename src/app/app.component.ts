import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { PageCacheService } from './page-cache.service';
import { TopNavComponent } from './top-nav/top-nav.component';

declare var $: any;

@Component({
  selector: 'app-root',
  // directives: [TopNavComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PageCacheService]
})
export class AppComponent implements OnInit {

  @ViewChild(TopNavComponent)
  topNavComponent: TopNavComponent;

  private pageCacheKeys: string[] = [
    "/workspace/repository",
    "/workspace/development",
    "/workspace/operations"
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
            }
            break;

          case this.pageCacheKeys[2]:
            this.topNavComponent.fetchPage();
            // var ops = this.pageCacheService.get(this.pageCacheKeys[2]);
            // if (ops && ops.length > 0) {
            //   // FIXME: would be problem here because of when the iframe append to the DOM
            //   // it would auto reload with src attribute on it
            //   $("#page-operations").empty().append(ops);
            // }
            break;
        }

      } else if (event instanceof RoutesRecognized) {

        var current: any;
        if ((current = $('#page-repository')).length > 0) {
          this.pageCacheService.put(this.pageCacheKeys[0], $("#page-repository").children());
        } else if ((current = $('#page-development')).length > 0) {
          this.pageCacheService.put(this.pageCacheKeys[1], $("#page-development").children());
        } else if ((current = $('#page-operations')).length > 0) {
          // this.pageCacheService.put(this.pageCacheKeys[2], $("#page-operations").children());
        }

      }
    });

  };

  ngOnInit() {
    $(function () {
      $.addtabs();
    });
  }
}
