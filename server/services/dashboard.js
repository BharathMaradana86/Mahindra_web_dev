const express = require('express');
const {db,db_1} = require('../db/connection/sql-connection');
const mysql = require('../db/connection/mysql-connection')
const { param, merge } = require('../routes/dashboard');
const { Query } = require('mongoose');
const pool = require('../db/connection/sql-pool');
const { resolve } = require('path');
const { rejects } = require('assert');

exports.getData = async (req,res) => {
     try {
           const result = await SelectedData();
            console.log(result);
           res.status(200).json(result);
     } catch (error) {
        res.status(404).json(error)
     }
                  
}

exports.getData_2 = async (req,res) => {
    try {
          let {from_year,to_year,Line} = req.body;
          console.log("called")
          console.log(from_year,to_year,Line)
          let k=0;
          let data_set = [];
          let r = parseInt(to_year);
          r=r+1;
          let j=parseInt(from_year)
          for(let i=j;i<=(r);i++){
              
                    data_set.push(JSON.parse(`{"id": ${i},"helmet_count": ${k},"vest_count": ${k},"shoes_count": ${k},"gloves_count": ${k}, "goggles_count": ${k}}`))
          }
         
         const result = await SelectedData_2(from_year,to_year,Line);
         const main_result = await Convert_data(data_set,result);
         console.log(main_result)
         res.status(200).json(main_result)
    } catch (error) {
        console.log(error);
         res.status(404).json(error);
    }
}


exports.getData_3 = async (req,res) => {
    try {
             console.log(req.body);
             const {year ,from_month ,year_1, to_month,Line} = req.body;
            
            const result = await SelectedData_3(year,from_month,year_1,to_month,Line);
          
            let data_set = await generate_months(year,from_month,year_1,to_month);
            console.log(data_set)
            const finale_result = await Convert_data_1(data_set,result);
          
            res.status(200).json(finale_result);
    } catch (error) {
         res.status(404).json(error);
    }
}

exports.getData_4 = async (req,res) => {
    try {
                    const {from_date,to_date} = req.body;
                   
                    let date_from = from_date.split('-');
                    date_from.reverse();
                    let main_date_from = date_from.join("-");
                    let date_to = to_date.split('-');
                    date_to.reverse();
                    let main_date_to = date_to.join("-");
                   JSON.stringify(main_date_from);
                   JSON.stringify(main_date_to);
                    const result = await SelectedData_6(main_date_from,main_date_to);
                    console.log(result)
                    let data_set = await generate_dates(main_date_from,main_date_to);
                    console.log(data_set)
                    const finale_result = await Convert_data_2(data_set,result);
                    res.status(200).json(finale_result);
    } catch (error) {
         res.status(404).json(error);
    }
}

const Convert_data_1 = (data_set,result) => {
 
  const mergeArrays = (arr1, arr2) => {
    const mergedArray = [...arr1];
    for (let i = 0; i < mergedArray.length; i++) {
      const month = mergedArray[i].id;
      const index = arr2.findIndex(obj => obj.id === month);
      if (index !== -1) {
        mergedArray[i] = arr2[index];
      }
    }
    return mergedArray;
  };
  
  const mergedArray = mergeArrays(data_set, result);
 
    return mergedArray;

}

const Convert_data_2 = (data_set,result) => {
 
  const mergeArrays = (arr1, arr2) => {
    const mergedArray = [...arr1];
    for (let i = 0; i < mergedArray.length; i++) {
      const date = mergedArray[i].id;
      const index = arr2.findIndex(obj => obj.id == date);
      if (index !== -1) {
        mergedArray[i] = arr2[index];
      }
    }
    return mergedArray;
  };
  
  const mergedArray = mergeArrays(data_set, result);
 
    return mergedArray;

}

const Convert_data = (data_set,result) => {
 
  const mergeArrays = (arr1, arr2) => {
    const mergedArray = [...arr1];
    for (let i = 0; i < mergedArray.length; i++) {
      const year = mergedArray[i].id;
      const foundObj = arr2.find(obj => obj.id == year);
      if (foundObj) {
        mergedArray[i] = foundObj;
         mergedArray[i].id = parseInt(mergedArray[i].id)
      }
    }
    return mergedArray;
  };
  
  const mergedArray = mergeArrays(data_set, result);
 
    return mergedArray;

}

