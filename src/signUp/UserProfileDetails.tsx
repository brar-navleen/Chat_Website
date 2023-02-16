import { useState } from 'react'
import { buttonShadowEffect } from '../common/tailwind_constants'

const sendUserProfileDetails = async(firstName: String, lastName: String, username: String, userEmailAddress: String) => {
    await fetch('http://localhost:3000/sendUserProfileDetails', {
      method: 'PUT',
      body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      username: username,
      userEmailAddress: userEmailAddress
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
}

export const UserProfileDetails = (props: {userEmailAddress:String}) => {
  const [firstname, setFirstName] = useState<String>('')
  const [lastName, setLastName] = useState<String>('')
  const [username, setUsername] = useState<String>('')

  return (
    <>
      <div className="h-screen flex flex-col gap-10 justify-center items-center">
        <div className="w-1/3 flex flex-col gap-12 bg-slate-300 p-10 rounded-md">

          <div className="w-full flex flex-col gap-2">
            <div className="font-semibold">First Name</div>
            <input onChange={(e) => setFirstName(e.target.value)} className="w-full p-3 rounded-md" placeholder="Enter your first name"></input>
          </div>

          <div className="w-full flex flex-col gap-2">
            <div className="font-semibold">Last Name</div>
            <input onChange={(e) => setLastName(e.target.value)} className="w-full p-3 rounded-md" placeholder="Enter your last name"></input>
          </div>

          <div className="w-full flex flex-col gap-2 mb-24">
            <div className="font-semibold">Username</div>
            <input onChange={(e) => setUsername(e.target.value)} className="w-full p-3 rounded-md" placeholder="Enter your username"></input>
          </div>

          <button onClick={() => sendUserProfileDetails(firstname, lastName, username, props.userEmailAddress) } className={`${buttonShadowEffect} bg-cyan-600 p-3 rounded-md text-white font-semibold`}>Save and Continue</button>
        </div>
      </div>
    </>
  )
}