import { Sandbox } from './sandbox.model';

export class Group {

  id: string;
  name: string;
  sandboxes: Sandbox[];

  constructor(id: string, name: string, sandboxes: Sandbox[]) {
	  this.id = id;
    this.name = name;
    this.sandboxes = sandboxes;
  }

}