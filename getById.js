"use strict";
const db = require("./common/db");
const response = require("./common/response");
const join = require("./common/join");

module.exports.handler = async (event) => {
  const { conceptId } = event.queryStringParameters;

  if (!conceptId) {
    return response(404, { error: "conceptId is missing from the request" });
  }

  const params = {
    Key: {
      conceptId: +conceptId,
    },
  };

  const ontologyRecord = await db.master.get(params);
  const results = await join.relativeItems([ontologyRecord]);
  const result = results[0];

  return response(200, result);
};
