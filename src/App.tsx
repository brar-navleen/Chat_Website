import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { AboutConverse } from './about_Converse/AboutConverse'
import './App.css'
import { MessageBoard } from './loggedIn_User_Workspace/MessageBoard'
import { SignUpProcess } from './signUp/SignUpProcess'


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<AboutConverse />} />
          <Route path="MessageBoard" element={<MessageBoard />} />
          <Route path="SignUp" element={<SignUpProcess/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}