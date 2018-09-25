"use strict";

import "./leaders.css";
import BaseComponent from "../baseComponent/baseComponent.js";

export default class LeadersComponent extends BaseComponent {
    constructor() {
        super();
        this._template = require("./leaders.hbs");
    }
}
