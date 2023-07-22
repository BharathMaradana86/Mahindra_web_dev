const express = require('express');
const mysql = require('../db/connection/mysql-connection');
const { resolve } = require('path');

// exports.daywise = async (req,res) => {
//     try {
//                const {from_date,to_date} = req.body;
//                const result = await SelectedData_4(from_date,to_date);  
//                const data_set =  [
//                 { zone: 'BSA', total_helmet_count: 0,total_vest_count:0,total_gloves_count:0,total_goggles_count:0,total_shoes_count:0 },
//                 { zone: 'DOOR', total_helmet_count: 0,total_vest_count:0,total_gloves_count:0,total_goggles_count:0,total_shoes_count:0 },
//                 { zone: 'FFA',  total_helmet_count: 0,total_vest_count:0,total_gloves_count:0,total_goggles_count:0,total_shoes_count:0 },
//                 { zone: 'TEMP', total_helmet_count: 0,total_vest_count:0,total_gloves_count:0,total_goggles_count:0,total_shoes_count:0 },
//                 { zone: 'TEMP',  total_helmet_count: 0,total_vest_count:0,total_gloves_count:0,total_goggles_count:0,total_shoes_count:0 },
//                 { zone: 'TEMP', total_helmet_count: 0,total_vest_count:0,total_gloves_count:0,total_goggles_count:0,total_shoes_count:0 }
//               ]
//              const finale_result = await Convert_data(data_set,result);
//                return res.status(200).json(finale_result)        
//     } catch (error) {
//          res.status(200).json(error);
//     }
// }


exports.timewise = async (req,res) => {
          try { 

               const {date} = req.body;
               const result = await SelectedData_5(date);
               console.log(result);
               const finale_result = await generateData_24(0,24,result)
               console.log(result);
               return res.status(200).json(finale_result);
            
          } catch (error) {
            console.log(error)
            return res.status(200).json(error);
          }
}

// exports.linewise = async (req,res) => {
//     try {        
               
//                   const result = await linewisedata();
//                   const data_set =  [
//                     { zone: 'BSA', total_zone_count: 11 },
//                     { zone: 'DOOR', total_zone_count: 177 },
//                     { zone: 'FFA', total_zone_count: 112 },
//                     { zone: 'TEMP', total_zone_count: 112 },
//                     { zone: 'TEMP', total_zone_count: 112 },
//                     { zone: 'TEMP', total_zone_count: 112 }
//                   ]
//                  const finale_result = await Convert_data(data_set,result);
                 
//                   return res.status(200).json(finale_result)
            
//     } catch (error) {
//         res.status(200).json(error);
//     }
// }


// exports.monthlywise = async (req,res) => {
//     try {
//         console.log(req.body);
//         const {year ,from_month ,year_1, to_month,Line} = req.body;
       
//        const result = await SelectedData_3(year,from_month,year_1,to_month,Line);
      
//        const finale_result = await generateData(year ,from_month ,year_1, to_month, result);
        
//        res.status(200).json(finale_result);
// } catch (error) {
//     res.status(404).json(error);
// }
// }


// exports.yearlwise = async (req,res) => {
//     try {
//         let {from_year,to_year,Line} = req.body;
//        const result = await SelectedData_2(from_year,to_year,Line);
//        const main_result = await generateData_1(from_year,to_year,result);
//        console.log(main_result)
//        res.status(200).json(main_result)
//   } catch (error) {
//       console.log(error);
//        res.status(404).json(error);
//   }
// }





// const linewisedata = () => {
//     return new Promise((resolve,reject) => {
//         mysql.query(`SELECT 
//         subquery.zone,
//         SUM(subquery.total_count) AS total_zone_count
//       FROM (
//         SELECT 
//           main.zone,
//           (
//             SELECT COUNT(*) 
//             FROM objects 
//             WHERE objects.object_id = main.object_id 
//               AND objects.object_type = 0 

