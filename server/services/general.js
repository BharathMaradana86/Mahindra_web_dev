const express = require('express');
const {db_1} = require('../db/connection/sql-connection');
const bcrypt = require('bcrypt')
const { hashSync, genSaltSync , compareSync, genSalt } = bcrypt
const jwt = require('jsonwebtoken');
const { resolve } = require('path');
const { rejects } = require('assert');


const register = async (First_name,Last_name,Email,Password,confirm_password) => {
                  return new Promise((resolve,rejects) => {
                      let query = `INSERT INTO users(First_name,Last_name,Email,Password,Confirm_password,type) values(?,?,?,?,?,?)`;
                      db_1.all(query,[First_name,Last_name,Email,Password,confirm_password,"Admin"],(err,result) => {
                        if(err){
                            console.log(err);
                            return rejects(err);
                        }
                         
                        return resolve(result);
                      })
                  })
}

const check_user = (Email) => {
    
               return new Promise((resolve,rejects) => {
                
                          let query = `select * from users where Email = ? limit 1`
                         
                          db_1.all(query,[Email],(err,result) => {
                                    if(err) {
                                      console.log(err)
                                        return rejects(err);
                                    }
                                  //  console.log(result)
                                    return resolve(result);
                          })
               })
}

const updatedPassword = (email,newPassword) => {
  return new Promise((resolve,rejects) => {
    let query = `update users set Password = ? , Confirm_Password =? where Email = ?;`;
    db_1.all(query,[newPassword,newPassword,email],(err,result) => {
      if(err) {
            console.log(err)
             return rejects(err);
      }

      return resolve(result);
    })
  })
}

const present = (Email,Password) => {
  return new Promise((resolve,rejects) => {
    let query = `select * from users where Email = ? and Password = ?`;
    db_1.all(query,[Email,Password],(err,result) =>{
      if(err){
        return rejects(err);
      }
      console.log(result);
      return resolve(result);
    })
  })
}
exports.register_user = async(req,res) => {
    try {
              const {First_name,Last_name,Email,Password,Confirm_password} = req.body;
              // checking password and confirm password are same or not
              
              if(Password !== Confirm_password){
                return res.status(200).json("Password and Confirm password are not matching")
              }
              //
             
              // checking whether user is already registered or not.
               const salt = genSaltSync(10);
               let duplicate_password = hashSync(Password, salt);
               
               const check = await check_user(Email);
              
              if(check.length){
               
               return res.status(200).json("User Already Exists");
              }
             
              const result = await register(First_name,Last_name,Email,duplicate_password,duplicate_password);
              
             return res.status(200).json(result);
    } catch (error) {
       return res.status(404).status(error);
    }
}



exports.login_user = async (req,res) => {
  try {
              const { Email, Password} = req.body;

              const check_email = await check_user(Email);
              
              if(!check_email.length){
                return res.status(200).json("Email Doesn't Exists please register")
              }
              let userPassword = Password;
              let dataPassword = check_email[0].Password;
              let dup_pass = compareSync(userPassword,dataPassword)
             console.log(userPassword,dup_pass);
              if(!dup_pass){
             return  res.status(200).json("Password Wrong!!");
              }
              const secreatekey="EternalRobotics"
              const payload={
                  user:{
                      email: Email
                  }
              }
             jwt.sign(payload,'EternalRobotics',{expiresIn:3600000},
                  (err,token)=>{
                   
                      if(err) throw err;
                     console.log(token)
                     return  res.status(200).json(token);
                  }
              )                
  } catch (error) {
   return  res.status(404).status(error);
  }
}


exports.profile_page = async (req,res) =>{
          
           try {
                
                  const profile_data = await check_user(req.user.email);
                  console.log(profile_data)
                  return res.status(200).json(profile_data);
           } catch (error) {
             return res.status(404).json(error)
           }
}


exports.updatePassword = async (req,res) => {
     try {
           
             const {  newPassword } = req.body;
            
             const salt = genSaltSync(10);
             let duplicate_password = hashSync(newPassword, salt);
           const result =  await updatedPassword(req.user.email,duplicate_password);

             return res.status(200).json(result)
             
     } catch (error) {
        return res.status(404).json(error)
     }
}
