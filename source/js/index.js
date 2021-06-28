import Controllers from "./controllers";
import ViewController from "./views/viewController";

class Main {
	view = null;

	async init() {
		await Controllers.playback.getPlaylist();
		this.view = new ViewController();
	}
}

const main = new Main();
main.init();
