import { useEffect, useRef, useState } from "react";
import { useAsyncCallback } from 'react-async-hook';

const validatingCode = async (userEnteredCode: string[], userEmail: string) => {
  const response = await fetch('http://localhost:3000/codeForValidatingUser', {
    method: 'POST',
    body: JSON.stringify({
      verificationCode: userEnteredCode.join(''),
      userEmail: userEmail
    }),
    headers: {
      'Content-Type': 'application/json'
    },
  })

  const result = await response.json()
  return result 
}

export const Emailverification = (prop: { userEmailAddress: string }) => {

  const [userEnteredCode, setUserEnteredCode] = useState<string[]>([])

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ]

  const query = useAsyncCallback(validatingCode);

  const checkPress = (e: React.KeyboardEvent<HTMLInputElement>, currentInputIndex: number, islastCodeNumber?: boolean) => {
    if ('0123456789'.includes(e.key)) {
      if (islastCodeNumber) {
        query.execute(userEnteredCode.concat(e.key), prop.userEmailAddress)
      } else {
        inputRefs[currentInputIndex + 1]?.current?.focus()
      }

      setUserEnteredCode(prev => {
        const newPrev = [...prev]
        newPrev[currentInputIndex] = e.key
        return newPrev
      })
      cursorAtEnd(inputRefs[currentInputIndex + 1]?.current)
    }

    if (e.key === "ArrowLeft") {
      inputRefs[currentInputIndex - 1].current?.focus()
      cursorAtEnd(inputRefs[currentInputIndex - 1].current)
    }

    if (e.key === "ArrowRight") {
      inputRefs[currentInputIndex + 1].current?.focus()
      cursorAtEnd(inputRefs[currentInputIndex + 1].current)
    }

    if (e.key === "Backspace") {
      if (inputRefs[currentInputIndex].current?.value === '') {
        inputRefs[currentInputIndex - 1].current?.focus()
        setUserEnteredCode(prev => {
          const newPrev = [...prev]
          newPrev[currentInputIndex - 1] = ''
          return newPrev
        })
      }
      else {
        inputRefs[currentInputIndex].current?.focus()
        setUserEnteredCode(prev => {
          const newPrev = [...prev]
          newPrev[currentInputIndex] = ''
          return newPrev
        })
      }
      cursorAtEnd(inputRefs[currentInputIndex].current)
    }
  }

  useEffect(() => {
    console.log('test')
    if (query.result?.success) {
      console.log("next page")
      window.location.href = '/MessageBoard'
    }
  }
    , [query.status])

  const cursorAtEnd = (inputRef: HTMLInputElement | null) => {
    // const end = inputRef?.value.length || 0
    // console.log(end, inputRef?.value)
    inputRef?.setSelectionRange(0, 2, 'backward')
  }

  return (
    <>
      <div className="h-screen flex flex-col items-center p-10 gap-14">
        <div className="text-3xl font-bold">CONVERSE</div>
        <div className="text-5xl font-bold">Check your email for a code</div>
        <div>Please type in 6 digit code sent to <span className="text-green-700 font-semibold">{prop.userEmailAddress}</span>. The code
          expires shortly, so please enter it soon. </div>
        <div className="flex gap-4 items-center text-4xl">
          <div className="flex">
            <input value={userEnteredCode[0] || ''} maxLength={1} ref={inputRefs[0]} onChange={() => { }} onKeyDown={(e) => checkPress(e, 0)} className="p-4 h-32 w-32 border border-black text-center"></input>
            <input value={userEnteredCode[1] || ''} maxLength={1} ref={inputRefs[1]} onChange={() => { }} onKeyDown={(e) => checkPress(e, 1)} className="p-4 h-32 w-32 border-y border-black text-center"></input>
            <input value={userEnteredCode[2] || ''} maxLength={1} ref={inputRefs[2]} onChange={() => { }} onKeyDown={(e) => checkPress(e, 2)} className="p-4 h-32 w-32 border border-black text-center"></input>
          </div>
          <div></div>
          <div className="flex">
            <input value={userEnteredCode[3] || ''} maxLength={1} ref={inputRefs[3]} onChange={() => { }} onKeyDown={(e) => checkPress(e, 3)} className="p-4 h-32 w-32 border border-black text-center"></input>
            <input value={userEnteredCode[4] || ''} maxLength={1} ref={inputRefs[4]} onChange={() => { }} onKeyDown={(e) => checkPress(e, 4)} className="p-4 h-32 w-32 border-y border-black text-center"></input>
            <input value={userEnteredCode[5] || ''} maxLength={1} ref={inputRefs[5]} onChange={() => { }} onKeyDown={(e) => checkPress(e, 5, true)} className="p-4 h-32 w-32 border border-black text-center"></input>
          </div>
        </div>
        {query.loading && <div className="font-bold flex justify-center items-center gap-10">
          <span className="text-xl material-symbols-rounded ">
            rotate_right
          </span>
          <div className="text-lg">Loading</div>
        </div>}
      </div>
    </>
  )

}