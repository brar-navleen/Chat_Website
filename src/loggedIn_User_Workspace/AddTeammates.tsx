import { useEffect, useState } from "react";

export const AddTeammates = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.body.addEventListener('click', () => { setShowModal(false) })
  }, [])

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
          className=" hover: cursor-pointer hover:bg-[#ffffff30] hover:backdrop-blur px-1.5 py-0.5 rounded-md">Add Teammates</div>

        {showModal && <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div onClick={(e) => e.stopPropagation()} className="relative w-2/5 my-6 mx-auto max-w-3xl">
            <div className="rounded-lg shadow-lg relative flex flex-col w-full">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <div className="text-3xl font-semibold text-cyan-700">Invite people to your workspace</div>
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
                  <div>To:</div>
                  <textarea className="p-2 w-full rounded-md border border-black h-32" placeholder="# e.g. track-bugs"></textarea>
                </div>
              </div>

              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-black bg-slate-200 font-bold uppercase text-sm px-4 py-1.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Send
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