import { buttonShadowEffect } from '../common/tailwind_constants'
export const UserProfileDetails = () => {
  return (
    <>
      <div className="h-screen flex flex-col gap-10 justify-center items-center">
        <div className="w-1/3 h-4/5 flex flex-col gap-12 bg-slate-300 p-10 rounded-md">

          <div className="w-full flex flex-col gap-2">
            <div className="font-semibold">First Name</div>
            <input className="w-full p-3 rounded-md" placeholder="Enter your first name"></input>
          </div>

          <div className="w-full flex flex-col gap-2">
            <div className="font-semibold">Last Name</div>
            <input className="w-full p-3 rounded-md" placeholder="Enter your last name"></input>
          </div>

          <div className="w-full flex flex-col gap-2 mb-24">
            <div className="font-semibold">Username</div>
            <input className="w-full p-3 rounded-md" placeholder="Enter your username"></input>
          </div>

          <button className={`${buttonShadowEffect} bg-cyan-600 p-3 rounded-md text-white font-semibold`}>Save and Continue</button>
        </div>
      </div>
    </>
  )
}