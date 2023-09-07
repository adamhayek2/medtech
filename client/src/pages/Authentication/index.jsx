import React, {useState} from 'react'
import Lottie from 'react-lottie';
import Input from '../../component/Input';
import Button from '../../component/Button';
import { ReactComponent as LogoSVG } from "../../resources/svg/logo.svg";
import * as heartBeat from '../../resources/animations/heartbeat.json'

const Authentication = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false); 

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: heartBeat,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


  return (
    <div className='w-screen h-screen flex flex-row justify-center items-center font-futur'>
        <div className='w-7/12 flex flex-row bg-secondary rounded-[32px]'>
            <div className='w-1/3 flex flex-col bg-primary rounded-[32px] px-16 py-24 gap-28'>
                <div className='flex flex-col items-center'>
                  <LogoSVG width={"56px"}/>
                  <h1 className='text-3xl text-white'>Welcome back!</h1>
                </div>
                <form className='flex flex-col gap-6'>
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
                  <Button label={"Login"}/>
                </form>
            </div>
            <div className='w-2/3 flex justify-center items-center'>
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