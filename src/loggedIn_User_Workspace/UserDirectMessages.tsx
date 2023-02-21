import { useEffect, useState } from "react"
import { WorkspaceUserDetails } from "../types"
import { useAsyncCallback } from 'react-async-hook'
import { AddTeammates } from "./AddTeammates"

const sendJWTTokenToServer = async(token: any) => {
  const response = await fetch('http://localhost:3000/user/directMessages', {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const result = await response.json()
  return result
}

export const UserDirectMessages = () => {

  const [displayDirectMessages, setDisplayDirectMessages] = useState<boolean>(false)

  const showDirectMessages = () => {
    setDisplayDirectMessages(prev => !prev)
  }

  const sendJWTTokenQuery = useAsyncCallback(sendJWTTokenToServer)

  useEffect(() => {
    const token = localStorage.getItem('token')
    sendJWTTokenQuery.execute(token)
  }, [])


  return (
    <>
      {sendJWTTokenQuery.result?.listOfPeopleDirectMsgIsSentTo && <div className=" w-4/5 flex flex-col gap-6 p-2 text-white">
        <div>
          <div className="flex gap-1 items-center">
            <span onClick={() => showDirectMessages()} className={`material-symbols-rounded ${displayDirectMessages ? '' : 'transform -rotate-90'} text-[32px] hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur rounded-md`}>
              arrow_drop_down
            </span>
            <div className="hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur px-1.5 py-0.5 rounded-md">DIRECT MESSAGES</div>
          </div>
          {displayDirectMessages && sendJWTTokenQuery.result?.listOfPeopleDirectMsgIsSentTo.map((obj: any, i: number) => <div key={i} className="flex gap-2 ml-2 px-1.5 py-0.5 hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur rounded-md">
            {obj.usersInvolved.map((user: any, i: number) => user.name).join(', ')}
          </div>)
          }
          <AddTeammates/>
        </div>
      </div>}
    </>
  )
}