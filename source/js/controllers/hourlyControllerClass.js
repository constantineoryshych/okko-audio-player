import Emmiter from "emmett";
import moment from "moment";

export default class HourlyControllerClass extends Emmiter {
	current = 0;
	timer = null;
	interval = 60 * 1000;

	constructor() {
		super();
		this.checkHour();
	}

	checkHour() {
		const now = moment();
		const hour = parseInt(now.format("HH"));
		if(this.current !== hour) {
			this.current = hour;
			this.emit("changeHour");
			this.setTimer();
		}
	}

	setTimer() {
		clearTimeout(this.timer);
		this.timer = null;
		this.timer = setTimeout(() => { this.checkHour() }, this.interval);
	}
}