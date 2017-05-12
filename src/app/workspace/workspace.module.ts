/**
 * Created by Administrator on 2017/3/22.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { LeftNavComponent } from '../left-nav/left-nav.component';
import { workspaceRoutes } from './workspace.routes';
import { TopNavComponent} from '../top-nav/top-nav.component';
import { RepositoryComponent } from '../repository/repository.component';
import { DevelopmentComponent } from '../development/development.component';
import { OperationsComponent } from '../operations/operations.component';
import { DeploymentComponent } from '../deployment/deployment.component';
import { AdministrationComponent } from '../administration/administration.component';
import { WorkhomeComponent } from '../workhome/workhome.component';
import { ProjectComponent } from '../project/project.component';
import { AssignmentComponent } from '../assignment/assignment.component';
import { SandBoxesComponent } from '../sand-boxes/sand-boxes.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { FormsModule} from '@angular/forms';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';

// provider
import { HttpPost} from '../../providers/httpPost';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(workspaceRoutes)
  ],
  exports: [],
  declarations: [
    WorkspaceComponent,
    LeftNavComponent,
    TopNavComponent,
    RepositoryComponent,
    DevelopmentComponent,
    OperationsComponent,
    DeploymentComponent,
    AdministrationComponent,
    WorkhomeComponent,
    ProjectComponent,
    AssignmentComponent,
    SandBoxesComponent,
    UserProfileComponent,
    ImageCropperComponent
  ],
  providers: [
    HttpPost,
    {provide: 'windowObject', useValue: window}
    ]
})
export class WorkspaceModule { }
