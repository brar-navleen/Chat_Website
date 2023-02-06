import { useEffect, useRef } from "react";

export const Emailverification = (prop: { userEmailAddress: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRefTwo = useRef<HTMLInputElement>(null);
  const checkPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key == 'Enter'){
      inputRefTwo.current?.focus();
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
            <input maxLength={1} ref={inputRef} onKeyDown={(e) => checkPress(e)} className="p-4 h-32 w-32 border border-black text-center"></input>
            <input maxLength={1} ref={inputRefTwo}  className="p-4 h-32 w-32 border-y border-black text-center"></input>
            <input maxLength={1}  className="p-4 h-32 w-32 border border-black text-center"></input>
          </div>
          <div></div>
          <div className="flex">
            <input maxLength={1}  className="p-4 h-32 w-32 border border-black text-center"></input>
            <input maxLength={1}  className="p-4 h-32 w-32 border-y border-black text-center"></input>
            <input maxLength={1}  className="p-4 h-32 w-32 border border-black text-center"></input>
          </div>
        </div>



      </div>
    </>
  )
}