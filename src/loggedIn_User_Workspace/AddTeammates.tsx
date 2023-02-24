import { ResultType } from "@remix-run/router/dist/utils";
import { useEffect, useState } from "react";
import { useAsyncCallback } from "react-async-hook";

const sendNewTeammatesAddedByUserToServer = async (newTeammateEmail: string) => {
  await fetch('http://localhost:3000/user/directMessages', {
    method: 'PUT',
    body: JSON.stringify({
      newTeammateEmail: newTeammateEmail
    }),
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

const getUsersFromServer = async (token: any) => {
  const response = await fetch('http://localhost:3000/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
  })

  const result = await response.json()
  console.log({ result })
  return result
}

export const AddTeammates = () => {
  const [showModal, setShowModal] = useState(false);

  const sendEmailOfTeammateToBeAddedQuery = useAsyncCallback(sendNewTeammatesAddedByUserToServer)
  const getAllUsersQuery = useAsyncCallback(getUsersFromServer)


  useEffect(() => {
    document.body.addEventListener('click', () => { setShowModal(false) })
  }, [])

  useEffect(() => {
    if (showModal) {
      const token = localStorage.getItem('token')
      getAllUsersQuery.execute(token)
    }
  }, [showModal])

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
                <div className="text-3xl font-semibold text-cyan-700">Send Direct Messages To:</div>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => setShowModal(false)}
                >
                  <span className=" font-bold flex items-center justify-center">
                    x
                  </span>
                </button>
              </div>

              <div className="overflow-auto">
                {getAllUsersQuery.status === 'success' && getAllUsersQuery.result.map((user: any, i: number) =>
                  <div className="flex flex-col text-black px-5 py-1">
                    <div className="flex gap-2">
                      <span className="hover:cursor-pointer material-symbols-rounded">check_box_outline_blank</span>
                      <div>{user.firstName} {user.lastName}</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-black bg-slate-200 font-bold uppercase text-sm px-4 py-1.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => {
                    setShowModal(false)



                  }}
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