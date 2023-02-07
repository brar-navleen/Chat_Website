import { useRef, useState } from "react";

export const Emailverification = (prop: { userEmailAddress: string }) => {

  const [userEnteredCode, setUserEnteredCode] = useState<string[]>([])
  console.log(userEnteredCode)


  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ]



  const checkPress = (e: React.KeyboardEvent<HTMLInputElement>, currentInputIndex: number) => {
    if ('0123456789'.includes(e.key)) {
      inputRefs[currentInputIndex + 1].current?.focus()
      setUserEnteredCode(prev => {
        const newPrev = [...prev]
        newPrev[currentInputIndex] = e.key
        return newPrev
      })
    }

    if (e.key === "ArrowLeft") {
      inputRefs[currentInputIndex - 1].current?.focus()
    }

    if (e.key === "ArrowRight") {
      inputRefs[currentInputIndex + 1].current?.focus()
    }

    if (e.key === "Backspace") {
      inputRefs[currentInputIndex].current?.focus()
      setUserEnteredCode(prev => {
        const newPrev = [...prev]
        newPrev[currentInputIndex] = ''
        return newPrev
      })
    }
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
            <input value={userEnteredCode[5] || ''} maxLength={1} ref={inputRefs[5]} onChange={() => { }} onKeyDown={(e) => checkPress(e, 5)} className="p-4 h-32 w-32 border border-black text-center"></input>
          </div>
        </div>
      </div>
    </>
  )
}