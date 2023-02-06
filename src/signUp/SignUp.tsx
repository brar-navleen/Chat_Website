import { useState } from "react"
import { buttonShadowEffect } from "../common/tailwind_constants"
export const SignUp = (prop: { onNext: () => any }) => {
  const [userEmail, setUserEmail] = useState('')
  const [invalidEmail, setInvalidEmail] = useState(false)

  const isValidUser = () => {
    if (userEmail === '') {
      setInvalidEmail(true)
    }
    else {
      setInvalidEmail(false)
      prop.onNext()
    }
  }

  return (
    <>
      <div className="h-screen flex flex-col items-center p-10 gap-14">
        <div className="text-3xl font-bold">CONVERSE</div>
        <div className="text-5xl font-bold">Please enter your E-mail address</div>
        <div className="w-2/6">
          <input onChange={(e) => setUserEmail(e.target.value)} placeholder="name@mail-provider.com" className="w-full px-6 py-3 border border-slate-400 rounded-md"></input>
          {invalidEmail && <div className="flex items-center gap-2 text-red-600">
            <span className="material-symbols-rounded">
              warning
            </span>Please enter valid e-mail address</div>}
        </div>
        {invalidEmail && <button onClick={() => isValidUser()} className={`${buttonShadowEffect} w-2/6 bg-cyan-600 px-6 py-3 rounded-md text-white font-bold`}>Continue</button>}
        {!invalidEmail && <button onClick={() => isValidUser()} className={`${buttonShadowEffect} w-2/6 bg-cyan-600 px-6 py-3 rounded-md text-white font-bold`}>Continue</button>}
      </div>
    </>
  )
}