//           ) AS total_count
//         FROM main
//       ) AS subquery
//       GROUP BY subquery.zone;`,(err,result) => {
//         if(err){
//             console.log(err)
//             return reject(err);
//         }
//          console.log(result);
//         const converted_result = Object.values(JSON.parse(JSON.stringify(result)));
//         console.log(converted_result)
//         return resolve(converted_result);
//       })
//     })
// }




// // const Convert_data_1 = (data_set,result) => {
 
// //     const mergeArrays = (arr1, arr2) => {
// //       const mergedArray = [...arr1];
// //       for (let i = 0; i < mergedArray.length; i++) {
// //         const year = mergedArray[i].zone;
// //         const foundObj = arr2.find(obj => obj.zone == year);
// //         if (foundObj) {
// //           mergedArray[i] = foundObj;
// //          }
// //       }
// //       return mergedArray;
// //     };
    
// //     const mergedArray = mergeArrays(data_set, result);
   
// //       return mergedArray;
  
// //   }



// const Convert_data = (data_set,result) => {
 
//     const mergeArrays = (arr1, arr2) => {
//       const mergedArray = [...arr1];
//       for (let i = 0; i < mergedArray.length; i++) {
//         const year = mergedArray[i].zone;
//         const foundObj = arr2.find(obj => obj.zone == year);
//         if (foundObj) {
//           mergedArray[i] = foundObj;
          
//         }
//       }
//       return mergedArray;
//     };
    
//     const mergedArray = mergeArrays(data_set, result);
   
//       return mergedArray;
  
//   }



//   const SelectedData_3 = async (year,from_month,year_1,to_month,Line) => {
      
     
//     return new Promise((resolve,reject) => {
 
//             mysql.query(`SELECT
//             CONCAT(YEAR(subquery.date), '-', LPAD(MONTH(subquery.date), 2, '0')) AS id,
//             SUM(subquery.helmet_count) AS total_helmet_count,
//             SUM(subquery.vest_count) AS total_vest_count,
//             SUM(subquery.gloves_count) AS total_gloves_count,
//             SUM(subquery.goggles_count) AS total_goggles_count,
//             SUM(subquery.shoes_count) AS total_shoes_count
//           FROM (
//             SELECT
//               main.date,
//               (SELECT COUNT(*) FROM objects WHERE objects.object_id = main.object_id AND objects.object_type = 0 AND objects.object_value = 'temp') AS helmet_count,
//               (SELECT COUNT(*) FROM objects WHERE objects.object_id = main.object_id AND objects.object_type  = 'vest' AND objects.object_value = '1') AS vest_count,
//               (SELECT COUNT(*) FROM objects WHERE objects.object_id = main.object_id AND objects.object_type  = 'gloves' AND objects.object_value = '1') AS gloves_count,
//               (SELECT COUNT(*) FROM objects WHERE objects.object_id = main.object_id AND objects.object_type  = 'goggles' AND objects.object_value= '1') AS goggles_count,
//               (SELECT COUNT(*) FROM objects WHERE objects.object_id = main.object_id AND objects.object_type  = 'shoes' AND objects.object_value= '1') AS shoes_count
//             FROM
//               main
//             WHERE
//               (YEAR(main.date) = ${year} AND MONTH(main.date) >= ${from_month})
//               OR (YEAR(main.date) > ${year} AND YEAR(main.date) < ${year_1})
//               OR (YEAR(main.date) = ${year_1} AND MONTH(main.date) <= ${to_month})
//             GROUP BY
//               main.date, main.object_id  
//           ) AS subquery
//           WHERE
//             (YEAR(subquery.date) = 2009 AND MONTH(subquery.date) >= 5)
//             OR (YEAR(subquery.date) > 2009 AND YEAR(subquery.date) < 2023)
//             OR (YEAR(subquery.date) = 2023 AND MONTH(subquery.date) <= 12)
//           GROUP BY
//             CONCAT(YEAR(subquery.date), '-', LPAD(MONTH(subquery.date), 2, '0'));`,(err,result) => {
//              if(err){
//                return reject(err);
//              }
//              const results = Object.values(JSON.parse(JSON.stringify(result)));
//              console.log(results);
//              return resolve(results);
//             })
 
