import { useState } from "react"
import { EmailverificationWithCode } from "./EmailVerificationWithCode"
import { SignUpUsingEmail } from "./SignUpUsingEmail"
import { UserProfileDetails } from "./UserProfileDetails"

export const SignUpProcess = () => {
  const [page, setPage] = useState(0)
  const [userEnteredEmail, setUserEnteredEmail] = useState('')
  return (
    <>
      {page === 0 && <SignUpUsingEmail
        onNext={(userEmail) => {
          setPage(prev => prev + 1)
          setUserEnteredEmail(userEmail)
        }
        }
      />}
      {page === 1 && <EmailverificationWithCode
        openUserProfilePage={() => { setPage(prev => prev + 1) }}
        userEmailAddress={userEnteredEmail}
      />}

      {page === 2 && <UserProfileDetails userEmailAddress={userEnteredEmail}/>}
    </>
  )
}