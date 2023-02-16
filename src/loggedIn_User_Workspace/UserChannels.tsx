import { useState } from "react"
import { WorkspaceUserDetails } from "../types"

export const UserChannels = (prop: { userChannelAndDirectMsgDetails: WorkspaceUserDetails }) => {

  const [displayChannels, setDisplayChannels] = useState<boolean>(false)

  const showChannels = () => {
    setDisplayChannels(prev => !prev)
  }

  return (
    <>
      {prop.userChannelAndDirectMsgDetails && <div className=" w-4/5 flex flex-col gap-6 p-2 text-white">
        <div>
          <div className="flex gap-1 items-center mt-6">
            <span onClick={() => showChannels()} className={`material-symbols-rounded ${displayChannels ? '' : 'transform -rotate-90'} hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur rounded-md`}>
              arrow_drop_down
            </span>
            <div className="hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur px-1.5 py-0.5 rounded-md">CHANNELS</div>
          </div>
          {displayChannels && prop.userChannelAndDirectMsgDetails.displayChannels.map((channel, i) => <div className="ml-2 px-1.5 py-0.5 hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur rounded-md" key={i}>
            # {channel.name}
          </div>
          )}
        </div>
      </div>
      }
    </>

  )
}