//     })   
 
//  }
//  function generateData(year ,from_month ,year_1, to_month, rawData) {
//     const startYear = year;
//     const endYear = year_1;
//     const startMonth = from_month;
//     const endMonth =to_month;
  
//     const data = [
//       { id: "total", color: "hsl(288, 70%, 50%)", data: [] },
//       { id: "helmet", color: "hsl(257, 70%, 50%)", data: [] },
//       { id: "vest", color: "hsl(180, 70%, 50%)", data: [] },
//       { id: "gloves", color: "hsl(120, 70%, 50%)", data: [] },
//       { id: "goggles", color: "hsl(60, 70%, 50%)", data: [] },
//       { id: "shoes", color: "hsl(0, 70%, 50%)", data: [] }
//     ];
  
//     const months = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec"
//     ]; 
//     let total_count=0;
  
//     for (let year = startYear; year <= endYear; year++) {
//       const start = (year === startYear) ? startMonth : 0;
//       const end = (year === endYear) ? endMonth : 11;
  
//       for (let month = start; month <= end; month++) {
//         const id = `${months[month]} ${String(year).substr(2)}`;
//         const color = getColorById(id);
     
//       month_data = month+1
//       const monthStr = month < 10 ? `0${month_data}` : `${month_data}`;
//         const filteredData = rawData.find(item => item.id == `${year}-${monthStr}`);
//         console.log(filteredData)
         
     
  
//         if(filteredData !== undefined){
//             total_count += filteredData.total_helmet_count +  filteredData.total_vest_count + filteredData.total_gloves_count + filteredData.total_goggles_count + filteredData.total_shoes_count
       
//              data[0].data.push({x:id,y:total_count});   
//         data[1].data.push({ x: id, y: filteredData.total_helmet_count });
//         data[2].data.push({ x: id, y: filteredData.total_vest_count });
//          data[3].data.push({ x: id, y: filteredData.total_gloves_count });
//         data[4].data.push({ x: id, y: filteredData.total_goggles_count });
//         data[5].data.push({ x: id, y:filteredData.total_shoes_count });
       
//     }
//         else{
//             data[0].data.push({x:id,y:0})
//             data[1].data.push({ x: id, y: 0 });
//             data[2].data.push({ x: id, y: 0});
//              data[3].data.push({ x: id, y: 0 });
//             data[4].data.push({ x: id, y: 0 });
//             data[5].data.push({ x: id, y:0 });
//         }
  
       
//       }
//     }
    
//     return data;
//   }
  
//   // Example usage:
// //   const startDate = new Date(2015, 9); // October 2015
// //   const endDate = new Date(2015, 11); // December 2015
  
// //   const rawData = [
// //     {
// //       "id": "2015-10",
// //       "total_helmet_count": 10,
// //       "total_vest_count": 20,
// //       "helmet_gloves_count": 30,
// //       "total_goggles_count": 40,
// //       "total_shoes_count": 50
// //     },
// //     {
// //       "id": "2015-11",
// //       "total_helmet_count": 15,
// //       "total_vest_count": 25,
// //       "helmet_gloves_count": 35,
// //       "total_goggles_count": 45,
// //       "total_shoes_count": 55
// //     },
// //     {
// //       "id": "2015-12",
// //       "total_helmet_count": 12,
// //       "total_vest_count": 22,
// //       "helmet_gloves_count": 32,
// //       "total_goggles_count": 42,
// //       "total_shoes_count": 52
// //     }
// //   ];
  
// //   const data = generateData(startDate, endDate, rawData);
  
// //   console.log(data[0].data);
  
//   // Helper functions
  
//   // Generates a random color in HSL format
//   function generateRandomColor() {
//     const hue = Math.floor(Math.random() * 360);
//     return `hsl(${hue}, 70%, 50%)`;
//   }
  
