"use strict";

import "./about.css";
import BaseComponent from "../baseComponent/baseComponent.js";

export default class AboutComponent extends BaseComponent {
    constructor() {
        super();
        this._template = require("./about.hbs");
    }
}
