const masterDbToOntology = (relatedItems) => (record) => ({
  conceptId: record.conceptId,
  displayName: record.displayName,
  description: record.description,
  parents: (record.parentIds || []).map((id) => ({
    id,
    displayName: relatedItems[id],
  })),
  children: (record.childIds || []).map((id) => ({
    id,
    displayName: relatedItems[id],
  })),
  alternateName: record.alternateName,
  lastUpdated: record.lastUpdated,
});

const payloadToTbl = () => (payload) => ({
  conceptId: payload.conceptId,
  displayName: payload.displayName,
  displayNameSearch: payload.displayName.toLowerCase(),
  description: payload.description,
  parentIds: payload.parentIds,
  childIds: payload.childIds,
  alternateName: payload.alternateName,
  alternateNameSearch: payload.alternateName?.toLowerCase(),
  lastUpdated: new Date().valueOf(),
});

const payloadToHistoricalTbl =
  (updatedBy, updatedAction, csvLocation) => (payload) => ({
    conceptId: payload.conceptId,
    displayName: payload.displayName,
    description: payload.description,
    parentIds: payload.parentIds,
    childIds: payload.childIds,
    alternateName: payload.alternateName,
    timeStamp: new Date().valueOf(),
    updatedBy,
    updatedAction,
    csvLocation: csvLocation ?? null,
  });

module.exports = {
  masterDbToOntology,
  payloadToTbl,
  payloadToHistoricalTbl,
};