//   // Generates an array of random data values
//   function generateRandomData(length, min, max) {
//     return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
//   }
  
//   // Retrieves the color based on the ID
//   function getColorById(id) {
//     const colorMap = {
//       "total": "hsl(288, 70%, 50%)",
//       "helmet": "hsl(257, 70%, 50%)",
//       "vest": "hsl(180, 70%, 50%)",
//       "gloves": "hsl(120, 70%, 50%)",
//       "goggles": "hsl(60, 70%, 50%)",
//       "shoes": "hsl(0, 70%, 50%)"
//     };
  
//     return colorMap[id] || generateRandomColor();
//   }
  



//   function generateData_1(year, to_year, rawData) {
//     const startYear = year;
//     const endYear = to_year;
  
//     const data = [
//       { id: "total", color: "hsl(288, 70%, 50%)", data: [] },
//       { id: "helmet", color: "hsl(257, 70%, 50%)", data: [] },
//       { id: "vest", color: "hsl(180, 70%, 50%)", data: [] },
//       { id: "gloves", color: "hsl(120, 70%, 50%)", data: [] },
//       { id: "goggles", color: "hsl(60, 70%, 50%)", data: [] },
//       { id: "shoes", color: "hsl(0, 70%, 50%)", data: [] }
//     ];
  
  
//     let total_count = 0;
  
//     for (let year = startYear; year <= endYear; year++) {
//       const filteredData = rawData.find(item => item.id == `${year}`);
//       console.log(filteredData)
//       if (filteredData) {
//         total_count += filteredData.total_helmet_count +
//           filteredData.total_vest_count +
//           filteredData.total_gloves_count +
//           filteredData.total_goggles_count +
//           filteredData.total_shoes_count;
  
//         data[0].data.push({ x: `${year}`, y: total_count });
//         data[1].data.push({ x: `${year}`, y: filteredData.total_helmet_count });
//         data[2].data.push({ x: `${year}`, y: filteredData.total_vest_count });
//         data[3].data.push({ x: `${year}`, y: filteredData.total_gloves_count });
//         data[4].data.push({ x: `${year}`, y: filteredData.total_goggles_count });
//         data[5].data.push({ x: `${year}`, y: filteredData.total_shoes_count });
//       } else {
//         data[0].data.push({ x: `${year}`, y: 0 });
//         data[1].data.push({ x: `${year}`, y: 0 });
//         data[2].data.push({ x: `${year}`, y: 0 });
//         data[3].data.push({ x: `${year}`, y: 0 });
//         data[4].data.push({ x: `${year}`, y: 0 });
//         data[5].data.push({ x: `${year}`, y: 0 });
//       }
//     }
  
//     return data;
//   }
  function generateData_24(hour, to_hour, rawData) {
    const startHour = hour;
    const endHour = to_hour;
  
    const zones = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5', 'Zone 6', 'Zone 7'];
  
    const data = [
      { id: "total", color: "hsl(288, 70%, 50%)", data: [] },
      { id: "Zone 1", color: "hsl(257, 70%, 50%)", data: [] },
      { id: "Zone 2", color: "hsl(180, 70%, 50%)", data: [] },
      { id: "Zone 3", color: "hsl(120, 70%, 50%)", data: [] },
      { id: "Zone 4", color: "hsl(60, 70%, 50%)", data: [] },
      { id: "Zone 5", color: "hsl(0, 70%, 50%)", data: [] },
      { id: "Zone 6", color: "hsl(120, 70%, 50%)", data: [] },
      { id: "Zone 7", color: "hsl(257, 70%, 50%)", data: [] }
    ];
  
    let total_count = 0;
  
    for (let hour = startHour; hour <= endHour; hour++) {
      const filteredData = rawData.find(item => item.id == `${hour}:00`);
    const total_count = filteredData ? (filteredData.helmet_count + filteredData.vest_count + filteredData.gloves_count + filteredData.goggles_count + filteredData.shoes_count) : 0;

    data[0].data.push({ x: `${hour}:00`, y: total_count });
    data[1].data.push({ x: `${hour}:00`, y: filteredData ? filteredData.helmet_count : 0 });
    data[2].data.push({ x: `${hour}:00`, y: filteredData ? filteredData.vest_count : 0 });
    data[3].data.push({ x: `${hour}:00`, y: filteredData ? filteredData.gloves_count : 0 });
    data[4].data.push({ x: `${hour}:00`, y: filteredData ? filteredData.goggles_count : 0 });
    data[5].data.push({ x: `${hour}:00`, y: filteredData ? filteredData.shoes_count : 0 });
     
    }
  
    return data;
  }
  
  
  
