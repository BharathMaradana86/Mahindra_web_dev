
// import React,{useEffect, useState} from 'react'
// import { ModeContext } from '../../components/MiniDrawer/MiniDrawer'
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import JSMpeg from "@cycjimmy/jsmpeg-player";
// import axios from 'axios';
// const ffmpegIP = "localhost";
// const VMS = ( { onTitleChange }) => {

//   useEffect(() => {
//     axios.get(`http://localhost:8083/vmsstream/1/1/2`).then((res) => {
//       console.log(res)
//     })
//   },[])

//     useEffect(() => {
//       var videoUrl = `ws://${ffmpegIP}:6791/`;
//       var player = new JSMpeg.VideoElement("#video-canvas_1", videoUrl, {
//         autoplay: true,
//       });
//       console.log(player);
//     },[]);
//   return (
//     <div>
//       {onTitleChange('VMS-Settings')}
//       <div className='video'>
//           <div id="body" style={{alignItems:'center',justifyContent:'space-between'}}>
//       <div id="video-canvas_1" style={{ height: "430px", width: "min-width" }}></div>
//     </div>
//     </div>
//     </div>
//   )
// }

// export default VMS



import './VMS.css'
import React,{useRef} from 'react'
import { ModeContext } from '../../components/MiniDrawer/MiniDrawer'
import LockIcon from '@mui/icons-material/Lock';
import Form from 'react-bootstrap/Form';
import { FeaturesContext } from '../../FeaturesContext';
import CancelIcon from '@mui/icons-material/Cancel';
import {useEffect, useState} from 'react'
import JSMpeg from "@cycjimmy/jsmpeg-player";
import axios from 'axios';
const ffmpegIP = "localhost";
const VMS = ({onTitleChange}) => {

  const {checkedValues,setCheckedValues} = React.useContext(FeaturesContext)


  const videoRef = useRef(null);



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

  const [lineName1, setLineName1] = React.useState( () =>{
    const line = localStorage.getItem('line1');
    return line !== null ? JSON.parse(line) : ''  ;
  }
  );

  const handleChangeLineName1 = (event) => {
    setLineName1(
      event.target.value
    );
    localStorage.setItem('line1',JSON.stringify(event.target.value))
  };

  const [stageName1, setStageName1] = React.useState(() =>{
    const stage = localStorage.getItem('stage1');
    return stage !== null ? JSON.parse(stage) : ''  ;
  }
  );

  const handleChangeStageName1 = (event) => {
    setStageName1(
      event.target.value
    );
    localStorage.setItem('stage1',JSON.stringify(event.target.value))
  };

  const [items, setItems] = React.useState([
    'Helmet Detection',
    'Apron Detection',
    'Gloves Detection',
    'Goggle Detection',
    'Shoes Detection',
    'Mobile Detection',
    'Person Detection',
  ]);

  const [text, setText] = React.useState([]);

  const [rtsp1, setRtsp1] = React.useState(() =>{
    const stage = localStorage.getItem('rtsp1');
    return stage !== null ? JSON.parse(stage) : ''  ;
  }
  );
 
  const  stream_data = () => {
        axios.post(`http://localhost:8083/vmsstream`,{
          lineName1:lineName1,
          stageName1: stageName1,
          rtsp1 : rtsp1
        }).then((res) => {
          console.log(res.data);
        })
  }

  const   handlertsp1 = (event) => {
    setRtsp1(
      event.target.value
    );
    localStorage.setItem('rtsp1',JSON.stringify(event.target.value))

  };

  const [isRightDivVisible1,setIsRightDivVisible1] = React.useState(() =>{
    const stage = localStorage.getItem('rightdiv1');
    return stage !== null ? JSON.parse(stage) : false  ;
  })

  const handleStream1 = () =>{
    if(lineName1 && stageName1 && rtsp1){
      setIsRightDivVisible1(true)
      localStorage.setItem('rightdiv1',JSON.stringify(true));
      axios.post(`http://localhost:8083/vmsstream`,{
          lineName1:lineName1,
          stageName1: stageName1,
          rtsp1 : rtsp1
        }).then((res) => {
          window.location.reload(false)
          console.log(res.data);
        })
        axios.post(`http://localhost:8083/updatertsp`,{
          rtsp:rtsp1,
          page_name:'vms_page'
        }).then((res) => {
          console.log(res)
        })
    }
    else{
      alert('Please enter all the fields')
    }
  }

 
  
  const handleDeleteItem = (item) => {
    setItems((prevItems) => prevItems.filter((prevItem) => prevItem !== item));
    setText((prevText) => [...prevText, item]);
  };

  const handleAddItem = (item) => {
    setText((prevText) => prevText.filter((prevText) => prevText !== item));
    setItems((prevItems) => [...prevItems, item]);
  };

  // React.useEffect(() => {

  // }, [items, text]);

  const {mode} = React.useContext(ModeContext)

 

    useEffect(() => {
      if(lineName1 && stageName1 && rtsp1){
      var videoUrl = `ws://${ffmpegIP}:6791/`;
      var player = new JSMpeg.VideoElement("#video-canvas_1", videoUrl, {
        autoplay: true,
      });
      console.log(player);
    }
    },[]);
  return (
    <div>
      {onTitleChange('VMS SETTINGS')}
      <div class="contt">
        <div class="left-divv">
          <div class="matterss" style={{backgroundColor:mode?'white':'#034ca1'}}>
            <div className='dropp'>
              <div className='labelnamee'>
                <label htmlFor="shopname" ><h3 style={{margin:'0px'}}>Shop Name:</h3></label>
              </div>
              <input id='shopname' className='inputboxx' type='text' value='D1 Shop' readOnly/>
            </div>
            <div className='dropp'>
              <div className='labelnamee'>
                <label htmlFor="shopname" ><h3 style={{margin:'0px'}}>Line Name:</h3></label>
              </div>
              <Form.Select id="shopname" className='inputboxx' value={lineName1} onChange={handleChangeLineName1} >
                <option>Select</option>
                {names.map((name) => <option key={name}  className='option'>{name}</option>)}
              </Form.Select>
            </div>
            <div className='dropp' >
              <div className='labelnamee'>
                <label htmlFor="shopname" ><h3 style={{margin:'0px'}}>Stage Name:</h3></label>
              </div>
              <Form.Select id="shopname" className='inputboxx' value={stageName1} onChange={handleChangeStageName1} >
                <option>Select</option>
                {names.map((name) => <option key={name}  className='option'>{name}</option>)}
              </Form.Select>
            </div>
            <div className='dropp' >
              <div className='labelnamee'>
                <label htmlFor="rtsp" ><h3 style={{margin:'0px'}}>RTSP Link:</h3></label>
              </div>
              <input id="rtsp" className='inputboxx' value={rtsp1} onChange={handlertsp1} />
            </div>
            <div className='dropp' style={{marginBottom:'3px',marginTop:'8px'}}>
              <button className='inputboxx' onClick={handleStream1} style={{backgroundColor:'var(--color-4, #003470)', color: 'white',fontSize:'16px',cursor:'pointer',fontWeight:'bold',borderRadius:'5px'}}>Stream</button>
            </div>
          </div>
        </div>
        { <div class="right-divv" style={{backgroundColor:mode?'white' : '#034ca1'}}>
          <div className='head'>
            <p>{lineName1} / {stageName1}</p>
            <p style={{color:'#51c7ef'}}>SAFETY SURVEILLANCE AT PLANT</p>
          </div>
          <div className='videoo'>
          <div className='video'>
           <div id="body" style={{alignItems:'center',justifyContent:'space-between'}}>
                     <div id="video-canvas_1" style={{ height: "430px", width: "min-width" }}></div>
            </div>
    </div>
          </div>
          <div class="other-contentt">
            <div className='roww'>
            
              {items.includes('Helmet Detection') && (
                <div className='objectt' style={{backgroundColor: mode ? 'white' : '#003470'}}>
                  <p className='p11'>1. Helmet Detection</p>
                  <CancelIcon style={{marginLeft: '40px', marginTop: '5px' , cursor:'pointer'}} onClick={() => handleDeleteItem('Helmet Detection')}/>
                </div>
              )
            }
            
              
              {items.includes('Apron Detection') && (
                <div className='objectt'  style={{backgroundColor:mode ? 'white' : '#003470'}}>
                  <p className='p11'>2. Apron Detection</p>
                  <CancelIcon style={{marginLeft: '40px', marginTop: '5px',cursor:'pointer'}} onClick={() => handleDeleteItem('Apron Detection')} />
                </div>
              ) 
              }
              
              
              {items.includes('Goggle Detection') && (
                <div className='objectt'  style={{backgroundColor:mode ? 'white' : '#003470'}}>
                  <p className='p11'>3. Goggle Detection</p>
                  <CancelIcon style={{marginLeft: '40px', marginTop: '5px',cursor:'pointer'}} onClick={() => handleDeleteItem('Goggle Detection')}/>
                </div>
              )
              }
              
            </div>
            <div className='roww'>
              
              {items.includes('Mobile Detection') && (
                <div className='objectt'  style={{backgroundColor:mode ? 'white' : '#003470'}}>
                  <p className='p11'>4. Mobile Detection</p>
                  <CancelIcon style={{marginLeft: '40px', marginTop: '5px',cursor:'pointer'}} onClick={() => handleDeleteItem('Mobile Detection')}/>
                </div>
              ) 
              }
              
              
              {items.includes('Person Detection') && (
                <div className='objectt'  style={{backgroundColor:mode ? 'white' : '#003470'}}>
                  <p className='p11'>5. Person Detection</p>
                  <CancelIcon style={{marginLeft: '40px', marginTop: '5px',cursor:'pointer'}} onClick={() => handleDeleteItem('Person Detection')}/>
                </div>
              ) 
              }
              
              
                {items.includes('Shoes Detection') && (
                <div className='objectt'  style={{backgroundColor:mode ? 'white' : '#003470'}}>
                  <p className='p11'>6. Shoes Detection</p>
                  <CancelIcon style={{marginLeft: '40px', marginTop: '5px',cursor:'pointer'}} onClick={() => handleDeleteItem('Shoes Detection')}/>
                </div>
              ) 
               }
              
            </div>
            <div className='roww' style={{paddingBottom:'10px'}}>
              
              {items.includes('Gloves Detection') && (
                <div className='objectt'  style={{backgroundColor:mode ? 'white' : '#003470'}}>
                  <p className='p11'>7. Gloves Detection</p>
                  <CancelIcon style={{marginLeft: '40px', marginTop: '5px',cursor:'pointer'}} onClick={() => handleDeleteItem('Gloves Detection')} />
                </div>
              ) 
              }
              
              
                <div className='objectt'  >
                  <Form.Select id="shopname" className='inputboxxx' style={{backgroundColor:mode ? 'white' : '#003470', color:mode ? 'black' : 'white',borderRadius:'5px'}} onChange={(e) => handleAddItem(e.target.value)} >
                    <option>Add Features </option>
                    {text.map((name) => <option key={name}  className='option'>{name}</option>)}
                  </Form.Select>
                </div>
                {/* <ReactPlayer ref={videoRef} url="rtsp://admin:eternaler4444@192.168.29.185:554/cam/realmonitor?channel=1&subtype=0" controls={true} /> */}

            </div>
          </div>
        </div>  }
    </div>
    </div>
  )
}

export default VMS;