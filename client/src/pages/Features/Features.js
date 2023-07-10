import React from 'react'
import {  Stack,  Typography } from '@mui/material'
import Switch from '@mui/material/Switch';

const Features = ({ onTitleChange }) => {

  const [checkedHelmet, setCheckedHelmet] = React.useState(false);
  const [checkedGloves, setCheckedGloves] = React.useState(false);
  const [checkedApron, setCheckedApron] = React.useState(false);
  const [checkedGoggle, setCheckedGoggle] = React.useState(false);
  const [checkedMobile, setCheckedMobile] = React.useState(false);
  const [checkedSleep, setCheckedSleep] = React.useState(false);
  const [checkedTobacoo, setCheckedTobacoo] = React.useState(false);
  const [CheckedCrowd, setCheckedCrowd] = React.useState(false);

  const handleChangeHelmet = (event) => {
    setCheckedHelmet(event.target.checked);
  };

  const handleChangeGloves =(event) =>{
    setCheckedGloves(event.target.checked);
  }

  const handleChangeApron =(event) =>{
    setCheckedApron(event.target.checked);
  }

  const handleChangeGoggle =(event) =>{
    setCheckedGoggle(event.target.checked);
  }

  const handleChangeMobile =(event) =>{
    setCheckedMobile(event.target.checked);
  }

  const handleChangeSleep =(event) =>{
    setCheckedSleep(event.target.checked);
  }

  const handleChangeTobacoo =(event) =>{
    setCheckedTobacoo(event.target.checked);
  }

  const handleChangeCrowd =(event) =>{
    setCheckedCrowd(event.target.checked);
  }

    

  return (
    <>
    {onTitleChange('Features')}
    <Stack direction='column' gutterbottom>
      <Stack direction='row'sx={{justifyContent:'space-evenly'}}>
        <Typography variant='h6'>Helmet Detection</Typography>
        <Switch
        checked={checkedHelmet}
        onChange={handleChangeHelmet}
      />
      </Stack>
      <Stack direction='row' sx={{justifyContent:'space-evenly'}}>
        <Typography variant='h6'>Gloves Detection</Typography>
        <Switch
        checked={checkedGloves}
        onChange={handleChangeGloves}
      />
      </Stack>
      <Stack direction='row' sx={{justifyContent:'space-evenly'}}>
        <Typography variant='h6'>Apron Detection</Typography>
        <Switch
        checked={checkedApron}
        onChange={handleChangeApron}
      />
      </Stack>
      <Stack direction='row' sx={{justifyContent:'space-evenly'}}>
        <Typography variant='h6'>Goggle Detection</Typography>
        <Switch
        checked={checkedGoggle}
        onChange={handleChangeGoggle}
      />
      </Stack>
      <Stack direction='row'sx={{justifyContent:'space-evenly'}}>
        <Typography variant='h6'>Mobile Detection</Typography>
        <Switch
        checked={checkedMobile}
        onChange={handleChangeMobile}
      />
      </Stack>
      <Stack direction='row' sx={{justifyContent:'space-evenly'}}>
        <Typography variant='h6'>Sleep Detection</Typography>
        <Switch
        checked={checkedSleep}
        onChange={handleChangeSleep}
      />
      </Stack>
      <Stack direction='row' sx={{justifyContent:'space-evenly'}}>
        <Typography variant='h6'>Tobacoo Detection</Typography>
        <Switch
        checked={checkedTobacoo}
        onChange={handleChangeTobacoo}
      />
      </Stack>
      <Stack direction='row' sx={{justifyContent:'space-evenly'}}>
        <Typography variant='h6'>Crowd Detection</Typography>
        <Switch
        checked={CheckedCrowd}
        onChange={handleChangeCrowd}
      />
      </Stack>

    </Stack>
    </>
  )
}

export default Features
