import { Component, createElement } from "react";
import find from "lodash/find";
import Controllers from "~/controllers";

export default class IndexView extends Component {
	state = {
		playlist: Controllers.playback.playlist[Controllers.hourly.current],
		track: 1,
		hour: Controllers.hourly.current
	};

	handlerOnEnd() {
		const { playlist } = this.state;
		let { track } = this.state;
		track = track >= playlist.length ? 1 : track + 1;
		this.setState({ track });
		Controllers.hourly.checkHour();
	}

	handlerOnError() {
		this.handlerOnEnd();
	}

	render() {
		const item = find(this.state.playlist, { id: this.state.track });
		return [
			createElement("h1", { key: 0 }, `Hour: ${this.state.hour + 1}; Track: ${item.name}`),
			createElement("audio", {
				autoPlay: true,
				controls: true,
				src: `${item.path}${item.name}`,
				onError: this.handlerOnError.bind(this),
				onEnded: this.handlerOnEnd.bind(this),
				key: 1
			})
		];
	}

	componentDidMount() {
		Controllers.hourly.on("changeHour", () => {
			const hour = Controllers.hourly.current;
			const playlist = Controllers.playback.playlist[hour];
			this.setState({ playlist, track: 1, hour });
		});
	}

	componentWillUnmount() {
		Controllers.hourly.off("changeHour");
	}
}