const SelectedData_2 = (from_year, to_year,Line) => {
  return new Promise((resolve, reject) => {
   
    let query = `SELECT
        SUBSTR(date, 7) AS id,
        SUM(CASE WHEN json_extract(json_data, '$.helmet') = false THEN 1 ELSE 0 END) AS helmet_count,
        SUM(CASE WHEN json_extract(json_data, '$.vest') = false THEN 1 ELSE 0 END) AS vest_count,
        SUM(CASE WHEN json_extract(json_data, '$.shoes') = false THEN 1 ELSE 0 END) AS shoes_count,
        SUM(CASE WHEN json_extract(json_data, '$.gloves') = false THEN 1 ELSE 0 END) AS gloves_count,
        SUM(CASE WHEN json_extract(json_data, '$.goggles') = false THEN 1 ELSE 0 END) AS goggles_count
      FROM dummy_table
      WHERE (SUBSTR(date, 7) between ? and ?) and (zone = ?)
      GROUP BY id`;
      db_1.all(query,[from_year,to_year,Line],(err,result) => {
        if(err){
          console.log(err);
          return reject(err);
        }
       
        return resolve(result);
})
  });
};
const SelectedData = () => {
    
    return new Promise((resolve,reject) => {
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    
        let query = `SELECT
        sum(CASE WHEN json_extract(json_data , '$.helmet') = false THEN 1 ELSE 0 END) AS helmet_count,
        sum(CASE WHEN json_extract(json_data, '$.vest') = false THEN 1 ELSE 0 END) AS vest_count,
        sum(CASE WHEN json_extract(json_data, '$.shoes') = false THEN 1 ELSE 0 END) AS shoes_count,
        sum(CASE WHEN json_extract(json_data, '$.gloves') = false THEN 1 ELSE 0 END) AS gloves_count,
        sum(CASE WHEN json_extract(json_data, '$.goggles') = false THEN 1 ELSE 0 END) AS goggles_count
    
      FROM dummy_table where date=?`;
      
        db_1.all(query,['19-06-2023'],(error,elements) => {
          if(error){
            console.log(error)
            return reject(error);
        }
        console.log(elements)
        let total_count = elements[0].helmet_count+elements[0].vest_count+elements[0].shoes_count+elements[0].goggles_count+elements[0].gloves_count;
        const data_set = [
          {Object: 'Total PPE Incidents' , Count :total_count}, 
          {Object: 'Helmet Non Adherence', Count:elements[0].helmet_count},
          {Object: 'Apron Non-Adherence', Count:elements[0].vest_count},
          {Object: 'Hand gloves Non Adherence' , Count:elements[0].gloves_count},
          {Object: 'Goggle Non Adherence' , Count:elements[0].goggles_count},
          {Object: 'Shoes Non Adherence' , Count:elements[0].shoes_count},
          {Object: 'Mobile Detection' , Count:5},
          {Object: 'Person at Robotic Cell' , Count:5}
        ]
        return resolve(data_set);

        })
       
        // pool.acquire().then((db) => {
             
        //     db.all(query,['19-06-2023'],(error,elements) => {
        //       pool.release(db);
        //     if(error){
        //         console.log(error)
        //         return reject(error);
        //     }
        
        //     let total_count = elements[0].helmet_count+elements[0].vest_count+elements[0].shoes_count+elements[0].goggles_count+elements[0].gloves_count;
        //     const data_set = [
        //       {Object: 'Total PPE Incidents' , Count :total_count}, 
        //       {Object: 'Helmet Non Adherence', Count:elements[0].helmet_count},
        //       {Object: 'Apron Non-Adherence', Count:elements[0].vest_count},
        //       {Object: 'Hand gloves Non Adherence' , Count:elements[0].gloves_count},
        //       {Object: 'Goggle Non Adherence' , Count:elements[0].goggles_count},
        //       {Object: 'Shoes Non Adherence' , Count:elements[0].shoes_count},
        //       {Object: 'Mobile Detection' , Count:5},
        //       {Object: 'Person at Robotic Cell' , Count:5}
        //     ]
        //     return resolve(data_set);

        // })  
        // })
    })
}

// const SelectedData_4 = async () => {
   
//   return new Promise((resolve,reject) => {
//     db_1.all(`select * from montlyreport`,(err,result) => {
//         if(err){
//             console.log(err);
//             return reject(err);
//         }
//        return resolve(result);
      
