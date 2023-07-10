// SELECT
//   dummy.helmet_id,
//   COUNT(*) AS false_count
// FROM
//   dummy
// WHERE
//   dummy.date = '2023-06-19'
//   AND EXISTS(
//      SELECT 1 FROM helmet where helmet.helmet_id = dummy.helmet_id AND helmet.helmet_value =1
//   )
// GROUP BY
//   dummy.helmet_id;