/**
 * Created by Administrator on 2017/3/22.
 */
import { WorkspaceComponent } from './workspace.component';
import { RepositoryComponent } from '../repository/repository.component';
import { DevelopmentComponent } from '../development/development.component';
import { OperationsComponent } from '../operations/operations.component';
import { WorkhomeComponent } from '../workhome/workhome.component';
import { DeploymentComponent } from '../deployment/deployment.component';
import { ProjectComponent } from '../project/project.component';
import { AssignmentComponent } from '../assignment/assignment.component';
import { SandBoxesComponent } from '../sand-boxes/sand-boxes.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

export const workspaceRoutes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      { path: '', component: WorkhomeComponent},
      { path: 'workhome', component: WorkhomeComponent},
      { path: 'userProfile', component: UserProfileComponent},
      { path: 'repository', component: RepositoryComponent },
      { path: 'development', component: DevelopmentComponent },
      { path: 'operations', component: OperationsComponent },
      { path: 'deployment', component: DeploymentComponent},
      { path: 'project', component: ProjectComponent},
      { path: 'assignment', component: AssignmentComponent},
      { path: 'sandboxes', component: SandBoxesComponent}
    ]
  }
];
