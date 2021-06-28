import express from "express";
import { createServer } from "http";
import ip from "ip";

export default class StaticServer {
	app = express();
	server = createServer(this.app);
	host = ip.address();
	port = 3000;

	async init() {
		await this.start();
		this.initView();
		this.initGetHandlers();
	}

	async start() {
		try {
			await this.server.listen(this.port, this.host);
			const message = ` Server ${this.host} is listening on port ${this.port}`;
			global.console.log(new Date() + message);
		} catch (e) {
			global.console.error(e);
		}
	}

	async stop() {
		try {
			await this.server.close();
			global.console.log(`Server is stoped`);
		} catch (e) {
			global.console.error(e);
		}
	}

	initView() {
		this.app.use("/public", express.static("static/public"));
		this.app.use("/", express.static("static/app"));
	}

	initGetHandlers() {
		this.app.get("/favicon.ico", (req, res) => res.sendStatus(204));
	}
}

const server = new StaticServer;
server.init();