// const SelectedData_2 = (from_year, to_year,Line) => {
//     return new Promise((resolve, reject) => {
     
//         mysql.query(`  SELECT
//         YEAR(subquery.date) AS id,
//         SUM(subquery.helmet_count) AS total_helmet_count,
//         SUM(subquery.vest_count) AS total_vest_count,
//         SUM(subquery.gloves_count) AS total_gloves_count,
//         SUM(subquery.goggles_count) AS total_goggles_count,
//         SUM(subquery.shoes_count) AS total_shoes_count
//       FROM (
//         SELECT
//         main.date,
//         (SELECT COUNT(*) FROM objects WHERE objects.object_id = main.object_id AND objects.object_type = '0' AND objects.object_value = 
//        'temp') AS helmet_count,
//         (SELECT COUNT(*) FROM objects WHERE objects.object_id = main.object_id AND objects.object_type  = 'vest' AND objects.object_value = 1) AS vest_count,
//         (SELECT COUNT(*) FROM objects WHERE objects.object_id = main.object_id AND objects.object_type  = 'gloves' AND objects.object_value = 1) AS gloves_count,
//         (SELECT COUNT(*) FROM objects WHERE objects.object_id = main.object_id AND objects.object_type  = 'goggles' AND objects.object_value= 1) AS goggles_count,
//         (SELECT COUNT(*) FROM objects WHERE objects.object_id = main.object_id AND objects.object_type  = 'shoes' AND objects.object_value= 1) AS shoes_count
//         FROM
//         main
//         WHERE
//         YEAR(main.date) BETWEEN 2009 AND 2023
//         GROUP BY
//         main.date, main.object_id  
//       ) AS subquery
//       WHERE
//         YEAR(subquery.date) BETWEEN 2009 AND 2023
//       GROUP BY
//         YEAR(subquery.date);`,(err,result) => {
//           if(err){
//             console.log(err);
//             return reject(err);
//           }

//          const results = Object.values(JSON.parse(JSON.stringify(result)));
//            console.log(results);
//           return resolve(results);
//   })
//     });
//   };


