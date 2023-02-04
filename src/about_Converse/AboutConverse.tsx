import 'virtual:fonts.css'
import { buttonShadowEffect } from '../common/tailwind_constants'
import conversecommunication from '../assets/conversecommunication.png'

export const AboutConverse = () => {
  return (
    <>
      <div className="h-screen">
        <div className="bg-cyan-800 h-fit flex flex-col">
          <div className="h-24 flex items-center justify-between py-4 px-20">
            <div className="text-white font-bold text-4xl">converse</div>
            <div className="text-white font-semibold">Welcome to your new virtual space to connect to your team</div>
          </div>
          <div className="flex-1 flex items-center py-4 px-20 text-white gap-10">
            <div className="flex flex-col gap-14 w-2/5">
              <div>
                <div className="text-3xl font-semibold">GREAT TEAMWORK STARTS HERE</div>
                <div>Now both small and large teams can work faster and more flexibly than ever before
                  by relying on Converse.
                </div>
              </div>

              <button className={`${buttonShadowEffect} w-2/5 bg-white shadow-[4px_4px_0px_0px_#9c9d9fad] hover:shadow-[2px_2px_0px_0px_#9c9d9fad] px-6 py-3 rounded-md text-black font-bold`}>SIGN IN / SIGN UP</button>
              <div>Converse is free to try for as long as you want!</div>
            </div>

            <div className="flex-1 flex justify-center">
              <img className="w-4/6" src= {conversecommunication}></img>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}