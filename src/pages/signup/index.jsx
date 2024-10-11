import { useRouter } from 'next/router'
import React, {useState} from 'react'
import {toast, Toaster} from 'react-hot-toast'

const index = () => {
  const router = useRouter()
  const [isUserSignUp, setIsUserSignUp] = useState(false)
  const [credentials, setCredentials] = useState({
    name : "",
    userName : "",
    email : "",
    password : ""
  })
  const onChange = (e) => {
  setCredentials({
    ...credentials,
    [e.target.name] : e.target.value
  })
  }
  const handleReset = () =>{
    setCredentials({
      name : "",
      userName : "",
      email : "",
      password : ""
    })
    if(setCredentials){
      alert("Reset was Successfully")
    }
  }
  const checkEmailUniqueness = async (email) => {
    const response = await fetch(`/api/auth/check-email?email=${encodeURIComponent(email)}`);
    const data = await response.json();
    return !data.exists;
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  if(Object.values(credentials).some((value) => value === '')){
    alert("Please Fill All Fields")
    return;
  }
  try{
    setIsUserSignUp(true)
    const isEmailUnique = await checkEmailUniqueness(credentials.email);

    if (!isEmailUnique) {
      alert('Email is already registered. Please Login.');
      router.push('/login')
      return;
    }
    const response = await fetch("/api/auth/signup", {
      method : "POST",
      body : JSON.stringify(credentials),
      headers : {
        "Content-Type" : "application/json"
      }
    })
    console.log(response);
    if(response.ok){
      toast.success("Accout Created Successfully!")
    }
    router.push("/login")
    }
    catch(error){
    console.error("Form Submission Error : ", error)
    }
    finally{
      setIsUserSignUp(false)
    }
  }
 
  return (
    <>
       <div className="container">
       <Toaster/>
        <form>
          <div className="form">
           
            <div className="Signup">
              <div className="signup-form">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    id="name"
                    name="name"
                    value={credentials.name}
                    onChange={onChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="userName">Username</label>
                  <input
                    type="text"
                    placeholder="Username"
                    id="userName"
                    name="userName"
                    value={credentials.userName}
                    onChange={onChange}
                  />
                </div>
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
                <div className="signup-button">
                  <button onClick={handleReset}>Reset</button>
                </div>
                <div className="signup-button">
                  <button type="submit" disabled = {isUserSignUp} onClick={handleSubmit}>
                    {""}
                    {isUserSignUp ? "Signed Up..." : "Sign Up"}
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
