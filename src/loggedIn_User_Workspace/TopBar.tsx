import { useEffect, useState } from "react"
import { WorkspaceUserDetails } from "../types"

export const TopBar = (prop: {queryResult: WorkspaceUserDetails} ) => {
  const [userStatus, setUserStatus] = useState<boolean>(false)

  useEffect(() => {
    const closeMenu = () => {
      setUserStatus(false)
    }

    document.body.addEventListener('click', closeMenu)

    return () => document.body.removeEventListener('click', closeMenu)
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
                <div>{prop.queryResult && prop.queryResult.displayName}</div>
                <div className="flex items-center gap-1">
                  <div className="rounded-full h-2.5 w-2.5 bg-emerald-400"></div>
                  <div>Active</div>
                </div>
              </div >
              <div className="border-t border-slate-400 pt-4">Sign out of Your Workspace</div>
            </div>}
            <div className="bg-cyan-400 rounded-md px-4 py-0.5 font-bold">{prop.queryResult && prop.queryResult.displayName}</div>
            <div className="rounded-full border-4 border-cyan-800 h-5 w-5 bg-emerald-400 absolute -right-1.5 top-3.5"></div>
          </div>
        </div>
    </>
  )
}
