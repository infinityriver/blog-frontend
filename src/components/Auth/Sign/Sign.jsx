import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import styles from  './Sign.module.css'
import '@fontsource/roboto/400.css';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

import {useForm} from 'react-hook-form'

import { fetchAuth, selectIsAuth } from "../../../redux/slices/authReducer";

const SignInSide = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    console.log(values)
    const data = await dispatch(fetchAuth(values))

    if (!data.payload) {

      return alert('Error')
    }
    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }
  
  if(isAuth) {
    return <Navigate to='/home' />
  }

  return (
    <div className={styles.MainLogin}> 
      <div className={styles.imageBlock}></div>
      <div className={styles.loginBlock}>
          <Avatar style={{backgroundColor:"#00994C"}}><LockOutlinedIcon /></Avatar>
          <Typography variant="h4" style={{paddingBottom: '3%', color: '#00994C'}}>SIGN IN</Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.TextField}>
            <TextField 
              type='email'
              label="Email" 
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
              {...register('email', {required: 'Укажите почту'})}
              style={{marginBottom: '5%'}}/>
            <TextField 
              type='password'
              label="Password" 
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              {...register('password', {required: 'Укажите пароль'})}
              style={{marginBottom: '3%'}}/>
            <Button 
            variant="outlined" 
            type='submit'
            style={{ color: '#00994C', border: '1px solid #00994C', margin: '0 20% 0 20%'}}>SIGN</Button>
          </form>
      </div>
    </div>
        
    
  );
}

export default SignInSide