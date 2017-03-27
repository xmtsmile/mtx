/**
 * Created by Administrator on 2017/3/22.
 */
import { WorkspaceComponent } from './workspace.component';
import { RepositoryComponent } from '../repository/repository.component';
import { DevelopmentComponent } from '../development/development.component';
import { OperationsComponent } from '../operations/operations.component';
import { WorkhomeComponent } from '../workhome/workhome.component';
import { DeploymentComponent } from '../deployment/deployment.component';

export const workspaceRoutes=[
  {
    path:'',
    component:WorkspaceComponent,
    children: [
      { path: '',component:WorkhomeComponent},
      { path: 'workhome',component:WorkhomeComponent},
      { path: 'repository', component: RepositoryComponent },
      { path: 'development', component: DevelopmentComponent },
      { path: 'operations', component: OperationsComponent },
      { path:'deployment',component: DeploymentComponent},
      { path:'',component: DeploymentComponent},
      { path:'',component: DeploymentComponent},
      { path:'',component: DeploymentComponent},

    ]
  }
];
