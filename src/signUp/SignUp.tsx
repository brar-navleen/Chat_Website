import { useEffect, useState } from "react"
import { buttonShadowEffect } from "../common/tailwind_constants"
import { z } from 'zod'
import { useAsyncCallback } from 'react-async-hook';

const emailSchema = z.string().email()

async function sendEmailForVerification(...args: any[]) {
  console.log('test 2', ...args)
  await new Promise((resolve, reject) => setTimeout(resolve, 1000))
  console.log('test 3')
  return 'a'
}

export const SignUp = (prop: { onNext: (userEmail: string) => any }) => {
  const [userEmail, setUserEmail] = useState('')
  const [invalidEmail, setInvalidEmail] = useState(false)

  const query = useAsyncCallback(sendEmailForVerification)

  const isValidUser = () => {

    if (emailSchema.safeParse(userEmail).success) {
      setInvalidEmail(false)
      console.log('test')
      query.execute()
    }
    else {
      setInvalidEmail(true)
    }
  }

  useEffect(() => {
    if (query.result) {
      prop.onNext(userEmail)
    }
  }, [query.result])

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
            </span>Please enter a valid e-mail address</div>}
        </div>
        {query.loading && <span className="material-symbols-rounded">
          rotate_right
        </span>}
        {query.error && <div>Error</div>}
        {invalidEmail && <button onClick={() => isValidUser()} className={`${buttonShadowEffect} w-2/6 bg-cyan-600 px-6 py-3 rounded-md text-white font-bold`}>Continue</button>}
        {!invalidEmail && <button onClick={() => isValidUser()} className={`${buttonShadowEffect} w-2/6 bg-cyan-600 px-6 py-3 rounded-md text-white font-bold`}>Continue</button>}

      </div>
    </>
  )
}