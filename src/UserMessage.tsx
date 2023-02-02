import { useState } from "react"
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'

export const UserMessage = (prop: { message: string, deleteMessage: () => any }) => {

  const [isHovering, setIsHovering] = useState<boolean>(false)
  
 console.log(prop.message, prop.deleteMessage)
  return (
    <>
      <div onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)} className="w-full justify-between items-center flex border-b border-slate-200 hover:bg-slate-100 p-2 rounded-md">
        <div>
          <div className="flex gap-4">
            <div>usericon</div>
            <div>username</div>
            <div>{format(new Date(), 'h:mm b')}</div>
          </div>

          <ReactMarkdown className="prose" children={prop.message} />

        </div>
        {isHovering && <span onClick={() => prop.deleteMessage()} className="material-symbols-rounded hover:cursor-pointer hover:text-red-600">
          delete
        </span>}
      </div>
    </>
  )
}
