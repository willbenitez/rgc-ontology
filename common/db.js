"use strict";
const AWS = require("aws-sdk");

const config = {
  masterOntologyTbl: process.env.DYNAMODB_ONTOLOGY_MASTER_TABLE,
  historicalOntologyTbl: process.env.DYNAMODB_ONTOLOGY_HISTORY_TABLE,
};

const scan =
  (tblName) =>
  async (params = {}) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const result = await dynamodb
      .scan({
        TableName: tblName,
        ...params,
      })
      .promise();
    return result.Items;
  };

const get =
  (tblName) =>
  async (params = {}) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const result = await dynamodb
      .get({
        TableName: tblName,
        ...params,
      })
      .promise();
    return result.Item;
  };

const batchGet = (tblName) => async (keys) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb
    .batchGet({
      RequestItems: {
        [tblName]: {
          Keys: keys,
        },
      },
    })
    .promise();
  const response = result?.Responses?.[tblName] || [];
  return response;
};

const query =
  (tblName) =>
  async (params = {}) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const result = await dynamodb
      .query({
        TableName: tblName,
        ...params,
      })
      .promise();
    return result.Items;
  };

const put = (tblName) => async (item) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb
    .put({
      TableName: tblName,
      Item: item,
    })
    .promise();
  return result.Items;
};

const del = (tblName) => async (key) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb
    .delete({
      TableName: tblName,
      Key: key,
    })
    .promise();
  return result.Items;
};

const db = {
  master: {
    scan: scan(config.masterOntologyTbl),
    query: query(config.masterOntologyTbl),
    get: get(config.masterOntologyTbl),
    batchGet: batchGet(config.masterOntologyTbl),
    put: put(config.masterOntologyTbl),
    del: del(config.masterOntologyTbl),
  },

  historical: {
    scan: scan(config.historicalOntologyTbl),
    query: query(config.historicalOntologyTbl),
    get: get(config.historicalOntologyTbl),
    put: put(config.historicalOntologyTbl),
  },
};

module.exports = db;
