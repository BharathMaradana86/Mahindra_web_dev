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
const Stream = require('node-rtsp-stream');
const { resolve } = require('path');
const { rejects } = require('assert');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
app.use("/api/dashboard",DashboardRouter);
app.use("/api/analytics",AnalyticsRouter);
app.use("/api/users",usersRouter);

let stream = null;
app.get('/stream/:id/:camera_line/:camera_stage', (req, res) => {
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
    mysql.query(`update camera set camera_line=${req.params.camera_line},camera_stage=${req.params.camera_stage} where camera_line=1`,(err,result) => {
      if(err){
          console.log(err)

      }
      console.log(result);
})
  }


  res.send('Streaming started');
});

  app.get("/boundingbox",(req,res) =>{
    try {
         console.log("req got ")
          res.status(200).json([{x:  0.5539759397506714,y:  0.38774046301841736,width:  0.25121819972991943,height: 0.1803123503923416},
            {x:   0.236505925655365,y:  0.522219181060791,width:  0.45719587802886963,height:  0.48129644989967346},
            {x:   0.6449041962623596,y:  0.4886261224746704,width:  0.28338420391082764,height:  0.39667415618896484},
            {x:  0.5539759397506714,y:  0.38774046301841736,width:  0.25121819972991943,height: 0.1803123503923416},
            {x:  0.5539759397506714,y:  0.38774046301841736,width:  0.25121819972991943,height: 0.1803123503923416},
            {x:  0.5539759397506714,y:  0.38774046301841736,width:  0.25121819972991943,height: 0.1803123503923416},
            {x:  0.5539759397506714,y:  0.38774046301841736,width:  0.25121819972991943,height: 0.1803123503923416},
            {x:  0.5539759397506714,y:  0.38774046301841736,width:  0.25121819972991943,height: 0.1803123503923416}])
            
    } catch (error) {
        console.log(error);
    }
})




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


app.listen(8083,() => {
    console.log("server started");
    
});