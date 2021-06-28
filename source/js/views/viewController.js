import { createElement } from "react";
import { render } from "react-dom";
import IndexView from "./components/indexView.jsx";

export default class ViewController {
	constructor() {
		const elem = createElement(IndexView);
		const cont = document.getElementById("container");
		render(elem, cont);
	}
}