import './Features.css'
import React, { useEffect } from 'react'
import Switch from '@mui/material/Switch';
import { FeaturesContext } from '../../FeaturesContext';
import axios from 'axios';


const Features = ({ onTitleChange }) => {

  const [checkedHelmet, setCheckedHelmet] = React.useState(() => {
    const storedValue = localStorage.getItem('checkedHelmet');
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });
  const [checkedGloves, setCheckedGloves] = React.useState(() => {
    const storedValue = localStorage.getItem('checkedGloves');
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });
  const [checkedApron, setCheckedApron] = React.useState(() => {
    const storedValue = localStorage.getItem('checkedApron');
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });
  const [checkedGoggle, setCheckedGoggle] = React.useState(() => {
    const storedValue = localStorage.getItem('checkedGoggle');
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });
  const [checkedMobile, setCheckedMobile] = React.useState(() => {
    const storedValue = localStorage.getItem('checkedMobile');
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });
  const [checkedShoes, setCheckedShoes] = React.useState(() => {
    const storedValue = localStorage.getItem('checkedShoes');
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });
  const [checkedPerson, setCheckedPerson] = React.useState(() => {
    const storedValue = localStorage.getItem('checkedPerson');
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });
  const { checkedValues, setCheckedValues } = React.useContext(FeaturesContext);

  React.useEffect( () => {
    const updatedCheckedValues = [
      'Total PPE Incidents',
      checkedHelmet && 'Helmet Non Adherence',
      checkedGloves && 'Hand gloves Non Adherence',
      checkedApron && 'Apron Non-Adherence',
      checkedGoggle && 'Goggle Non Adherence',
      checkedMobile && 'Mobile Detection',
      checkedShoes && 'Shoes Non Adherence',
      checkedPerson && 'Person at Robotic Cell',
    ];
    console.log("somehing")
    axios.post(`http://localhost:8083/api/features/setfeatures`,{
     checkedHelmet: checkedHelmet,
     checkedApron:checkedApron,
     checkedGloves:checkedGloves,
     checkedGoggle:checkedGoggle,
     checkedShoes:checkedShoes
   }).then((res) => {
    console.log(res);
   }).catch((err) => {
    console.log(err)
   })
    setCheckedValues(updatedCheckedValues);
  
    // Store updatedCheckedValues in local storage
    
    localStorage.setItem('checked', JSON.stringify(updatedCheckedValues))
  }, [
    checkedHelmet,
    checkedGloves,
    checkedApron,
    checkedGoggle,
    checkedMobile,
    checkedShoes,
    checkedPerson,
    setCheckedValues,
  ]);
 
  const handleChangeHelmet = (event) => {
    const isChecked = event.target.checked;
    setCheckedHelmet(isChecked)
    localStorage.setItem('checkedHelmet', JSON.stringify(isChecked));
  };

  const handleChangeGloves =(event) =>{
    const isChecked = event.target.checked;
    setCheckedGloves(isChecked)
    localStorage.setItem('checkedGloves', JSON.stringify(isChecked));
  }

  const handleChangeApron =(event) =>{
    const isChecked = event.target.checked;
    setCheckedApron(isChecked)
    localStorage.setItem('checkedApron', JSON.stringify(isChecked));
  }

  const handleChangeGoggle =(event) =>{
    const isChecked = event.target.checked;
    setCheckedGoggle(isChecked)
    localStorage.setItem('checkedGoggle', JSON.stringify(isChecked));
  }

  const handleChangeMobile =(event) =>{
    const isChecked = event.target.checked;
    setCheckedMobile(isChecked)
    localStorage.setItem('checkedMobile', JSON.stringify(isChecked));
  }

  const handleChangeShoes =(event) =>{
    const isChecked = event.target.checked;
    setCheckedShoes(isChecked)
    localStorage.setItem('checkedShoes', JSON.stringify(isChecked));
  }

  const handleChangePerson =(event) =>{
    const isChecked = event.target.checked;
    setCheckedPerson(isChecked)
    localStorage.setItem('checkedPerson', JSON.stringify(isChecked));
  }

  

 
    

  return (
    <>
    {onTitleChange('Features')}
    <div className='features'>
    <div className='main'>
      <div className='sub'>
        <h3>Helmet Detection</h3>
      </div>
      <div className='switch'>
      <Switch
        checked={checkedHelmet}
        onChange={handleChangeHelmet}
        className='custom-switch'
      />
      </div>
     </div>
     <div className='main'>
      <div className='sub'>
        <h3>Gloves Detection</h3>
      </div>
      <div className='switch'>
        <Switch checked={checkedGloves} onChange={handleChangeGloves}
                className='custom-switch'
                ></Switch>
      </div>
     </div>
     <div className='main'>
      <div className='sub'>
        <h3>Apron Detection</h3>
      </div>
      <div className='switch'>
        <Switch checked={checkedApron} onChange={handleChangeApron}
                className='custom-switch'
                ></Switch>
      </div>
     </div>
     <div className='main'>
      <div className='sub'>
        <h3>Goggle Detection</h3>
      </div>
      <div className='switch'>
        <Switch checked={checkedGoggle} onChange={handleChangeGoggle}
                className='custom-switch'
                ></Switch>
      </div>
     </div>
     <div className='main'>
      <div className='sub'>
        <h3>Mobile Detection</h3>
      </div>
      <div className='switch'>
        <Switch checked={checkedMobile} onChange={handleChangeMobile}
                className='custom-switch'
                ></Switch>
      </div>
     </div>
     <div className='main'>
      <div className='sub'>
        <h3>Shoes Detection</h3>
      </div>
      <div className='switch'>
        <Switch checked={checkedShoes} onChange={handleChangeShoes}
                className='custom-switch'
                ></Switch>
      </div>
     </div>
     <div className='main'>
      <div className='sub'>
        <h3>Person Detection</h3>
      </div>
      <div className='switch'>
        <Switch checked={checkedPerson} onChange={handleChangePerson}
                className='custom-switch'
                ></Switch>
      </div>
     </div>
     </div>
    </>
  )
}

export default Features