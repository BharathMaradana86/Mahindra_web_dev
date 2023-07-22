
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const pool = require('./db/connection/sql-pool');
const app = express();
const {db_1} = require('./db/connection/sql-connection')
const mysql = require('./db/connection/mysql-connection')
const DashboardRouter=  require('./routes/dashboard')
const usersRouter = require("./routes/general")
const AnalyticsRouter = require('./routes/analytics')
const reportsRouter = require('./routes/reports')
const vmsrouter = require('./routes/vms')
const feature = require('./routes/features')
const Stream = require('node-rtsp-stream');
const { resolve } = require('path');
const { rejects } = require('assert');
const { profileEnd } = require('console');
const http = require('http');
const WebSocket = require('ws');
const livemonitoringrouter = require('./routes/livemonitor')
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
app.use("/api/dashboard",DashboardRouter);
app.use("/api/analytics",AnalyticsRouter);
app.use("/api/reports/", reportsRouter)
app.use("/api/users",usersRouter);
app.use("/api/features",feature)
app.use("/api/livemonitoring",livemonitoringrouter)
app.use("/api/vms",vmsrouter);

let stream = null;
app.post('/stream', (req, res) => {
  console.log(req.body.rtsp)
  const newRtspStreamUrl = req.body.rtsp;

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
      streamUrl: newRtspStreamUrl,
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
//     mysql.query(`update camera set camera_line=${req.params.camera_line},camera_stage=${req.params.camera_stage} where camera_line=1`,(err,result) => {
//       if(err){
//           console.log(err)

//       }
//       console.log(result);
// })
  }


  res.send('Streaming started');
});
function addLeadingZero(number) {
  return number < 10 ? "0" + number : number;
}


let stream_1 = null;
app.post('/vmsstream', (req, res) => {
  const lineName1 = req.body.lineName1;
  const stageName1 = req.body.stageName1;
  const newRtspStreamUrl = req.body.rtsp1;

  // Create the WebSocket stream only if it doesn't exist or the RTSP URL has changed
  if (!stream_1 || currentRtspStreamUrl !== newRtspStreamUrl) {
    if (stream_1) {
      stream_1.stop();
    }
    // stream = new Stream({
    //   name: 'Camera Stream',
    //   streamUrl: newRtspStreamUrl,
    //   wsPort: 9999
    // });
    stream_1 = new Stream({
      name: "Bunny",
      // streamUrl: "rtsp://YOUR_IP:PORT",
      streamUrl: newRtspStreamUrl,
      wsPort: 6791,
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
//     mysql.query(`update camera set camera_line=${req.params.camera_line},camera_stage=${req.params.camera_stage} where camera_line=1`,(err,result) => {
//       if(err){
//           console.log(err)

//       }
//       console.log(result);
// })
  }


  res.send('Streaming started');
});



app.post('/updatertsp',async (req,res) => {
                 try {  
                  console.log("rtsp stream url is comming")
                  let r = JSON.stringify(req.body.rtsp)
                      let result = await check_result(r);
                      return res.status(200).json(result);
                 } catch (error) {
                  console.log(error)
                    return res.status(400).json(error)
                 }
})

const check_result = (r) => {
             return new Promise((resolve,rejects) => {
              mysql.query(`update rtsp_links set rtsp_camera_link=${r} where page_name='live_streaming_page'`,(err,result) => {
                if(err){
                  console.log(err)
                  return rejects(err)
                }
                return resolve(result);
     })
             })
}
// Function to get the current timestamp in the format of "hh:mm:ss"
function getCurrentTimestamp() {
  const now = new Date();
  const hours = addLeadingZero(now.getHours());
  const minutes = addLeadingZero(now.getMinutes());
  const seconds = addLeadingZero(now.getSeconds());

  return `${hours}:${minutes}:${seconds}`;
}
app.post("/api/boundingBoxes", (req, res) => {
  try {
    let timestamp = '12:43:23'; // getCurrentTimestamp();
    console.log(timestamp);
    mysql.query(`SELECT BoundingBox FROM mytable WHERE confidence='${timestamp}' LIMIT 1`, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error fetching bounding box data from MySQL." });
      }
    const results = (JSON.parse(JSON.stringify((result))));
    console.log(results[0].BoundingBox)
      return res.status(200).json(results);
    
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
});



// db_1.all(`create table dummy(date TEXT,zone TEXT,camera_id TEXT,time TEXT,helmet_id TEXT,vest_id TEXT,shoes_id TEXT,goggles_id TEXT,gloves_id TEXT)`,function(err,result)  {
//     if(err) console.log(err)
//     result = JSON.stringify(result);
//     console.log(JSON.parse(result));
//   })

// for(let i=0;i<100;i++){
//      mysql.query(`insert into helmet values('20-06-2023-12:15:42_helmet','11,11,11,12',1,'vest')`,(err,result) => {
//       console.log(result);
//      })
// }

// for(let i=0;i<1;i++){

// mysql.query("insert into feature values(1,0,1,1,0,1,1)",(err,result) => {
//   if(err){
//     console.log(err);
//   }
//   console.log(result);
// })
// }




app.listen(8083,() => {
    console.log("server started");
    
});