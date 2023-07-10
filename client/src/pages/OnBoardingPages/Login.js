import React, { useEffect, useState } from 'react'
import { Grid, Typography, TextField, Checkbox } from '@mui/material'
import './Register.css'
import MailIcon from '@mui/icons-material/Mail';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Link, useNavigate  } from 'react-router-dom'
import axios from 'axios';

const Register = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword]= useState("")

    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };



  localStorage.token = null

  const fetchuserdata = async () => {
            const data_set = {
                  Email:email,
                  Password: password
            }
          
         await axios.post("http://localhost:8083/api/users/login",data_set).then((res) => {
                          localStorage.token = res.data
                          console.log(res.data)
                          if(localStorage.token !== "null" && localStorage.token !== "Email Doesn't Exists please register" && localStorage.token !== "Password Wrong!!"){
                            console.log("something")
                           navigate("/");
                          }
                else if(localStorage.token == "Password Wrong!!"){
                               alert("Password wrong");
                               localStorage.token = null;
                }
                else if(localStorage.token == "Email Doesn't Exists please register"){
                  alert("Email doesn't exists please register");
                  localStorage.token = null;
                }
            })
          
           
            
  }

  return (
    <div>
      <Grid container spacing={2}  >
        <Grid item xs={12} sm={6} sx={{ display: { xs: 'none', sm: 'block', backgroundColor:'#999999' } }} >
            <Grid container className='leftgrid'>
                ALL PLANT
            </Grid>
        </Grid>
        <Grid item xs={12} sm={6} sx={{background: 'linear-gradient(180deg, #2C69D1 0%, #51C7EF 100%)',color:'white'}}>
           <Grid container className='rightgrid'>
            <div>
                <Typography variant='h4' component='div' gutterBottom  textAlign='center'>WELCOME BACK</Typography>
                <Typography variant='p' component='div' gutterBottom textAlign='center' >Please login to your account</Typography>
                <Grid container className='box' mt='20%'  >
                    <div style={{marginTop:'5%'}}>
                    <div>
                    <Typography variant='p' sx={{marginLeft:'5%'}}>Email</Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        size="small"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='input'
                        sx={{marginLeft:'5%', width:'90%'}}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MailIcon />
                              </InputAdornment>
                            ),
                          }}

                    />
                    </div>
                    <div>
                    <Typography variant='p' sx={{marginLeft:'5%'}}>Password</Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        size="small"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='input'
                        sx={{marginLeft:'5%',  width:'90%'}}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon />
                              </InputAdornment>
                            ),
                            endAdornment :(
                                <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                </InputAdornment>
                              ),
                          }}
                        type={showPassword ? 'text' : 'password'}
                    />
                    </div>
                    <Grid container sx={{ marginLeft: '5%' }} >
                    <Grid item>
                    <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    size='small'
                    inputProps={{ 'aria-label': 'controlled' }}
                    />
                    </Grid>
                    <Grid item>
                        <Typography variant='subtitle1' sx={{marginTop:'5%'}}>Remember me</Typography>
                    </Grid>
                    <Grid item  sx={{marginLeft:'auto',marginRight:'10%'}}>
                    <Typography variant='subtitle1' color='#003470' sx={{marginTop:'5%'}}>Forgot password</Typography>
                    </Grid>
                    </Grid>
                    <div style={{marginLeft:'5%',marginRight:'5%',marginTop:'8%',marginBottom:'5%'}}>
                    <Button variant='contained' size='small'  fullWidth  sx={{backgroundColor:'#034CA1'}} onClick={fetchuserdata}>Sign in</Button>
                    </div>
                    </div>
                    
                </Grid>
                <div style={{marginTop:'10%',marginLeft:'5%',marginRight:'5%'}}>
                <Typography variant='p' component='div' gutterBottom textAlign='center' >Don't have an account?</Typography>
                <Link to='/register'><Button variant='contained' size='small' fullWidth sx={{backgroundColor:'white',color:'black'}}  >Sign up</Button></Link>

                </div>
            </div>
            </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Register