//   const SelectedData_4 = (from_date,to_date) => {
//          return new Promise((resolve,reject) => {
//             mysql.query(`SELECT
//             subquery.zone,
//             SUM(subquery.helmet_count) AS total_helmet_count,
//             SUM(subquery.vest_count) AS total_vest_count,
//             SUM(subquery.gloves_count) AS total_gloves_count,
//             SUM(subquery.goggles_count) AS total_goggles_count,
//             SUM(subquery.shoes_count) AS total_shoes_count
//           FROM (
//             SELECT   
//               main.date,main.zone,
//               (SELECT COUNT(*) FROM objects WHERE objects.object_id = main.object_id AND objects.object_value = 'temp' AND objects.object_type = 0) AS helmet_count,
//               (SELECT COUNT(*) FROM objects WHERE objects.object_id = main.object_id AND objects.object_value  = 'vest' AND objects.object_type  = 1) AS vest_count,
//               (SELECT COUNT(*) FROM objects WHERE objects.object_id = main.object_id AND objects.object_value = 'gloves' AND objects.object_type  = 1) AS gloves_count,
//               (SELECT COUNT(*) FROM objects WHERE objects.object_id = main.object_id AND objects.object_value = 'goggles' AND objects.object_type  = 1) AS goggles_count,
//               (SELECT COUNT(*) FROM objects WHERE objects.object_id = main.object_id AND objects.object_value = 'shoes' AND objects.object_type  = 1) AS shoes_count
//             FROM
//               main
//             WHERE
//               main.date BETWEEN '${from_date}' AND '${to_date}'
//             GROUP BY
//               main.date,main.object_id,main.zone
//           ) AS subquery
//           GROUP BY
//             subquery.zone`,(err,result) => {
//                        if(err){
//                         return reject(err);
//                        }
//                        return resolve(result);
//             })
//          })
//   }


  const SelectedData_5 = (date) => {
            return new Promise((resolve,reject) => {
                mysql.query(`SELECT
                CONCAT( HOUR(main.time), ':00') AS id,
                  SUM(CASE WHEN objects.object_value = 'temp' THEN 1 ELSE 0 END) AS helmet_count,
                  SUM(CASE WHEN objects.object_value = 'vest' THEN 1 ELSE 0 END) AS vest_count,
                  SUM(CASE WHEN objects.object_value = 'gloves' THEN 1 ELSE 0 END) AS gloves_count,
                  SUM(CASE WHEN objects.object_value = 'goggles' THEN 1 ELSE 0 END) AS goggles_count,
                  SUM(CASE WHEN objects.object_value = 'shoes' THEN 1 ELSE 0 END) AS shoes_count FROM main JOIN objects ON main.object_id = objects.object_id WHERE main.date = '${date}' GROUP BY id;`,(err,result) => {
                if(err){
                    return reject(err);
                }
                const results = JSON.parse(JSON.stringify(result));
                return resolve(results);
              })
            })
  }


exports.zonewise =async (req,res) => {
          try {
            const {currentDate} = req.body

             const result = await selectedData(currentDate);

             let data_set = [
              {
                   line: "1",
                   count:0
              },
                      {
                        line: "2",
                        count:0
                  },
                  {
                    line: "3",
                    count:0
                        },
                     {
                 line: "3",
                 count:0
                 },
                  {
                     line: "4",
                     count:0
                   },
                  {
                     line: "5",
                     count:0
                  },
            ]
             const finale_result = await Convert_data(data_set,result);
             console.log(finale_result)
             return res.status(200).json(finale_result)
          } catch (error) {
             return res.status(200).json(error);
          }
}






exports.zoneselection =async (req,res) => {
  try {
    const {date,line} = req.body
    console.log(req.body);
     const result = await selectedData_1(date,line);
     console.log(result);
  let data_set = [   {
      "id": "helmet",
      "label": "helmet",
      "value": 0,
      "color": "hsl(211, 70%, 50%)"
    },
    {
      "id": "vest",
      "label": "vest",
      "value": 0,
      "color": "hsl(294, 70%, 50%)"
    },
    {
      "id": "goggle",
      "label": "goggle",
      "value": 0,
      "color": "hsl(24, 70%, 50%)"
    },
    {
      "id": "gloves",
      "label": "gloves",
      "value": 0,
      "color": "hsl(343, 70%, 50%)"
    },
    {
      "id": "shoes",
      "label": "shoes",
      "value": 0,
      "color": "hsl(48, 70%, 50%)"
    }
    ]
    console.log(data_set)
    if(result.length){
      console.log(result[0].total_helmet_count);
      data_set = [
        {
          "id": "helmet",
          "label": "helmet",
          "value": result[0].total_helmet_count,
          "color": "hsl(211, 70%, 50%)"
        },
        {
          "id": "vest",
          "label": "vest",
          "value": result[0].total_vest_count,
          "color": "hsl(294, 70%, 50%)"
        },
        {
          "id": "goggle",
          "label": "goggle",
          "value": result[0].total_goggles_count,
          "color": "hsl(24, 70%, 50%)"
        },
        {
          "id": "gloves",
          "label": "gloves",
          "value": result[0].total_gloves_count,
          "color": "hsl(343, 70%, 50%)"
        },
        {
          "id": "shoes",
          "label": "shoes",
          "value": result[0].total_shoes_count,
          "color": "hsl(48, 70%, 50%)"
        }
           
      ]  
      console.log(data_set)  
    }
     console.log("something" 
     +data_set)
     return res.status(200).json(data_set)
  } catch (error) {
     return res.status(400).json(error);
  }
}



