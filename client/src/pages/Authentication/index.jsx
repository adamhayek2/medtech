import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import Input from '../../component/base/Input';
import Button from '../../component/base/Button';
import UserLogin from '../../apis/UserLogin';
import { ReactComponent as LogoSVG } from "../../resources/svg/logo.svg";
import * as heartBeat from '../../resources/animations/heartbeat.json'
import { useEffect } from 'react';
import fetchToken from '../../utils/initializingFirebase';

const Authentication = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const fcm_token = localStorage.getItem('fcm_token')

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      
      const response = await UserLogin(username, password, fcm_token);
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.user_type.type);
      setError(false); 
      localStorage.getItem('role') === 'admin' ? navigate('/dashboard') : navigate('/patients');
    } catch (error) {
      console.error('Login failed', error);
      setError(true); 
    }
    
  };

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: heartBeat,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
    if(!fcm_token) fetchToken(); 
  }, []);

  return (
    <div className='w-screen h-screen flex flex-row justify-center items-center font-futur'>
        <div className='w-7/12 flex flex-row bg-secondary rounded-[32px]'>
            <div className='w-2/5 flex flex-col bg-primary rounded-[32px] px-16 py-24 gap-28'>
                <div className='flex flex-col items-center'>
                  <LogoSVG width={"56px"}/>
                  <h1 className='text-3xl text-white'>Welcome back!</h1>
                </div>
                <form className='flex flex-col flex-end gap-14' onSubmit={handleLogin}>
                  <div>
                    <div className='flex flex-col gap-6'>
                      <Input
                        name="username"
                        value={username}
                        type={"text"}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                      />
                      <Input
                        name="password"
                        value={password}
                        type={"password"}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
                    </div>
                    <p className='underline text-white text-sm'>Forgot password?</p>
                  </div>
                  <div className={`text-sm text-center text-white absolute bottom-20 ${error ? "" : "hidden"}`}>
                    Username or password is incorrect,kindly try again 
                  </div>
                  <div className='h-12'>
                    <Button label={"Login"} BgColor={'bg-white'} textColor={'text-primary'}/>
                  </div>
                </form>
            </div>
            <div className='w-3/5 flex justify-center items-center'>
              <Lottie options={defaultOptions}
                height={300}
                width={300}
                />
            </div>
        </div>
    </div>
  )
}

export default Authentication