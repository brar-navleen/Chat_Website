import { useEffect, useState } from "react"
import { userEnteredMessageDetails } from "../types"
import { WorkspaceUserDetails } from "../types"
import { UserMessage } from "./UserMessage"
import { format } from 'date-fns'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { useAsyncCallback } from 'react-async-hook'
import { TopBar } from "./TopBar"
import { UserChannels } from "./UserChannels"
import { UserDirectMessages } from "./UserDirectMessages"

const getUserDetails = async () => {
  const response = await fetch("http://localhost:3000/workspaceDetails")
  const result = await response.json()
  return result as WorkspaceUserDetails
}

const sendUserMessageDetailsToServer = async (userInputMessage: string) => {
  await fetch('http://localhost:3000/message', {
    method: 'POST',
    body: JSON.stringify({
      message: userInputMessage,
      channelId:0,
      userId: 1
    }),
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

export const MessageBoard = () => {
  const [userInputMsg, setUserInput] = useState<string>('')
  const [userMessagesArray, setUserMessagesArray] = useState<userEnteredMessageDetails[]>([])

  const mdParser = new MarkdownIt();

  const userChannelAndDirectMsgDetails = useAsyncCallback(getUserDetails)

  const userMessageDetails = useAsyncCallback(sendUserMessageDetailsToServer)

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

  useEffect(() => {
    userChannelAndDirectMsgDetails.execute()
  }, []
  )

  useEffect(() => {
    if (userChannelAndDirectMsgDetails.status === "success") {
      console.log("details")
    }
  }, [userChannelAndDirectMsgDetails.status])

  return (
    <>
      {userChannelAndDirectMsgDetails.loading && <div className="h-screen flex flex-col justify-center items-center" >
        <div className="font-bold flex gap-10">
          <span className="text-2xl material-symbols-rounded ">
            rotate_right
          </span>
          <div className="text-3xl">Loading</div>
        </div>
      </div>}
      {userChannelAndDirectMsgDetails.status === "success" && userChannelAndDirectMsgDetails.result && <div className="h-screen">
        <TopBar userChannelAndDirectMsgDetails={userChannelAndDirectMsgDetails.result} />
        <div className="flex h-full">
          <div className="bg-cyan-700 w-1/5">
            <UserChannels userChannelAndDirectMsgDetails ={userChannelAndDirectMsgDetails.result}/>
            <UserDirectMessages userChannelAndDirectMsgDetails = {userChannelAndDirectMsgDetails.result}/>
          </div>

          <div className="flex flex-1 p-4 flex-col justify-end items-center gap-4">
            <div className="overflow-auto w-full">

              {userMessagesArray.map((message, i) => <UserMessage key={i} message={message} deleteMessage={() => deleteMessage(i)} />)}
            </div>

            <hr className="border-t border-slate-400 w-full"></hr>

            <div className="w-full border border-slate-100 rounded-md">
              <MdEditor
                style={{ height: '100px' }} value={userInputMsg}
                onChange={(e) => setUserInput(e.text)}
                placeholder='Enter message'
                renderHTML={text => mdParser.render(text)}
              />

              <div className="w-full flex bg-[#f5f5f5] items-center justify-end p-2 h-9 border-x border-b border-[#e0e0e0]">
                <div onClick={() => {
                  userMessageDetails.execute(userInputMsg)
                  addUserMessage(userInputMsg)
                  setUserInput(prev => prev = '')
                }
                }
                  className={`${userInputMsg ? 'bg-cyan-700' : ''} flex justify-center items-center px-4 py-1 rounded-md hover:cursor-pointer`}>
                  <span
                    className="material-symbols-rounded text-slate-200" >
                    send
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}

    </>
  )
}