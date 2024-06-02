import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import styles from  './Login.module.css'
import '@fontsource/roboto/400.css';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchRegister, selectIsAuth } from '../../../redux/slices/authReducer';
import { Navigate } from 'react-router-dom/dist';

const LoginInSide = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))

    if (!data.payload) {
      return alert('Error')
    }
    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }
  
  if(isAuth) {
    console.log('OK')
    return <Navigate to='/home' />
    
  }

  return (
    <div className={styles.MainLogin}> 
      <div className={styles.imageBlock}></div>
      <div className={styles.loginBlock}>
          <Avatar style={{backgroundColor:"#00994C"}}><LockOutlinedIcon /></Avatar>
          <Typography variant="h4" style={{paddingBottom: '3%', color: '#00994C'}}>LOGIN</Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.TextField}>
            <TextField 
              label="FullName" 
              className={styles.customTextField} 
              error={Boolean(errors.fullName?.message)}
              helperText={errors.fullName?.message}
              {...register('fullName', {required: 'Укажите имя'})}
              style={{marginBottom: '3%'}}/>
            <TextField 
              label="Email" 
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
              type ='email'
              {...register('email', {required: 'Укажите почту'})}
              style={{marginBottom: '3%'}}/>
            <TextField 
              label="Password" 
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              type ='password'
              {...register('password', {required: 'Укажите пароль'})}
              style={{marginBottom: '5%'}}/>
            <Button 
            variant="outlined" 
            type='submit'
            style={{ color: '#00994C', border: '1px solid #00994C', margin: '0 20% 0 20%'}}>LOGIN</Button>
          </form>
      </div>
    </div>
        
    
  );
}

export default LoginInSide