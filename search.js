"use strict";
const db = require("./common/db");
const response = require("./common/response");
const join = require("./common/join");

module.exports.handler = async (event) => {
  const { text } = event.queryStringParameters;

  if (!text) {
    return response(404, { error: "text parameter value is missing" });
  }

  const params = {
    FilterExpression:
      "(contains(displayNameSearch, :displayName)) OR (contains(alternateNameSearch, :alternateName))",
    ExpressionAttributeValues: {
      ":displayName": text.toLowerCase(),
      ":alternateName": text.toLowerCase(),
    },
  };

  const ontologyRecords = await db.master.scan(params);
  const results = await join.relativeItems(ontologyRecords);
  return response(200, results);
};
