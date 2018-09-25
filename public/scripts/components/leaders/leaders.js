"use strict";

import "./leaders.css";
import baseComponent from "../baseComponent/baseComponent.js";

export default class leadersComponent extends baseComponent {
    constructor() {
        super();
        this._template = require("./leaders.hbs");
    }
}
