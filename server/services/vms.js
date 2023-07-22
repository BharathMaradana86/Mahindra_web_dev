const express = require('express');
const mysql = require('../db/connection/mysql-connection')

exports.getfilters = async (req,res) => {
      try {   
               const {camera_id,stage_name} = req.body;
               console.log(camera_id)
              const result = await getfilters_1(camera_id,stage_name);
              return res.status(200).json(result)
      } catch (error) {
        console.log(error)
         return res.status(400).json(error)
      }
}
exports.vmsfilters = async (req,res) => {
    try {
        const { checkedHelmet,
            checkedApron,
            checkedGloves,
            checkedGoggle,
            checkedShoes,camera_id,stage_name}
            = req.body;
            let count_1 = checkedHelmet ? 1 : 0;
            let count_2 = checkedApron ? 1 : 0;
            let count_3 = checkedGloves ? 1 : 0;
            let count_4 = checkedGoggle ? 1 : 0;
            let count_5 = checkedShoes ? 1 :0;
        const result = await selectedData_1(count_1,count_2,count_3,count_4,count_5,camera_id,stage_name);
        console.log(result);
        return res.status(200).json("result");
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}


const selectedData_1 = (checkedHelmet,checkedApron,checkedGloves,checkedGoggle,checkedShoes,camera_id,stage_id) => {
    return new Promise((reject,resolve) => {
          mysql.query(`update features set helmet=${checkedHelmet},vest=${checkedApron},gloves=${checkedGloves},goggle=${checkedGoggle},shoes=${checkedShoes} where camera_id='${camera_id}' and line=${stage_id}`,(err,result) => {
            if(err){
                console.log(err) 
                return reject(err);}
            return resolve(result);
          })
    })
}

const getfilters_1 = (camera_id,stage_name) => {
    return new Promise((reject,resolve) => {
        console.log("something no one")
            mysql.query(`select * from features where camera_id='${camera_id}' and line='${stage_name}'`,(err,result) => {
                if(err) console.log(err)
                if(err) return reject(err);
                result = JSON.parse(JSON.stringify(result));
                const finale_result = []
               
           if(result){
            if(result[0]){
              if(result[0].helmet){
                            if(result[0].helmet.data[0]) finale_result.push("Helmet Non Adherence");
              }
              if(result[0].helmet){
                if(result[0].helmet.data[0]) finale_result.push("Apron Non-Adherence");
  }
  if(result[0].vest){
    if(result[0].vest.data[0]) finale_result.push("Hand gloves Non Adherence");
}
 if(result[0].goggle){
  if(result[0].goggle.data[0]) finale_result.push("Goggle Non Adherence");
}
if(result[0].shoes){
  if(result[0].shoes.data[0]) finale_result.push("Mobile Detection");
}
              
            }
           }
                return resolve(finale_result);
            })
    })
}