const express = require('express');
const mysql = require('../db/connection/mysql-connection')

exports.selectcamera = async (req,res) => {
                try {
                    const id = req.params.id;
                    const newRtspStreamUrl = 'rtsp://admin:eternaler4444@192.168.29.185:554/cam/realmonitor?channel='+id+'subtype=0';
                
                    // Create the WebSocket stream only if it doesn't exist or the RTSP URL has changed
                    if (!stream || currentRtspStreamUrl !== newRtspStreamUrl) {
                      if (stream) {
                        stream.stop();
                      }
                      // stream = new Stream({
                      //   name: 'Camera Stream',
                      //   streamUrl: newRtspStreamUrl,
                      //   wsPort: 9999
                      // });
                      stream = new Stream({
                        name: "Bunny",
                        // streamUrl: "rtsp://YOUR_IP:PORT",
                        streamUrl: `rtsp://admin:eternaler4444@192.168.29.185:554/cam/realmonitor?channel=${id}subtype=0`,
                        wsPort: 6790,
                        ffmpegOptions: { // options ffmpeg flags
                          "-f": "mpegts", // output file format.
                          "-codec:v": "mpeg1video", // video codec
                          "-b:v": "1000k", // video bit rate
                          "-stats": "",
                          "-r": 25, // frame rate
                          "-s": "640x480", // video size
                          "-bf": 0,
                          // audio
                          "-codec:a": "mp2", // audio codec
                          "-ar": 44100, // sampling rate (in Hz)(in Hz)
                          "-ac": 1, // number of audio channels
                          "-b:a": "128k", // audio bit rate
                        },
                      });
                      currentRtspStreamUrl = newRtspStreamUrl;
                      mysql.query(`update camera set camera_line=${req.body.camera_line},camera_stage=${req.body.camera_stage} where camera_line=1`,(err,result) => {
                            if(err){
                                console.log(err)

                            }
                            console.log(result);
                      })
                    }
                return res.status(200).json("stream started")
                } catch (error) {
                    res.status(200).json(error)
                }
}


exports.getfiltereddata = async (req,res) => {
    try { 
           const {filtername,camera_id,stage_line} = req.body;
           let result = [];
           if(filtername == 'global'){
          
            const valued = await setfeature(camera_id,stage_line);
            result = await getresult();
           }
           else {
            const valued_1 = await setfeature_1(camera_id,stage_line)
            result = await getresult_1(stage_line,camera_id);
           }
           result = JSON.parse(JSON.stringify(result))
           return res.status(200).json(result);
    } catch (error) {
       return res.status(200).json(error);
    }
}

const setfeature =  (camera_id,stage_line) => {
        return new Promise((resolve,reject) => {
          console.log("nonthing")
          mysql.query(`update features set check_feature=1 where camera_id='${camera_id}' and line='${stage_line}'`,(err,result) => {
            if(err){
              return reject(err);
            }
           result = JSON.parse(JSON.stringify(result))
           
           return resolve(result);
          })
        })
}

const setfeature_1 =  (camera_id,stage_line) => {
  return new Promise((resolve,reject) => {
    mysql.query(`update features set check_feature=0 where camera_id='${camera_id}' and line='${stage_line}'`,(err,result) => {
      if(err){
        return reject(err);
      }
     result = JSON.parse(JSON.stringify(result))
     return resolve(result);
    })
  })
}

const getresult = () => {
            return new Promise((resolve,reject) => {
                   mysql.query(`select * from features where line='global'`,(err,result) => {
                          if(err){
                            console.log(err)
                            return reject(err);
                          }
                          console.log(result);
                           result = JSON.parse(JSON.stringify(result))
                          return resolve(result); 
                   })
            })
}

const getresult_1 = (stage_line,camera_id) => {
  return new Promise((resolve,reject) => {
    mysql.query(`select * from features where camera_id='FFA-10' and line='FFA'`,(err,result) => {
      if(err){
        return reject(err);
      }
      result = JSON.parse(JSON.stringify(result))
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