exports.monthlywise =async (req,res) => {
    try {
      const {month,year,line} = req.body;
      console.log(month);
      const result = await selectedData_2(month,year,line);
      console.log(result);
      const finale_result = await generateData_1(year,month,result);
      return res.status(200).json(finale_result);
    } catch (error) {
        return res.status(200).json(error);
    }
}


exports.yearwise = async (req,res) => {
  try {
             const {year,line} = req.body;
             const result = await selectedData_3(year,line);
             const finale_result = await generateData_2(year,result);
             console.log(finale_result);
             return res.status(200).json(finale_result)
  } catch (error) {
      return res.status(200).json(error)
  }
}


const selectedData_3 = (year,line) => {
  return new Promise((resolve,reject) => {
                mysql.query(` SELECT   month_year as id,   SUM(helmet_count) AS total_helmet_count,   SUM(vest_count) AS total_vest_count,   SUM(goggles_count) AS total_goggles_count,
                SUM(gloves_count) AS total_gloves_count,   SUM(shoes_count) AS total_shoes_count FROM   monthlyreport WHERE   month_year LIKE '${year}-%' GROUP BY   month_year;`,(err,result) => {
                  if(err){
                    return reject(err);
                  }
                  const results = JSON.parse(JSON.stringify(result));
                  return resolve(results)
                })  
  })
}

const selectedData_2 = (month,year) => {
  return new Promise((resolve,reject) => {
             let main_month = parseInt(month);
             let main_year = parseInt(year)
              mysql.query(`SELECT
              day_month_year as id,
              SUM(helmet_count) AS total_helmet_count,
              SUM(vest_count) AS total_vest_count,
              SUM(goggles_count) AS total_goggles_count,
              SUM(gloves_count) AS total_gloves_count,
              SUM(shoes_count) AS total_shoes_count
          FROM
              dailyreport
          WHERE
              MONTH(day_month_year) = ${main_month}
              AND YEAR(day_month_year) = ${main_year}
          GROUP BY
              day_month_year
          ORDER BY
              day_month_year;`,(err,result) => {
                if(err){
                  return reject(err);
                }
                const results = JSON.parse(JSON.stringify(result));
                return resolve(results);
              })
  })
}

const selectedData = (currentDate) => {
     return new Promise((resolve,reject) => {
      console.log(currentDate)
          mysql.query(`select line,(sum(helmet_count) + sum(vest_count) + sum(goggles_count) + sum(gloves_count) + sum(shoes_count)) as count from dailyreport where day_month_year='${currentDate}' group by line;`,(err,result) => {
            if(err){
              return reject(err);
            }
            
            const results = JSON.parse(JSON.stringify(result));
            console.log(results);
            return resolve(results);
          })
     })
}

const selectedData_1 = (currentDate,line) => {
  return new Promise((resolve,reject) => {
       mysql.query(`select day_month_year as date,sum(helmet_count) as total_helmet_count,sum(vest_count) as total_vest_count,sum(goggles_count) as total_goggles_count,sum(gloves_count) as total_gloves_count,sum(shoes_count) as total_shoes_count from dailyreport where (day_month_year= '${currentDate}')AND line='${line}' group by day_month_year;`,(err,result) => {
         if(err){
           return reject(err);
         }
         const results = JSON.parse(JSON.stringify(result));
         return resolve(results);
       })
  })
}


