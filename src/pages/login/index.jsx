import { useRouter } from 'next/router'
import React, {useState} from 'react'
import axios from "axios"
import {Toaster, toast} from "react-hot-toast"
const index = () => {
  const [isError, setIsError] = useState("")
  const [isLoginUser, setIsLoginUser] = useState(false)
    const router = useRouter()
    const [credentials, setCredentials] = useState({
        email : "",
        password : ""
      })
      const onChange = (e) => {
      setCredentials({
        ...credentials,
        [e.target.name] : e.target.value,
      })
      }
      const handleReset = () =>{
        setCredentials({
          email : "",
          password : ""
        })
        if(setCredentials){
         toast.success("Reset was successfully")
        }
      }
      const handleSubmit = async (e) => {
      e.preventDefault();
      if(Object.values(credentials).some((value) => value === '')){
        toast.error("Please Fill All Fields")
        return;
      }
      try{
        setIsLoginUser(true)
          const response = await axios.post("/api/auth/login", credentials, {
            headers : {
              "Content-Type" : "application/json"
            }
          }
         
          )
          response && toast.success("User Logged In")
          router.push("/dashboard")
      }
       
        catch(error){
        console.error("Form Submission Error : ", error);
        if(error?.response?.data?.message){
          setIsError(error?.response?.data?.message)
          toast.error("Invalid Email and Password")
          router.push('/signup')
        }
        else{
          toast.error("Something went wrong")
        }
        }
        finally{
          setIsLoginUser(false)
        }
      }
  return (
    <>
    <Toaster></Toaster>
      <div className="container">
        <form>
          <div className="form">
            <div className="login">
              <div className="login-form">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={onChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="contact-button">
                <div className="login-button">
                  <button onClick={handleReset}>Reset</button>
                </div>
                <div className="login-button">
                  <button type="submit" disabled = {isLoginUser} onClick={handleSubmit}>
                  {isLoginUser ? "Logged In..." : "Login"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

      
      </div>
    </>
  )
}

export default index
