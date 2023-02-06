import { useState } from "react"
import { Emailverification } from "./EmailVerification"
import { SignUp } from "./SignUp"

export const SignUpProcess = () => {
  const [ page, setPage] = useState(0)
  return (
    <>
    {page === 0 && <SignUp onNext = {() => setPage(prev => prev + 1)} />}
    {page === 1 && <Emailverification/>}
    </>
  )
}