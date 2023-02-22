import e from "express";
import { useEffect, useState } from "react";
import { useAsyncCallback } from "react-async-hook";

const createNewChannelAddedByUser = async (channelName: string, channelDescription: string) => {
  const token = localStorage.getItem('token')
  await fetch('http://localhost:3000/channels', {
    method: 'POST',
    body: JSON.stringify({
      channelName: channelName,
      channelDescription: channelDescription
    }),
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
  })
}

export const AddChannels = () => {

  const [showModal, setShowModal] = useState(false);
  const[newChannelName, setNewChannelName] = useState<string>('')
  const[newAddedChannelDescription, setNewAddedChannelDescription] = useState<string>('')

  const createNewChannelAddedByUserQuery = useAsyncCallback(createNewChannelAddedByUser)

  useEffect(() => {
    document.body.addEventListener('click', () => {setShowModal(false)})
  },[])

  return (
    <>
      <div className="flex items-center gap-2">
        <span onClick={(e) => {
          setShowModal(true)
          e.stopPropagation()
        }} 
          className="material-symbols-rounded hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur px-1.5 py-0.5 rounded-md">
          add
        </span>
        <div onClick={(e) => {
          setShowModal(true)
          e.stopPropagation()
      }} 
        className=" hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur px-1.5 py-0.5 rounded-md">Add Channels</div>

        {showModal && <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div onClick={(e) => e.stopPropagation() }  className="relative w-2/5 my-6 mx-auto max-w-3xl">
            <div className="rounded-lg shadow-lg relative flex flex-col w-full">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <div className="text-3xl font-semibold text-cyan-700">Create a new channel</div>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => setShowModal(false)}
                >
                  <span className=" font-bold flex items-center justify-center">
                    x
                  </span>
                </button>
              </div>

              <div className="flex flex-col gap-6 text-black p-12">
                <div>
                  <div>Name</div>
                  <input onChange={(e) => setNewChannelName(e.target.value)} className="p-2 w-full rounded-md border border-black" placeholder="# e.g. track-bugs"></input>
                </div>

                <div>
                  <div>Description</div>
                  <input onChange={(e) => setNewAddedChannelDescription(e.target.value)} className="p-2 w-full rounded-md border border-black"></input>
                  <div className="text-xs">What's this channel about?</div>
                </div>

              </div>

              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-700 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="text-white bg-yellow-600 active:bg-yellow-700 font-bold uppercase text-sm px-4 py-1.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    createNewChannelAddedByUserQuery.execute(newChannelName, newAddedChannelDescription)
                  }}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    </>
  )
}