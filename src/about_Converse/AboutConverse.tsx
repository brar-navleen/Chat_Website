import 'virtual:fonts.css'
import { buttonShadowEffect } from '../common/tailwind_constants'
import conversecommunication from '../assets/conversecommunication.png'
import flexibleRemoteWorkImage from '../assets/flexibleRemoteWork.png'
import privatizationImage from '../assets/privatization.jpg'
import teamImage from '../assets/team.png'
import { useEffect } from 'react'
import { useAsyncCallback } from 'react-async-hook'

const sendJWTTokenToServer = async (token: any) => {
  const response = await fetch('http://localhost:3000/user', {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const result = await response.json()
  console.log({ result })
  return result
}



export const AboutConverse = () => {

  const sendJWTTokenQuery = useAsyncCallback(sendJWTTokenToServer)

  console.log(sendJWTTokenQuery.result?.success)

  useEffect(() => {
    const token = localStorage.getItem('token')
    sendJWTTokenQuery.execute(token)
  }, [])

  return (
    <>
      <div className="bg-slate-100 text-xl">
        <div className="bg-cyan-800 h-fit flex flex-col">
          <div className="h-24 flex items-center justify-between py-4 px-20">
            <div className="text-white font-bold text-4xl">converse</div>
            <div className="text-white font-semibold">Welcome to your new virtual space to connect to your team</div>
          </div>
          <div className="flex-1 flex items-center py-4 px-20 text-white gap-10">
            <div className="flex flex-col gap-14 w-1/2">
              <div>
                <div className="text-4xl font-extrabold">GREAT TEAMWORK STARTS HERE</div>
                <div>Now both small and large teams can work faster and more flexibly than ever before
                  by relying on Converse.
                </div>
              </div>

              {!sendJWTTokenQuery.result?.success &&
                <a href='./signUp'><button className={`${buttonShadowEffect} w-2/5 bg-white shadow-[4px_4px_0px_0px_#c2c2c2] hover:shadow-[2px_2px_0px_0px_#c2c2c2] px-6 py-3 rounded-md text-black font-bold`}>SIGN IN / SIGN UP</button>  </a>}
              {sendJWTTokenQuery.result?.success &&
                <div>
                  <div>Welcome Back {sendJWTTokenQuery.result?.username}</div>
                  <button className={`${buttonShadowEffect} w-2/5 bg-white shadow-[4px_4px_0px_0px_#c2c2c2] hover:shadow-[2px_2px_0px_0px_#c2c2c2] px-6 py-3 rounded-md text-black font-bold`}>Open Chat</button>
                </div>
              }

              <div>Converse is free to try for as long as you want!</div>
            </div>

            <div className="flex-1 flex justify-center">
              <img className="saturate-150 w-4/6" src={conversecommunication}></img>
            </div>
          </div>
        </div>

        <div className='px-20 pt-24 text-4xl font-bold text-center'>Why Converse?</div>

        <div className='w-full flex gap-10 justify-between items-center px-20 py-24'>
          <img className='w-2/5 rounded-full' src={flexibleRemoteWorkImage}></img>
          <div className="w-1/2 flex flex-col gap-2">
            <div className='text-3xl font-bold'>Flexible Communication</div>
            <div>Converse makes it really easy for the entire team to share the message,
              get updates and take the next step without wasting any time.<br /><br />
              The best part about this tool is that you can create different channels.
              Whatever information you share in the channel can be viewed by every member added to it</div>
          </div>
        </div>

        <div className='w-full flex gap-10 justify-between items-center px-20 py-24'>
          <div className="w-1/2 flex flex-col gap-2">
            <div className='text-3xl font-bold'>Know Team Avalability</div>
            <div>While mandating the usage of Converse, anyone in the team
              can get an idea about whether the person is available or not.<br /><br />
              Now you might be thinking about how exactly it is possible? Well! Just viewing
              the dot shown on that person's profile picture will help you understand whether the
              person is working (indicated in greeen color) or not (indicated in red color).</div>
          </div>
          <img className='w-2/5 rounded-[200px]' src={teamImage}></img>
        </div>

        <div className='w-full flex gap-10 justify-between items-center px-20 py-24'>
          <img className='w-2/5 rounded-[200px]' src={privatizationImage}></img>
          <div className="w-1/2 flex flex-col gap-2">
            <div className='text-3xl font-bold'>Privatization Of Channels</div>
            <div>Many times we are in a situation where we don't want everyone in the team to
              read the messages. If you want to share some confidential information
              or want to discuss the project details that you don't want to share with the team members,
              then Converse offers the feature of creating a private channel. <br />
              <br />
              In this particular channel, you can invite the team members with whom you want to share
              confidential information about a specific project or client.</div>
          </div>
        </div>

      </div>
    </>
  )
}