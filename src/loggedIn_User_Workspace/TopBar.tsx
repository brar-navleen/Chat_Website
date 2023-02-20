import { useEffect, useState } from "react"
import { WorkspaceUserDetails } from "../types"
import { useAsyncCallback } from 'react-async-hook'

const sendJWTTokenToServer = async (token: any) => {
  const response = await fetch('http://localhost:3000/user', {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const result = await response.json()
  return result
}

export const TopBar = ( ) => {
  const [userStatus, setUserStatus] = useState<boolean>(false)

  useEffect(() => {
    const closeMenu = () => {
      setUserStatus(false)
    }

    document.body.addEventListener('click', closeMenu)

    return () => document.body.removeEventListener('click', closeMenu)
  }, [])

  const sendJWTTokenQuery = useAsyncCallback(sendJWTTokenToServer)

  console.log(sendJWTTokenQuery?.result)

  useEffect(() => {
    const token = localStorage.getItem('token')
    sendJWTTokenQuery.execute(token)
  }, [])

  return (
    <>
    <div className="bg-cyan-800 h-12 flex justify-end p-4 items-center text-white">
          <div className="relative hover: cursor-pointer" onClick={(e) => {
            setUserStatus(prev => !prev)
            e.stopPropagation()
          }
          }>
            {userStatus && <div className="absolute h-80 w-80 top-10 right-0 flex flex-col justify-between bg-slate-100 rounded-md text-black" onClick={(e) => e.stopPropagation()}>
              <div className="border-b border-slate-400 pb-4">
                <div className="flex items-center gap-1">
                  <div className="rounded-full h-2.5 w-2.5 bg-emerald-400"></div>
                  <div>Active</div>
                </div>
              </div >
              <div className="border-t border-slate-400 pt-4">Sign out of Your Workspace</div>
            </div>}
            {sendJWTTokenQuery?.result && <div className="bg-cyan-400 rounded-md px-4 py-0.5 font-bold">{sendJWTTokenQuery?.result.username}</div>}
            <div className="rounded-full border-4 border-cyan-800 h-5 w-5 bg-emerald-400 absolute -right-1.5 top-3.5"></div>
          </div>
        </div>
    </>
  )
}
