import { useState } from "react"
import { Emailverification } from "./EmailVerification"
import { SignUp } from "./SignUp"
import { UserProfileDetails } from "./UserProfileDetails"

export const SignUpProcess = () => {
  const [page, setPage] = useState(0)
  const [userEnteredEmail, setUserEnteredEmail] = useState('')
  return (
    <>
      {page === 0 && <SignUp
        onNext={(userEmail) => {
          setPage(prev => prev + 1)
          setUserEnteredEmail(userEmail)
        }
        }
      />}
      {page === 1 && <Emailverification
        onNext={() => { setPage(prev => prev + 1) }}
        userEmailAddress={userEnteredEmail}
      />}

      {page === 2 && <UserProfileDetails userEmailAddress={userEnteredEmail}/>}
    </>
  )
}