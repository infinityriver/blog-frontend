import React from "react";
import styles from './Header.module.css'
import Button from '@mui/material/Button';
import { Avatar, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/authReducer';

const Header = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch()

    const onClickLogout = () => {
        if(window.confirm('Are you sure you want to log?')) {
        dispatch(logout())
        window.localStorage.removeItem('token')
        }
    };

    return (
            <div className={styles.root}>
            <Container>
                <div className={styles.Header}>
                    <Button LinkComponent={Link} to='/home' variant="outlined" sx={{ mr: 180 }}  style={{ color: '#00994C', border: '1px solid #00994C', textDecoration: 'none'}}>FATTAHOV BLOG</Button>
                    {isAuth ? (
                        <Stack className={styles.buttonAuth} spacing={2} direction="row">
                            <Button LinkComponent={Link} to='/create' variant="outlined" style={{ color: '#00994C', border: '1px solid #00994C', textDecoration: 'none'}}>CREATE POST</Button>
                            <Button onClick={onClickLogout} variant="outlined" style={{ color: 'red', border: '1px solid red', textDecoration: 'none'}}>LOGOUT</Button>
                            <Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
                        </Stack>
                    ) : (
                        <Stack className={styles.buttonAuth} spacing={2} direction="row">
                            <Button LinkComponent={Link} to='/login' variant="outlined" style={{ color: '#00994C', border: '1px solid #00994C', textDecoration: 'none'}}>LOGIN</Button>
                            <Button LinkComponent={Link} to='/sign' variant="outlined" style={{ color: '#00994C', border: '1px solid #00994C', textDecoration: 'none'}}>SIGN IN</Button>
                            <Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
                        </Stack>
                    )}
                    
                </div>
                
            </Container>
            
            </div>
        
    )
}

export default Header