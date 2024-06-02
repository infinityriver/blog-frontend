import './App.css'
import React from 'react';
import Header from './components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import LoginInSide from './components/Auth/Login/Login'
import SignInSide from './components/Auth/Sign/Sign'
import CreatePost from './components/CreatePost/CreatePost'
import Home from './components/Home/Home'
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from './redux/slices/authReducer';

function App() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  return (
    <div className='Main'>
      <Header />
          <Routes>
            <Route path='/login' element={<LoginInSide />}></Route>
            <Route path='/sign' element={<SignInSide />}></Route>
            <Route path='/create' element={<CreatePost />}></Route>
            <Route path='/home' element={<Home />}></Route>
          </Routes>
    </div>
    
  )
}

export default App
