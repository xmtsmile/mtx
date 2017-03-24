/**
 * Created by Administrator on 2017/3/22.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { LeftNavComponent } from '../left-nav/left-nav.component';
import { workspaceRoutes } from './workspace.routes';
import { TopNavComponent} from '../top-nav/top-nav.component';
import { RepositoryComponent } from '../repository/repository.component';
import { DevelopmentComponent } from '../development/development.component';
import { OperationsComponent } from '../operations/operations.component';

@NgModule({
  imports: [
    RouterModule.forChild(workspaceRoutes)
  ],
  exports: [],
  declarations: [
    WorkspaceComponent,
    LeftNavComponent,
    TopNavComponent,
    RepositoryComponent,
    DevelopmentComponent,
    OperationsComponent
  ],
  providers: [

  ],
})
export class WorkspaceModule { }
