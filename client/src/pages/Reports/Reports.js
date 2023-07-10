import { FormControlLabel, Grid, Typography, RadioGroup, Radio } from '@mui/material';
import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const Reports = ( { onTitleChange }) => {

  const theme = useTheme();
  const [shopName, setShopName] = React.useState("");

  const handleChangeShopName = (event) => {
    setShopName(
      event.target.value
    );
  };

  const [lineName, setLineName] = React.useState("");

  const handleChangeLineName = (event) => {
    setLineName(
      event.target.value
    );
  };

  const [stageName, setStageName] = React.useState("");

  const handleChangeStageName = (event) => {
    setStageName(
      event.target.value
    );
  };

  const [detectionType, setDetectionType] = React.useState([]);

  const handleChangeDetectionType = (event) => {
    setDetectionType(
      event.target.value
    );
  };

  const [timePeriod, setTimePeriod] = React.useState([]);

  const handleChangeTimePeriod = (event) => {
    setTimePeriod(
      event.target.value
    );
  };

  const [isSmallScreen, setIsSmallScreen] = React.useState(false);


  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 537);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  

  return (
    <div style={{marginLeft:3}}>
      {onTitleChange('Reports')}
      <Grid container spacing={3}  >
        <Grid item sx={{mt:2}}>
        <Typography variant='h6'>Shop Name :</Typography>
        </Grid>
        <Grid item sx={{ ml:isSmallScreen ? 0 : 4}} >
        <FormControl sx={{ m:!isSmallScreen ? 1 : 0, width: 250  }}>
        <InputLabel id="demo-simple-name-label" >Name</InputLabel>
        <Select
          labelId="demo-simple-name-label"
          id="demo-simple-name"
          value={shopName}
          onChange={handleChangeShopName}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          style={{height:35}}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, shopName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3} >
        <Grid item sx={{mt:2}}>
        <Typography variant='h6'>Line Name :</Typography>
        </Grid>
        <Grid item sx={{ml:4.5}} >
          <FormControl sx={{ m: 1, width: 250  }}>
        <InputLabel id="demo-simple-name-label">Name</InputLabel>
        <Select
          labelId="demo-simple-name-label"
          id="demo-simple-name"
          value={lineName}
          onChange={handleChangeLineName}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, lineName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3} >
        <Grid item sx={{mt:2,}}>
        <Typography variant='h6'>Stage Name :</Typography>
        </Grid>
        <Grid item  sx={{ml:3.5}}>
          <FormControl sx={{ m: 1, width: 250  }}>
        <InputLabel id="demo-simple-name-label">Name</InputLabel>
        <Select
          labelId="demo-simple-name-label"
          id="demo-simple-name"
          value={stageName}
          onChange={handleChangeStageName}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, stageName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}  >
        <Grid item sx={{mt:2}}>
        <Typography variant='h6'>Detection type :</Typography>
        </Grid>
        <Grid item  sx={{ml:1}} >
          <FormControl sx={{ m: 1, width: 250  }}>
        <InputLabel id="demo-simple-name-label">Type</InputLabel>
        <Select
          labelId="demo-simple-name-label"
          id="demo-simple-name"
          value={detectionType}
          onChange={handleChangeDetectionType}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, detectionType, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3} >
        <Grid item sx={{mt:2}}>
        <Typography variant='h6'>Time Period :</Typography>
        </Grid>
        <Grid item  sx={{ml:3.5}}>
          <FormControl sx={{ m: 1, width: 250  }}>
        <InputLabel id="demo-simple-name-label">Period</InputLabel>
        <Select
          labelId="demo-simple-name-label"
          id="demo-simple-name"
          value={timePeriod}
          onChange={handleChangeTimePeriod}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, timePeriod, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}  >
        <Grid item sx={{mt:2}}>
        <Typography variant='h6'>Format :</Typography>
        </Grid>
        <Grid item  sx={{mt:1.5,ml:9.5}} >
        <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="excel" control={<Radio />} label="Excel" />
        <FormControlLabel value="pdf" control={<Radio />} label="PDF" />
      </RadioGroup>
    </FormControl>
        </Grid>
      </Grid>
    </div>
  )
}

export default Reports
