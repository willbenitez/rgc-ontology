"use strict";
const db = require("./common/db");
const { payloadToTbl, payloadToHistoricalTbl } = require("./common/mappers");
const response = require("./common/response");

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { conceptId } = body;

  if (!conceptId) {
    return response(404, { error: "conceptId is missing from the request" });
  }

  const mapper = payloadToTbl();
  const historicalMapper = payloadToHistoricalTbl("user", "edit");
  await db.master.put(mapper(body));
  await db.historical.put(historicalMapper(body));

  return response(200, { status: "ok" });
};
