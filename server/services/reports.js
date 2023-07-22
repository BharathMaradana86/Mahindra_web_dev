
const express = require('express');
const mysql = require('../db/connection/mysql-connection')
exports.generated = async (req,res) => {
    try {
            const { shopename,stageName,lineName,detectionType,fromDate,toDate} = req.body
            const  data = await generate_dates( shopename,stageName,lineName,detectionType,fromDate,toDate);
            const result = Object.values(JSON.parse(JSON.stringify(data)));
            return res.status(200).json(result);
    } catch (error) {
        return res.status(200).json(error);
    }
}
const generate_dates = ( shopename,stageName,lineName,detectionType,fromDate,toDate) => {
  return new Promise((resolve, reject) => {
    mysql.query(
      `SELECT
      m.date,
      m.zone,
      m.time AS timestamp,
      o.object_type,
      o.object_value,
      0 as total_incidents
    FROM
      main AS m
    JOIN
      objects AS o ON m.object_id = o.object_id
    WHERE
      m.zone = '1'
      AND m.date BETWEEN '${fromDate}' and '${toDate}';
    `,
      [fromDate, toDate, detectionType],
      (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log(result);
        const results = JSON.parse(JSON.stringify(result))
        return resolve(results);
      }
    );
  });
};














