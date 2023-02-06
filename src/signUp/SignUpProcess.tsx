import { useState } from "react"
import { Emailverification } from "./EmailVerification"
import { SignUp } from "./SignUp"

export const SignUpProcess = () => {
  const [ page, setPage] = useState(0)
  const [userEnteredEmail, setUserEnteredEmail] = useState('')
  return (
    <>
    {page === 0 && <SignUp onNext = {(userEmail) => 
      {setPage(prev => prev + 1)
      setUserEnteredEmail(userEmail)
      }
      } />}
    {page === 1 && <Emailverification  userEmailAddress= {userEnteredEmail}/>}
    </>
  )
}