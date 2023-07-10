const pool  = require('../../db/connection//sql-pool');

module.exports = {
    getdatafromdate: (data,callBack) =>{
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    
        let query = `SELECT
        SUM(CASE WHEN json_extract(json_data, '$.helmet') = false THEN 1 ELSE 0 END) AS helmet_count,
        SUM(CASE WHEN json_extract(json_data, '$.vest') = false THEN 1 ELSE 0 END) AS vest_count,
        SUM(CASE WHEN json_extract(json_data, '$.shoes') = false THEN 1 ELSE 0 END) AS shoes_count,
        SUM(CASE WHEN json_extract(json_data, '$.gloves') = false THEN 1 ELSE 0 END) AS gloves_count,
        SUM(CASE WHEN json_extract(json_data, '$.goggles') = false THEN 1 ELSE 0 END) AS goggles_count
    
      FROM dummy_table where date=?`;
      
        // db_1.all(query,['19-06-2023'],(error,elements) => {
        //     if(error){
        //         console.log(error)
        //         return reject(error);
        //     }
        //     return resolve(elements);

        // })
       
        pool.acquire().then((db) => {
             
            db.all(query,['19-06-2023'],(error,results,fields) => {
              pool.release(db);
            if(error){
                callBack(error);
            }
            return callBack(null,results);

        })  
        })
    }
}