//     })
//   })
       
    
// }

const SelectedData_3 = async (year,from_month,year_1,to_month,Line) => {
      
     
   return new Promise((resolve,reject) => {
    let query = `SELECT
    SUBSTRING(date, 4, 2) || '-' || SUBSTRING(date, 7, 4) AS id,
    SUM(CASE WHEN json_extract(json_data, '$.helmet') = false  THEN 1 ELSE 0 END) AS helmet_count,
    SUM(CASE WHEN json_extract(json_data, '$.vest') = false THEN 1 ELSE 0 END) AS vest_count,
    SUM(CASE WHEN json_extract(json_data, '$.shoes') = false THEN 1 ELSE 0 END) AS shoes_count,
    SUM(CASE WHEN json_extract(json_data, '$.gloves') = false THEN 1 ELSE 0 END) AS gloves_count,
     SUM(CASE WHEN json_extract(json_data, '$.goggles') = false THEN 1 ELSE 0 END) AS goggles_count
  FROM dummy_table
  WHERE
   ( SUBSTRING(date, 7, 4) BETWEEN ? AND ? AND
    (SUBSTRING(date, 4, 2) >= ? OR SUBSTRING(date, 7, 4) > ?) AND
    (SUBSTRING(date, 4, 2) <= ? OR SUBSTRING(date, 7, 4) < ?) ) AND
    zone = ?
  GROUP BY id ORDER BY SUBSTRING(date, 7, 4), SUBSTRING(date, 4, 2)`

  // db_1.all(query,[year,year_1,from_month,year,to_month,year_1],(err,elements) => {
  //     if(err) {
  //       console.log(err)
  //     return reject(err);
  //     }
  //     return resolve(elements);
  // })

          pool.acquire().then((db) => {
             db.all(query,[year,year_1,from_month,year,to_month,year_1,Line],(err,elements) => {
      if(err) {
        console.log(err)
      return reject(err);
      }
     
      return resolve(elements);
  })
          })

   })   

}

const SelectedData_6 = (from_date,to_date) => {
    return new Promise((resolve,reject) => {
           let query = `select 
           date AS id,
           SUM(CASE WHEN json_extract(json_data, '$.helmet') = false  THEN 1 ELSE 0 END) AS helmet_count,
           SUM(CASE WHEN json_extract(json_data, '$.vest') = false THEN 1 ELSE 0 END) AS vest_count,
           SUM(CASE WHEN json_extract(json_data, '$.shoes') = false THEN 1 ELSE 0 END) AS shoes_count,
           SUM(CASE WHEN json_extract(json_data, '$.gloves') = false THEN 1 ELSE 0 END) AS gloves_count,
           SUM(CASE WHEN json_extract(json_data, '$.goggles') = false THEN 1 ELSE 0 END) AS goggles_count
           FROM dummy_table
           WHERE id >= '19-06-2023' AND id <= '23-06-2023'
           GROUP BY id`
           db_1.all(query,(err,result) => {
                      if(err){
                        console.log(err);
                        return reject(err);
                      }
                    
                      return resolve(result);
           })
    })
}

