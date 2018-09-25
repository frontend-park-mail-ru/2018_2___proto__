"use strict";

import "./about.css";
import baseComponent from "../baseComponent/baseComponent.js";

export default class aboutComponent extends baseComponent {
    constructor() {
        super();
        this._template = require("./about.hbs");
    }
}
