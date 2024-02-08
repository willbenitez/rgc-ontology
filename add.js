"use strict";
const db = require("./common/db");
const { payloadToTbl, payloadToHistoricalTbl } = require("./common/mappers");
const response = require("./common/response");

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  const mapper = payloadToTbl();
  const historicalMapper = payloadToHistoricalTbl("user", "add");
  await db.master.put(mapper(body));
  await db.historical.put(historicalMapper(body));

  return response(201, { status: "ok" });
};
