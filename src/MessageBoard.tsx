import { useState } from "react"

export const MessageBoard = () => {
   const[userInput, setUserInput] = useState<string>('')
   const[userMessagesArray, setUserMessagesArray] = useState<string[]>([])

   const addUserMessage = (userInput: string) => {
    setUserMessagesArray(prev => prev.concat(userInput))
   }

   
   
  return (
    <>
      <div className="h-screen" >
        <div className="bg-cyan-800 h-12"></div>
        <div className="flex h-full">
          <div className="bg-cyan-700 w-1/5"></div>
          <div className="flex flex-1 p-4 flex-col justify-end items-center gap-4">
            {userMessagesArray.map((message,i ) => <div className="w-full border-b border-slate-200">
              <div>{message}</div>
              </div>)}
            <hr className="border-t border-slate-400 w-full"></hr>
            <div className="w-full border border-slate-200 rounded-md">
              <div className="w-full bg-slate-200 h-10 p-2"></div>
              <input onChange={(e) => setUserInput(e.target.value)} className="p-4 w-full outline-0" type='text' placeholder='Enter message'>
              </input>
              <div className="w-full flex justify-end p-2 bg-slate-200 h-10">
                <span onClick={() => addUserMessage(userInput)} className="material-symbols-rounded">
                  send
                </span>
              </div>
            </div>




          </div>
        </div>
      </div>
    </>
  )
}