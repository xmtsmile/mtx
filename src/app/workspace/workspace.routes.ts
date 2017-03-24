/**
 * Created by Administrator on 2017/3/22.
 */
import { WorkspaceComponent } from './workspace.component';
import { RepositoryComponent } from '../repository/repository.component';
import { DevelopmentComponent } from '../development/development.component';
import { OperationsComponent } from '../operations/operations.component';

export const workspaceRoutes=[
  {
    path:'',
    component:WorkspaceComponent,
    children: [
      { path: '',redirectTo:'repository',pathMatch:'full'},
      { path: 'repository', component: RepositoryComponent },
      { path: 'development', component: DevelopmentComponent },
      { path: 'operations', component: OperationsComponent }
    ]
  }
];
