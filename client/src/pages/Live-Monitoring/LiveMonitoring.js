import './LiveMonitoring.css'
import React,{useEffect,useState} from 'react'
import { ModeContext } from '../../components/MiniDrawer/MiniDrawer'
import LockIcon from '@mui/icons-material/Lock';
import Form from 'react-bootstrap/Form';
import { FeaturesContext } from '../../FeaturesContext';
import JSMpeg from "@cycjimmy/jsmpeg-player";
import axios from 'axios';
const ffmpegIP = "localhost";


const LiveMonitoring = ({onTitleChange}) => {

  const {checkedValues,setCheckedValues} = React.useContext(FeaturesContext)
  const [text_data,settext_data] = useState([])
  let text1=[
    'Helmet Non Adherence',
    'Apron Non-Adherence',
    'Hand gloves Non Adherence',
    'Goggle Non Adherence',
    'Shoes Non Adherence',
    'Mobile Detection',
    'Person at Robotic Cell'
    ]
    const [items1,setitems1] = useState([])
// text1 = text1.filter(text => (checkedValues.some(checked => checked === text )))
// let items1=[]
// items1 = text1.map(item => {
//   if (item.includes('Helmet Non Adherence') ) {
//     return 'Helmet Detection';
//   } 
//   if (item.includes('Hand gloves Non Adherence')) {
//     return 'Gloves Detection';
//   }
//   if (item.includes('Apron Non-Adherence')) {
//     return 'Apron Detection';
//   }
//   if (item.includes('Goggle Non Adherence')) {
//     return 'Goggle Detection';
//   }
//   if (item.includes('Shoes Non Adherence')) {
//     return 'Shoes Detection';
//   }
//   if (item.includes('Mobile Detection')) {
//     return 'Mobile Detection';
//   }
//   if (item.includes('Person at Robotic Cell')) {
//     return 'Person Detection';
//   }



//   return item; 
// });


  const names = [
    'Shop-1',
    'Shop-2',
    'Shop-3',
    'Shop-4',
    'Shop-5',
    'Shop-6',
    'Shop-7',
    'Shop-8',
    'Shop-9',
    'Shop-10',
  ];

  const [lineName, setLineName] = React.useState( () =>{
    const line = localStorage.getItem('line');
    return line !== null ? JSON.parse(line) : ''  ;
  }
  );

  const handleChangeLineName = (event) => {
    setLineName(
      event.target.value
    );
    localStorage.setItem('line',JSON.stringify(event.target.value))
  };

  const [stageName, setStageName] = React.useState(() =>{
    const stage = localStorage.getItem('stage');
    return stage !== null ? JSON.parse(stage) : ''  ;
  }
  );

  const handleChangeStageName = (event) => {
    setStageName(
      event.target.value
    );
    localStorage.setItem('stage',JSON.stringify(event.target.value))
  };

  const [rtsp, setRtsp] = React.useState(() =>{
    const stage = localStorage.getItem('rtsp');
    return stage !== null ? JSON.parse(stage) : ''  ;
  }
  );

  const handlertsp = (event) => {
    setRtsp(
      event.target.value
    );
    localStorage.setItem('rtsp',JSON.stringify(event.target.value))

  };

  const [isRightDivVisible,setIsRightDivVisible] = React.useState(() =>{
    const stage = localStorage.getItem('rightdiv');
    return stage !== null ? JSON.parse(stage) : false  ;
  })
  const [setting,setSetting] = React.useState(() =>{
    const stage = localStorage.getItem('setting');
    return stage !== null ? JSON.parse(stage) : ''  ;
  })
  useEffect(()=>{
    axios.post('http://localhost:8083/stream',{
      lineName:lineName,
      stageName: stageName,
      rtsp:rtsp ? rtsp : `rtsp://admin:eternaler4444@192.168.29.185:554/cam/realmonitor?channel=1&subtype=0`,
      setting: setting
    }).then((res) => {
      
      console.log(res);
    })
  },[])
useEffect(() => {
  axios.post(`http://localhost:8083/api/livemonitoring/getfiltereddata`,{
    filtername: setting,
    camera_id: stageName,
    stage_line: lineName
 }).then((res) => {  
   console.log("eskdfjs")
   console.log(res.data);
   text1 = res.data

   text1 = text1.filter(text => (checkedValues.some(checked => checked === text )))
   console.log("nothing" + text1)
   
     if (text1.includes('Helmet Non Adherence') ) {
       setitems1([...items1,'Helmet Non Adherene'])
     } 
     if (text1.includes('Hand gloves Non Adherence')) {
       
       setitems1([...items1,'Gloves Detection'])
     }
     if (text1.includes('Apron Non-Adherence')) {
       return 'Apron Detection';
     }
     if (text1.includes('Goggle Non Adherence')) {
       console.log("soemsdasthing")
       setitems1([...items1,'Goggle Detection'])
     }
     if (text1.includes('Shoes Non Adherence')) {
      setitems1([...items1,'Shoes Detection'])
     }
     if (text1.includes('Mobile Detection')) {
      setitems1([...items1,'Mobile Detection'])
     }
     if (text1.includes('Person at Robotic Cell')) {
       return 'Person Detection';
     }

 console.log("nonthing" + items1) 
 })
},[])
  const handleStream = () =>{
    if(lineName && stageName && rtsp&& setting){
      setIsRightDivVisible(true)
      localStorage.setItem('rightdiv',JSON.stringify(true))
      axios.post('http://localhost:8083/stream',{
        lineName:lineName,
        stageName: stageName,
        rtsp:rtsp,
        setting: setting
      }).then((res) => {
        console.log("nothing")
        console.log(res);
      })
     
      axios.post(`http://localhost:8083/updatertsp`,{
        rtsp:rtsp,
        page_name:'live_streaming_page'
      }).then((res) => {
        console.log("something")
        console.log(res)
      })
      axios.post(`http://localhost:8083/api/livemonitoring/getfiltereddata`,{
         filtername: setting,
         camera_id: stageName,
         stage_line: lineName
      }).then((res) => {  
        console.log("eskdfjs")
        console.log(res.data);
        text1 = res.data

        text1 = text1.filter(text => (checkedValues.some(checked => checked === text )))
        console.log("nothing" + text1)
        setitems1([...items1,[text1.map(item => {
          if (item.includes('Helmet Non Adherence') ) {
            return 'Helmet Detection';
          } 
          if (item.includes('Hand gloves Non Adherence')) {
            return 'Gloves Detection';
          }
          if (item.includes('Apron Non-Adherence')) {
            return 'Apron Detection';
          }
          if (item.includes('Goggle Non Adherence')) {
            console.log("soemthing")
            return 'Goggle Detection';
          }
          if (item.includes('Shoes Non Adherence')) {
            return 'Shoes Detection';
          }
          if (item.includes('Mobile Detection')) {
            return 'Mobile Detection';
          }
          if (item.includes('Person at Robotic Cell')) {
            return 'Person Detection';
          }})]
        ])
      })
      axios.post('http://localhost:8083/stream',{
        lineName:lineName,
        stageName: stageName,
        rtsp:rtsp,
        setting: setting
      }).then((res) => {
  
        console.log(res);
      })

    }
    else{
      alert('Please enter all the fields')
    }
  }


  const handleSetting = (e) =>{
    setSetting(e.target.value)
    localStorage.setItem('setting',JSON.stringify(e.target.value))

  }
 
  useEffect(() => {    
   
    var videoUrl = `ws://${ffmpegIP}:6790/`;
    var player = new JSMpeg.VideoElement("#video-canvas", videoUrl, {
      autoplay: true,
    });
    
  },[]);
  const {mode} = React.useContext(ModeContext)
  return (
    <div>
      {onTitleChange('Live-Monitoring')}
      <div class="cont">
        <div class="left-div">
          <div class="matters" style={{backgroundColor:mode?'white':'#034ca1'}}>
            <div className='drop'>
              <div className='labelname'>
                <label htmlFor="shopname" ><h3 style={{margin:'0px'}}>Shop Name:</h3></label>
              </div>
              <input id='shopname' className='inputbox' type='text' value='D1 Shop' readOnly/>
            </div>
            <div className='drop'>
              <div className='labelname'>
                <label htmlFor="shopname" ><h3 style={{margin:'0px'}}>Line Name:</h3></label>
              </div>
              <Form.Select id="shopname" className='inputbox' value={lineName} onChange={handleChangeLineName} >
                <option>Select</option>
                {names.map((name) => <option key={name}  className='option'>{name}</option>)}
              </Form.Select>
            </div>
            <div className='drop' >
              <div className='labelname'>
                <label htmlFor="shopname" ><h3 style={{margin:'0px'}}>Stage Name:</h3></label>
              </div>
              <Form.Select id="shopname" className='inputbox' value={stageName} onChange={handleChangeStageName} >
                <option>Select</option>
                {names.map((name) => <option key={name}  className='option'>{name}</option>)}
              </Form.Select>
            </div>
            <div className='drop' >
              <div className='labelname'>
                <label htmlFor="rtsp" ><h3 style={{margin:'0px'}}>RTSP Link:</h3></label>
              </div>
              <input id="rtsp" className='inputbox' value={rtsp} onChange={handlertsp} />
            </div>
            <div className='drop'>
              <div className='labelname'>
                <label htmlFor="settings" ><h3 style={{margin:'0px'}}>Camera Setting Type:</h3></label>
              </div>
              <Form.Select id="settings" className='inputbox' value={setting} onChange={handleSetting} >
                <option>Select</option>
                <option>Global Setting</option>
                <option>Camera Setting</option>
              </Form.Select>
            </div>
            <div className='drop' style={{marginBottom:'3px',marginTop:'8px'}}>
              <button className='inputbox' onClick={handleStream} style={{backgroundColor:'var(--color-4, #003470)', color: 'white',fontSize:'16px',cursor:'pointer',fontWeight:'bold',borderRadius:'5px'}}>Stream</button>
            </div>
          </div>
        </div>
       
        {  
        <div class="right-div" style={{backgroundColor:mode?'white' : '#034ca1'}}>
          <div className='head'>
            <p>{lineName} / {stageName}</p>
            <p style={{color:'#51c7ef'}}>SAFETY SURVEILLANCE AT PLANT</p>
          </div>
          <div className='videoo'>
          <div className='video'>
           <div id="body" style={{alignItems:'center',justifyContent:'space-between'}}>
    <div id="video-canvas" style={{ height: "430px", width: "min-width" }}></div>
  </div>
    </div>
          </div>
          <div class="other-content">
            <div className='row'>
            <div className='object' style={{backgroundColor: mode ? 'white' : '#003470'}}>

              {items1.includes('Helmet Detection') ? (
                <>
                  <p className='p1'>1. Helmet Detection</p>
                  <p>05</p>
                </>
              ) : (
                <>
                  <div className="overlay"  style={{backgroundColor: mode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 52, 112, 0.5)'}}></div>
                  <p className='p1'>1. Helmet Detection</p>
                  <LockIcon style={{marginLeft: '30px', marginTop: '5px'}} />
                </>
              )}
            </div>
              <div className='object'  style={{backgroundColor:mode ? 'white' : '#003470'}}>
              {items1.includes('Apron Detection') ? (
                <>
                  <p className='p1'>2. Apron Detection</p>
                  <p>05</p>
                </>
              ) : (
                <>
                  <div className="overlay"  style={{backgroundColor: mode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 52, 112, 0.5)'}}></div>
                  <p className='p1'>2. Apron Detection</p>
                  <LockIcon style={{marginLeft: '30px', marginTop: '5px'}} />
                </>
              )}
              </div>
              <div className='object'  style={{backgroundColor:mode ? 'white' : '#003470'}}>
              {items1.includes('Goggle Detection') ? (
                <>
                  <p className='p1'>3. Goggle Detection</p>
                  <p>05</p>
                </>
              ) : (
                <>
                  <div className="overlay"  style={{backgroundColor: mode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 52, 112, 0.5)'}}></div>
                  <p className='p1'>3. Goggle Detection</p>
                  <LockIcon style={{marginLeft: '30px', marginTop: '5px'}} />
                </>
              )}
              </div>
            </div>
            <div className='row'>
              <div className='object'  style={{backgroundColor:mode ? 'white' : '#003470'}}>
              {items1.includes('Mobile Detection') ? (
                <>
                  <p className='p1'>4. Mobile Detection</p>
                  <p>05</p>
                </>
              ) : (
                <>
                  <div className="overlay"  style={{backgroundColor: mode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 52, 112, 0.5)'}}></div>
                  <p className='p1'>4. Mobile Detection</p>
                  <LockIcon style={{marginLeft: '30px', marginTop: '5px'}} />
                </>
              )}
              </div>
              <div className='object'  style={{backgroundColor:mode ? 'white' : '#003470'}}>
              {items1.includes('Person Detection') ? (
                <>
                  <p className='p1'>5. Person Detection</p>
                  <p>05</p>
                </>
              ) : (
                <>
                  <div className="overlay"  style={{backgroundColor: mode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 52, 112, 0.5)'}}></div>
                  <p className='p1'>5. Person Detection</p>
                  <LockIcon style={{marginLeft: '30px', marginTop: '5px'}} />
                </>
              )}
              </div>
              <div className='object'  style={{backgroundColor:mode ? 'white' : '#003470'}}>
                {items1.includes('Shoes Detection') ? (
                <>
                  <p className='p1'>6. Shoes Detection</p>
                  <p>05</p>
                </>
              ) : (
                <>
                  <div className="overlay"  style={{backgroundColor: mode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 52, 112, 0.5)'}}></div>
                  <p className='p1'>6. Shoes Detection</p>
                  <LockIcon style={{marginLeft: '30px', marginTop: '5px'}} />
                </>
              )}
              </div>
            </div>
            <div className='row' style={{paddingBottom:'10px'}}>
              <div className='object'  style={{backgroundColor:mode ? 'white' : '#003470'}}>
              {items1.includes('Gloves Detection') ? (
                <>
                  <p className='p1'>7. Gloves Detection</p>
                  <p>05</p>
                </>
              ) : (
                <>
                  <div className="overlay"  style={{backgroundColor: mode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 52, 112, 0.5)'}}></div>
                  <p className='p1'>7. Gloves Detection</p>
                  <LockIcon style={{marginLeft: '30px', marginTop: '5px'}} />
                </>
              )}
              </div>
            </div>
          </div>
        </div>  }


        {/* { isRightDivVisible && setting === 'Camera Setting' &&
        <div class="right-div" style={{backgroundColor:mode?'white' : '#034ca1'}}>
          <div className='head'>
            <p>{lineName} / {stageName}</p>
            <p style={{color:'#51c7ef'}}>SAFETY SURVEILLANCE AT PLANT</p>
          </div>
          <div className='video'>
            <iframe  src="https://www.youtube.com/embed/y881t8ilMyc" frameborder="0" ></iframe>
          </div>
          <div class="other-content">
            <div className='row'>
            <div className='object' style={{backgroundColor: mode ? 'white' : '#003470'}}>
              {items.includes('Helmet Detection') ? (
                <>
                  <p className='p1'>1. Helmet Detection</p>
                  <p>05</p>
                </>
              ) : (
                <>
                  <div className="overlay"  style={{backgroundColor: mode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 52, 112, 0.5)'}}></div>
                  <p className='p1'>1. Helmet Detection</p>
                  <LockIcon style={{marginLeft: '30px', marginTop: '5px'}} />
                </>
              )}
            </div>
              <div className='object'  style={{backgroundColor:mode ? 'white' : '#003470'}}>
              {items.includes('Apron Detection') ? (
                <>
                  <p className='p1'>2. Apron Detection</p>
                  <p>05</p>
                </>
              ) : (
                <>
                  <div className="overlay"  style={{backgroundColor: mode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 52, 112, 0.5)'}}></div>
                  <p className='p1'>2. Apron Detection</p>
                  <LockIcon style={{marginLeft: '30px', marginTop: '5px'}} />
                </>
              )}
              </div>
              <div className='object'  style={{backgroundColor:mode ? 'white' : '#003470'}}>
              {items.includes('Goggle Detection') ? (
                <>
                  <p className='p1'>3. Goggle Detection</p>
                  <p>05</p>
                </>
              ) : (
                <>
                  <div className="overlay"  style={{backgroundColor: mode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 52, 112, 0.5)'}}></div>
                  <p className='p1'>3. Goggle Detection</p>
                  <LockIcon style={{marginLeft: '30px', marginTop: '5px'}} />
                </>
              )}
              </div>
            </div>
            <div className='row'>
              <div className='object'  style={{backgroundColor:mode ? 'white' : '#003470'}}>
              {items.includes('Mobile Detection') ? (
                <>
                  <p className='p1'>4. Mobile Detection</p>
                  <p>05</p>
                </>
              ) : (
                <>
                  <div className="overlay"  style={{backgroundColor: mode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 52, 112, 0.5)'}}></div>
                  <p className='p1'>4. Mobile Detection</p>
                  <LockIcon style={{marginLeft: '30px', marginTop: '5px'}} />
                </>
              )}
              </div>
              <div className='object'  style={{backgroundColor:mode ? 'white' : '#003470'}}>
              {items.includes('Person Detection') ? (
                <>
                  <p className='p1'>5. Person Detection</p>
                  <p>05</p>
                </>
              ) : (
                <>
                  <div className="overlay"  style={{backgroundColor: mode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 52, 112, 0.5)'}}></div>
                  <p className='p1'>5. Person Detection</p>
                  <LockIcon style={{marginLeft: '30px', marginTop: '5px'}} />
                </>
              )}
              </div>
              <div className='object'  style={{backgroundColor:mode ? 'white' : '#003470'}}>
                {items.includes('Shoes Detection') ? (
                <>
                  <p className='p1'>6. Shoes Detection</p>
                  <p>05</p>
                </>
              ) : (
                <>
                  <div className="overlay"  style={{backgroundColor: mode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 52, 112, 0.5)'}}></div>
                  <p className='p1'>6. Shoes Detection</p>
                  <LockIcon style={{marginLeft: '30px', marginTop: '5px'}} />
                </>
              )}
              </div>
            </div>
            <div className='row' style={{paddingBottom:'10px'}}>
              <div className='object'  style={{backgroundColor:mode ? 'white' : '#003470'}}>
              {items.includes('Gloves Detection') ? (
                <>
                  <p className='p1'>7. Gloves Detection</p>
                  <p>05</p>
                </>
              ) : (
                <>
                  <div className="overlay"  style={{backgroundColor: mode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 52, 112, 0.5)'}}></div>
                  <p className='p1'>7. Gloves Detection</p>
                  <LockIcon style={{marginLeft: '30px', marginTop: '5px'}} />
                </>
              )}
              </div>
            </div>
          </div>
        </div>  }
 */}


    </div>
    </div>
  )
}

export default LiveMonitoring