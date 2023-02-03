import { useState } from "react"
import { userEnteredMessageDetails } from "./types"
import { UserMessage } from "./UserMessage"
import { format } from 'date-fns'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css'

export const MessageBoard = () => {
  const [userInput, setUserInput] = useState<string>('')
  const [userMessagesArray, setUserMessagesArray] = useState<userEnteredMessageDetails[]>([])

  const mdParser = new MarkdownIt();

  const addUserMessage = (userInput: string) => {
    if (userInput) {

      setUserMessagesArray(prev => prev.concat(
        {
          userMessages: userInput,
          timestamp: format(new Date(), 'h:mm b')
        }
      ))
    }
  }

  const deleteMessage = (i: number) => {
    setUserMessagesArray(prev => {
      return prev.slice(0, i).concat(prev.slice(i + 1))
    })
  }

  return (
    <>
      <div className="h-screen" >
        <div className="bg-cyan-800 h-12"></div>
        <div className="flex h-full">
          <div className="bg-cyan-700 w-1/5"></div>
          <div className="flex flex-1 p-4 flex-col justify-end items-center gap-4">
            <div className="overflow-auto w-full">
              {userMessagesArray.map((message, i) => <UserMessage key={i} message={message} deleteMessage={() => deleteMessage(i)} />)}
            </div>

            <hr className="border-t border-slate-400 w-full"></hr>

            <div className="w-full border border-slate-100 rounded-md">
              <div className="w-full bg-slate-100 h-10 p-2 flex gap-2"></div>

              <MdEditor style={{ height: '500px' }} 
             
              renderHTML={text => mdParser.render(text)} />

              


              <textarea
                value={userInput}
                onChange={(e: any) => setUserInput(e.target.value)}
                className="p-4 w-full outline-0 whitespace-pre-wrap"
                placeholder='Enter message'>
              </textarea>
              <div className="w-full flex items-center justify-end p-2 h-10">
                <div onClick={() => {
                  addUserMessage(userInput)
                  setUserInput(prev => prev = '')
                }
                }
                  className={`${userInput ? 'bg-cyan-700' : ''} flex justify-center items-center px-4 py-1 rounded-md hover:cursor-pointer`}>
                  <span
                    className="material-symbols-rounded text-slate-200" >
                    send
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}