import { useEffect, useState } from "react"
import { WorkspaceUserDetails } from "../types"
import { useAsyncCallback } from 'react-async-hook'
import { AddChannels } from "./AddChannels"

const sendJWTTokenToServer = async (token: any) => {
  const response = await fetch('http://localhost:3000/user/channels', {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const result = await response.json()
  console.log({ result })
  return result
}

export const UserChannels = () => {
  

  const [displayChannels, setDisplayChannels] = useState<boolean>(false)

  const sendJWTTokenQuery = useAsyncCallback(sendJWTTokenToServer)

  const showChannels = () => {
    setDisplayChannels(prev => !prev)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    sendJWTTokenQuery.execute(token)
  }, [])

  console.log(sendJWTTokenQuery.result)

  return (
    <>
      {sendJWTTokenQuery.result && <div className=" w-4/5 flex flex-col gap-6 p-2 text-white">
        <div>
          <div className="flex gap-1 items-center mt-6">
            <span onClick={() => showChannels()} className={`material-symbols-rounded ${displayChannels ? '' : 'transform -rotate-90'} text-[32px] hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur rounded-md`}>
              arrow_drop_down
            </span>
            <div className="hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur px-1.5 py-0.5 rounded-md">CHANNELS</div>
          </div>
          {displayChannels && sendJWTTokenQuery?.result.map((channel: any, i: any) => <div className="ml-2 px-1.5 py-0.5 hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur rounded-md" key={i}>
            # {channel.name}
          </div>
          )}
          <AddChannels />
        </div>
      </div>
      }
    </>

  )
}