"use strict";

const samples = require("../samples/input.json");
const { processBatch } = require("./triage");

console.log(JSON.stringify(processBatch(samples), null, 2));
