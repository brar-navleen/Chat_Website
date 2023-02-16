import { useState } from "react"
import { WorkspaceUserDetails } from "../types"

export const UserDirectMessages = (prop: {userChannelAndDirectMsgDetails: WorkspaceUserDetails}) => {

  const [displayDirectMessages, setDisplayDirectMessages] = useState<boolean>(false)

  const showDirectMessages = () => {
    setDisplayDirectMessages(prev => !prev)
  }

  return (
    <>
      {prop.userChannelAndDirectMsgDetails && <div className=" w-4/5 flex flex-col gap-6 p-2 text-white">
        <div>
          <div className="flex gap-1 items-center">
            <span onClick={() => showDirectMessages()} className={`material-symbols-rounded ${displayDirectMessages ? '' : 'transform -rotate-90'} hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur rounded-md`}>
              arrow_drop_down
            </span>
            <div className="hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur px-1.5 py-0.5 rounded-md">DIRECT MESSAGES</div>
          </div>
          {displayDirectMessages && prop.userChannelAndDirectMsgDetails.listOfPeopleDirectMsgIsSentTo.map((obj, i) => <div key={i} className="flex gap-2 ml-2 px-1.5 py-0.5 hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur rounded-md">
            {obj.usersInvolved.map((user, i) => user.name).join(', ')}
          </div>)
          }
        </div>
      </div>}
    </>
  )
}