const Convert_data = (data_set,result) => {
 
  const mergeArrays = (arr1, arr2) => {
    const mergedArray = [...arr1];
    for (let i = 0; i < mergedArray.length; i++) {
      const line = mergedArray[i].line;
      console.log(line);
      const foundObj = arr2.find(obj => obj.line == line);
      if (foundObj) {
        mergedArray[i] = foundObj;
        mergedArray[i].count =parseInt(mergedArray[i].count)
      }
    }
    return mergedArray;
  };
  
  const mergedArray = mergeArrays(data_set, result);
 
    return mergedArray;

}



function generateData_1(year, month, rawData) {
  const data = [
    { id: "total", color: "hsl(288, 70%, 50%)", data: [] },
    { id: "helmet", color: "hsl(257, 70%, 50%)", data: [] },
    { id: "vest", color: "hsl(180, 70%, 50%)", data: [] },
    { id: "gloves", color: "hsl(120, 70%, 50%)", data: [] },
    { id: "goggles", color: "hsl(60, 70%, 50%)", data: [] },
    { id: "shoes", color: "hsl(0, 70%, 50%)", data: [] }
  ];

  for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
    const day = i.toString().padStart(2, '0');
    console.log(month)
    const filteredData = rawData.find(item => item.id == `${year}-0${month}-${day}`);
    const total_count = filteredData ? (filteredData.total_helmet_count + filteredData.total_vest_count + filteredData.total_gloves_count + filteredData.total_goggles_count + filteredData.total_shoes_count) : 0;

    data[0].data.push({ x: `${year}-${month}-${day}`, y: total_count });
    data[1].data.push({ x: `${year}-${month}-${day}`, y: filteredData ? filteredData.total_helmet_count : 0 });
    data[2].data.push({ x: `${year}-${month}-${day}`, y: filteredData ? filteredData.total_vest_count : 0 });
    data[3].data.push({ x: `${year}-${month}-${day}`, y: filteredData ? filteredData.total_gloves_count : 0 });
    data[4].data.push({ x: `${year}-${month}-${day}`, y: filteredData ? filteredData.total_goggles_count : 0 });
    data[5].data.push({ x: `${year}-${month}-${day}`, y: filteredData ? filteredData.total_shoes_count : 0 });
  }

  return data;
}



function generateData_2(year, rawData) {
  const data = [
    { id: "total", color: "hsl(288, 70%, 50%)", data: [] },
    { id: "helmet", color: "hsl(257, 70%, 50%)", data: [] },
    { id: "vest", color: "hsl(180, 70%, 50%)", data: [] },
    { id: "gloves", color: "hsl(120, 70%, 50%)", data: [] },
    { id: "goggles", color: "hsl(60, 70%, 50%)", data: [] },
    { id: "shoes", color: "hsl(0, 70%, 50%)", data: [] }
  ];

  for (let month = 1; month <= 12; month++) {
    const monthStr = month.toString().padStart(2, '0');
    const filteredData = rawData.filter(item => item.id == `${year}-${monthStr}`);

    const total_count = filteredData.reduce((acc, item) => {
      return acc + item.total_helmet_count + item.total_vest_count + item.total_gloves_count + item.total_goggles_count + item.total_shoes_count;
    }, 0);

    data[0].data.push({ x: `${year}-${monthStr}`, y: total_count });
    data[1].data.push({ x: `${year}-${monthStr}`, y: filteredData.reduce((acc, item) => acc + item.total_helmet_count, 0) });
    data[2].data.push({ x: `${year}-${monthStr}`, y: filteredData.reduce((acc, item) => acc + item.total_vest_count, 0) });
    data[3].data.push({ x: `${year}-${monthStr}`, y: filteredData.reduce((acc, item) => acc + item.total_gloves_count, 0) });
    data[4].data.push({ x: `${year}-${monthStr}`, y: filteredData.reduce((acc, item) => acc + item.total_goggles_count, 0) });
    data[5].data.push({ x: `${year}-${monthStr}`, y: filteredData.reduce((acc, item) => acc + item.total_shoes_count, 0) });
  }

  return data;
}