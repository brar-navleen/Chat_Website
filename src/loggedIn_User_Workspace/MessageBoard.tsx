import { useState } from "react"
import { userEnteredMessageDetails } from "../types"
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

              <MdEditor
                style={{ height: '100px' }} value={userInput}
                onChange={(e) => setUserInput(e.text)}
                placeholder='Enter message'
                renderHTML={text => mdParser.render(text)}
              />

              <div className="w-full flex bg-[#f5f5f5] items-center justify-end p-2 h-9 border-x border-b border-[#e0e0e0]">
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