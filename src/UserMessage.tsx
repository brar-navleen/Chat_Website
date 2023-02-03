import { useState } from "react"
import ReactMarkdown from 'react-markdown'
import { userEnteredMessageDetails } from "./types"

export const UserMessage = (prop: { message: userEnteredMessageDetails, deleteMessage: () => any }) => {

  const [isHovering, setIsHovering] = useState<boolean>(false)
  
  return (
    <>
      <div onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} className="w-full justify-between items-center flex border-b border-slate-200 hover:bg-slate-100 p-2 rounded-md">
        <div>
          <div className="flex gap-4">
            <div>usericon</div>
            <div>username</div>
            <div>{prop.message.timestamp}</div>
          </div>

          <ReactMarkdown className="prose" children={prop.message.userMessages} />

        </div>
        {isHovering && <span onClick={() => prop.deleteMessage()} className="material-symbols-rounded hover:cursor-pointer hover:text-red-600">
          delete
        </span>}
      </div>
    </>
  )
}
