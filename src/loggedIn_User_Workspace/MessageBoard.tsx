import { useEffect, useState } from "react"
import { userEnteredMessageDetails } from "../types"
import { WorkspaceUserDetails } from "../types"
import { UserMessage } from "./UserMessage"
import { format } from 'date-fns'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { useAsyncCallback } from 'react-async-hook'

const getUserDetails = async () => {
  const response = await fetch("http://localhost:3000/workspaceDetails")
  const result = await response.json()
  return result as WorkspaceUserDetails
}

export const MessageBoard = () => {
  const [userInput, setUserInput] = useState<string>('')
  const [userMessagesArray, setUserMessagesArray] = useState<userEnteredMessageDetails[]>([])
  const [displayChannels, setDisplayChannels] = useState<boolean>(false)
  const [displayDirectMessages, setDisplayDirectMessages] = useState<boolean>(false)
  const [userStatus, setUserStatus] = useState<boolean>(false)

  const mdParser = new MarkdownIt();

  const query = useAsyncCallback(getUserDetails)
  query.result

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
    query.execute()
  }, []
  )

  useEffect(() => {
    if (query.status === "success") {
      console.log("details")
    }
  }, [query.status])


  const showChannels = () => {
    setDisplayChannels(prev => !prev)
  }
  const showDirectMessages = () => {
    setDisplayDirectMessages(prev => !prev)
  }

  useEffect(() => {
    const closeMenu = () => {
      setUserStatus(false)
    }
    document.body.addEventListener('click', closeMenu)

    return () => document.body.removeEventListener('click', closeMenu)
  }, [])

  return (
    <>
      {query.loading && <div className="h-screen flex flex-col justify-center items-center" >
        <div className="font-bold flex gap-10">
          <span className="text-2xl material-symbols-rounded ">
            rotate_right
          </span>
          <div className="text-3xl">Loading</div>
        </div>
      </div>}
      {!query.loading && <div className="h-screen">
        <div className="bg-cyan-800 h-12 flex justify-end p-4 items-center text-white">
          <div className="relative hover: cursor-pointer" onClick={(e) => {
            setUserStatus(prev => !prev)
            e.stopPropagation()
          }
          }>
            {userStatus && <div className="absolute h-80 w-80 top-10 right-0 flex flex-col justify-between bg-slate-100 rounded-md text-black" onClick={(e) => e.stopPropagation()}>
              <div className="border-b border-slate-400 pb-4">
                <div>{query.result && query.result.displayName}</div>
                <div className="flex items-center gap-1">
                  <div className="rounded-full h-2.5 w-2.5 bg-emerald-400"></div>
                  <div>Active</div>
                </div>
              </div >
              <div className="border-t border-slate-400 pt-4">Sign out of Your Workspace</div>
            </div>}
            <div className="bg-cyan-400 rounded-md px-4 py-0.5 font-bold">{query.result && query.result.displayName}</div>
            <div className="rounded-full border-4 border-cyan-800 h-5 w-5 bg-emerald-400 absolute -right-1.5 top-3.5"></div>
          </div>

        </div>
        <div className="flex h-full">
          <div className="bg-cyan-700 w-1/5">
            {query.result && <div className=" w-4/5 flex flex-col gap-6 p-2 text-white">
              <div>
                <div className="font-semibold">YOUR WORKSPACE</div>
                <div className="flex gap-1 items-center mt-6">
                  <span onClick={() => showChannels()} className={`material-symbols-rounded ${displayChannels ? '' : 'transform -rotate-90'} hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur rounded-md`}>
                    arrow_drop_down
                  </span>
                  <div className="hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur px-1.5 py-0.5 rounded-md">CHANNELS</div>
                </div>
                {displayChannels && query.result.displayChannels.map((channel, i) => <div className="ml-2 px-1.5 py-0.5 hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur rounded-md" key={i}>
                  # {channel.name}
                </div>
                )}
              </div>

              <div>
                <div className="flex gap-1 items-center">
                  <span onClick={() => showDirectMessages()} className={`material-symbols-rounded ${displayDirectMessages ? '' : 'transform -rotate-90'} hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur rounded-md`}>
                    arrow_drop_down
                  </span>
                  <div className="hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur px-1.5 py-0.5 rounded-md">DIRECT MESSAGES</div>
                </div>
                {displayDirectMessages && query.result.listOfPeopleDirectMsgIsSentTo.map((obj, i) => <div key={i} className="flex gap-2 ml-2 px-1.5 py-0.5 hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur rounded-md">
                  {obj.usersInvolved.map((user, i) => user.name).join(', ')}
                </div>)
                }
              </div>


            </div>}

          </div>

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
      </div>}

    </>
  )
}