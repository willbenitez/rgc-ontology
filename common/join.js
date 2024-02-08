"use strict";
const db = require("./db");
const { masterDbToOntology } = require("./mappers");

const relativeItems = async (ontologyRecords) => {
  const relativeConceptIds = Array.from(
    ontologyRecords.reduce((acc, result) => {
      const ids = [...(result.parentIds || []), ...(result.childIds || [])];
      ids.forEach((id) => acc.add(id));
      return acc;
    }, new Set())
  ).map((id) => ({ conceptId: id }));

  let items = {};
  if (relativeConceptIds.length > 0) {
    const relatives = await db.master.batchGet(relativeConceptIds);
    items = relatives.reduce((acc, relative) => {
      acc[relative.conceptId] = relative.displayName;
      return acc;
    }, {});
  }

  const results = ontologyRecords.map(masterDbToOntology(items));
  return results;
};

module.exports = { relativeItems };
