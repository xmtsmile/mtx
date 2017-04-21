export class Sandbox {

	id: string;
	groupId: string;
	name: string;

	address: string;
	port: string;
	username: string;
	password: string;

	constructor(id: string, groupId: string, name: string,
		address: string, port: string,
		username: string, password: string) {
		this.id = id;
		this.groupId = groupId;
		this.name = name;
		this.address = address;
		this.port = port;
		this.username = username;
		this.password = password;
	}

}