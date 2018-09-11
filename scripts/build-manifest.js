#!/usr/bin/env node

const FS = require("fs");
const flow = require("lodash/fp/flow");

const readFileSync = (path) => FS.readFileSync(path, { encoding: "utf8" });
const writeFileSync = (path) => (content) => FS.writeFileSync(path, content, { encoding: "utf8" });
const trimString = (string) => string.trim();
const prettyJsonStringify = (json) => JSON.stringify(json, null, 2);

const readJsonSync = flow([
  readFileSync,
  trimString,
  JSON.parse
]);

const { version, description } = readJsonSync("./package.json");

flow([
  readJsonSync,
  (manifestTemplate) => ({
    ...manifestTemplate,
    version,
    description
  }),
  prettyJsonStringify,
  writeFileSync("./dist/manifest.json")
])("./templates/manifest.json");
