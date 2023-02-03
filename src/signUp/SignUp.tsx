import { buttonShadowEffect } from "../common/tailwind_constants"
export const SignUp = () => {
  return (
    <>
    <div className="h-screen flex flex-col items-center p-10 gap-14">
      <div>CONVERSE</div>
      <div>Please enter your E-mail address</div>
      <input placeholder="name@mail-provider.com" className="w-2/6 px-6 py-3 border border-slate-400 rounded-md"></input>
      <button className={`${buttonShadowEffect} w-2/6 bg-cyan-600 px-6 py-3 rounded-md text-white font-bold`}>Continue</button>
    </div>
    </>
  )
}