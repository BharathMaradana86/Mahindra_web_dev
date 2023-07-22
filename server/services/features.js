const express = require('express');
const mysql = require('../db/connection/mysql-connection')

exports.features = async (req,res) => {
    try {
        const { checkedHelmet,
            checkedApron,
            checkedGloves,
            checkedGoggle,
            checkedShoes}
            = req.body;
            console.log("something")
            let count_1 = checkedHelmet ? 1 : 0;
            let count_2 = checkedApron ? 1 : 0;
            let count_3 = checkedGloves ? 1 : 0;
            let count_4 = checkedGoggle ? 1 : 0;
            let count_5 = checkedShoes ? 1 :0;
        const result = await selectedData_1(count_1,count_2,count_3,count_4,count_5);
        console.log(result);
        return res.status(200).json("result");
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}


const selectedData_1 = (checkedHelmet,checkedApron,checkedGloves,checkedGoggle,checkedShoes) => {
    return new Promise((reject,resolve) => {
          mysql.query(`update features set helmet=${checkedHelmet},vest=${checkedApron},gloves=${checkedGloves},goggle=${checkedGoggle},shoes=${checkedShoes} where camera_id='global'`,(err,result) => {
            if(err){
                console.log(err) 
                return reject(err);}
            return resolve(result);
          })
    })
}