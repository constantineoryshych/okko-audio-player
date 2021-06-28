import request from "axios";
import each from "lodash/each";
import split from "lodash/split";
import replace from "lodash/replace";

export default class PlaylistControllerClass {
	playlist = null;

	async getPlaylist() {
		let playlist = "";

		try {
			const inner = window.location.search.split('?')[1];
			const { data } = await request({
				method: `get`,
				url: `./../list/${inner}.txt`
			});
			playlist = data;
		} catch (err) {
			const { data } = await request({
				method: `get`,
				url: `./../public/playlist.txt`
			});
			playlist = data;
		}
		this.playlist = PlaylistControllerClass.parse(playlist);
	}

	static parse(data) {
		const parse = split(data, `\r\n`);

		const res = [];
		let pull = [];

		const p = () => {
			res.push(pull);
			pull = [];
		};

		each(parse, v => {
			const val = split(replace(v, /"/g, ""), ",");
			if (val[0] === "1" && pull.length > 0) p();
			pull.push({ id: parseInt(val[0]), path: val[1], name: val[2] });
		});

		if (pull.length > 0) p();

		return res;
	}
}
