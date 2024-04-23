import { useRef } from "react"
import Navbar from "./src/Components/Navbar/Navbar"
import Main from "./src/components/Main"
import useAlan from "./src/useAlan"
import React from "react"
import { useNavigate ,useLocation} from "react-router-dom"

function App() {
  const navigate=useNavigate()
  const location=useLocation()
  const alanBtn=useRef()
  useAlan({navigate:navigate,location:location})
  return (
      <React.Fragment >
        <Navbar />
        <Main />
        <div ref={alanBtn} ></div>
      </React.Fragment>
  )
}

export default App