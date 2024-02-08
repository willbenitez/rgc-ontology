"use strict";
const db = require("./common/db");
const { payloadToHistoricalTbl } = require("./common/mappers");
const response = require("./common/response");

module.exports.handler = async (event) => {
  let { conceptId } = event.queryStringParameters;

  if (!conceptId) {
    return response(404, { error: "conceptId is missing from the request" });
  }

  const params = {
    Key: {
      conceptId: +conceptId,
    },
  };

  const existing = await db.master.get(params);

  const historicalMapper = payloadToHistoricalTbl("user", "delete");
  await db.master.del({ conceptId: +conceptId });
  await db.historical.put(historicalMapper(existing));

  return response(200, { status: "ok" });
};