const generate_dates = (from_date,to_date) => {
  const dateRange = [];
  
  const currentDate = new Date(from_date);
  const endDate = new Date(to_date); 
  console.log(currentDate,endDate)
  while (currentDate <= endDate) {
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
    const dateObject = {
      id: formattedDate,
      helmet_count: 0,
      vest_count: 0,
      shoes_count: 0,
      goggles_count: 0,
      gloves_count: 0
    };
    dateRange.push(dateObject);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dateRange;
}

// const SelectedData_5 = async () => {
//     return new Promise((resolve, reject) => {
//       let query = `
//       WITH counts AS (
//         SELECT
//           substr(date, 4, 2) || '-' || substr(date, 7, 4) AS mon_year,
//           zone,
//           SUM(CASE WHEN json_extract(json_data, '$.helmet') = false THEN 1 ELSE 0 END) AS helmet_count,
//           SUM(CASE WHEN json_extract(json_data, '$.vest') = false THEN 1 ELSE 0 END) AS vest_count,
//           SUM(CASE WHEN json_extract(json_data, '$.shoes') = false THEN 1 ELSE 0 END) AS shoes_count,
//           SUM(CASE WHEN json_extract(json_data, '$.gloves') = false THEN 1 ELSE 0 END) AS gloves_count,
//           SUM(CASE WHEN json_extract(json_data, '$.goggles') = false THEN 1 ELSE 0 END) AS goggles_count
//         FROM dummy_table
//         WHERE date = '16-06-2003'
//         GROUP BY mon_year, zone
//       )
//       INSERT INTO montlyreport (mon_year, line, helmet_count, vest_count, shoes_count, goggles_count, gloves_count)
//       SELECT c.mon_year, c.zone, c.helmet_count, c.vest_count, c.shoes_count, c.goggles_count, c.gloves_count
//       FROM counts c
//       LEFT JOIN montlyreport m ON c.mon_year = m.mon_year AND c.zone = m.line
//       WHERE m.mon_year IS NULL OR m.line IS NULL;
  
//       UPDATE montlyreport
//       SET
//         helmet_count = helmet_count + (
//             SELECT c.helmet_count
//             FROM counts c
//             WHERE montlyreport.mon_year = c.mon_year
//               AND montlyreport.line = c.zone
//         ),
//         vest_count = vest_count + (
//             SELECT c.vest_count
//             FROM counts c
//             WHERE montlyreport.mon_year = c.mon_year
//               AND montlyreport.line = c.zone
//         ),
//         shoes_count = shoes_count + (
//             SELECT c.shoes_count
//             FROM counts c
//             WHERE montlyreport.mon_year = c.mon_year
//               AND montlyreport.line = c.zone
//         ),
//         goggles_count = goggles_count + (
//             SELECT c.goggles_count
//             FROM counts c
//             WHERE montlyreport.mon_year = c.mon_year
//               AND montlyreport.line = c.zone
//         ),
//         gloves_count = gloves_count + (
//             SELECT c.gloves_count
//             FROM counts c
//             WHERE montlyreport.mon_year = c.mon_year
//               AND montlyreport.line = c.zone
//         )
//       WHERE EXISTS (
//           SELECT 1
//           FROM counts c
//           WHERE montlyreport.mon_year = c.mon_year
//             AND montlyreport.line = c.zone
//       );
//       `;
    
//       db_1.run(query, (err, result) => {
//         console.log("started");
      
//         if (err) {
//           console.log(err);
//           return reject(err);
//         }
//         console.log(result);
//         console.log("ended");
//         return resolve(result);
//       });
//     });
//   };
//   ``
  
  

const monthstoname = (monthNumber) => {
    const months = {
        '01' : 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06':'June',
        '07': 'Jul',
        '08': 'Aug',
        '09':'Sep',
        '10':'Oct',
        '11':'Nov',
        '12':'Dec'
    }
    return months[monthNumber]
}

const result = new Date('2022', '2', '28').toLocaleString('en-GB', {
    month: 'numeric',
    year: 'numeric'
  });
  
  const monthAndYear = result.split(' ').join('-');
 
// if('01' == '01'){
      
//           const setData = async () => {
//                const result = await SelectedData_5();
//               console.log("between")
//               const r = await SelectedData_4();
//               console.log(r);
//           }
//           setData();

          

// }


const getMonthsInRange = (startMonth, startYear, endMonth, endYear) => {
  const startYearIndex = startYear;
  const endYearIndex = endYear;

  if (startYearIndex > endYearIndex) {
    return [];
  }

  const result = [];
  for (let year = startYearIndex; year <= endYearIndex; year++) {
    const start = (year === startYearIndex) ? startMonth : 1;
    const end = (year === endYearIndex) ? endMonth : 12;

    if (start < 1 || start > 12 || end < 1 || end > 12) {
      continue;
    }
    let helmet_count=0,vest_count=0,gloves_count=0,goggles_count=0,shoes_count=0;
    for (let month = start; month <= end; month++) {
      const formattedMonth = month.toString().padStart(2, '0');
      const id = `${formattedMonth}-${year}`;
      result.push({ id, helmet_count, vest_count,shoes_count, gloves_count, goggles_count });
    }
  }

  return result;
};




// Example usage





const generate_months =async (year,from_month,year_1,to_month) => {
 
const monthsInRange = await getMonthsInRange(from_month, year, to_month, year_1);
return monthsInRange;
}

