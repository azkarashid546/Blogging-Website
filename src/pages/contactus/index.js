import React, {useState} from 'react'
import { useRouter } from 'next/router'
import axios from "axios"
import {Toaster, toast} from "react-hot-toast"
import Sidebar from '@/pages/components/sidebar/index'

const index = ({data, latestBlogs}) => {
  const router = useRouter()
  const [loader, setloader] = useState(false);
  const [credentials, setCredentials] = useState({
    name : "",
    email : "",
    contactno : "",
    message : ""
  })
  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name] : e.target.value,
    })
    }
  const handleSubmit = async(e) => {
    try{
      e.preventDefault();
      setloader(true);
      const response = await axios.post("/api/contactus", credentials, {
        headers : {
          "Content-Type" : "application/json"
        }
      }
      )
      response && toast.success("Message submitted")
      router.push("/")
      response && setCredentials({
        name : "",
        email : "",
        contactno : "",
        message : ""
      })
    }
    catch(error){
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    }
    finally{
      setloader(false)
    }
  }
  return (
    <>
      <div className="contact-us">
        <Toaster></Toaster>
        <div className="contact-us-grid">
        <div className="contact-us-content">
          <div className="contact-us-sticky">
          <div className="contact-form-heading">
              <h1>
              Contact Us
              </h1>
            </div>
            <div className="contact-us-form">
              <form onSubmit = {handleSubmit}>
              <div className="contactus-field">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    id="name"
                    name="name"
                    value={credentials.name}
                    onChange={onChange}
                  />
                </div>
                <div className="contactus-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    placeholder="Enter Email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={onChange}
                  />
                </div>
                <div className="contactus-field">
                  <label htmlFor="contactno">Contact Number</label>
                  <input
                    type="text"
                    placeholder="Enter Contact"
                    id="contactno"
                    name="contactno"
                    value={credentials.contactno}
                    onChange={onChange}
                  />
                </div>
                <div className="contactus-field">
                  <label htmlFor="message">Message</label>
                 <textarea name="message" id="message" cols="30" rows="10" placeholder='Message'   value={credentials.message}
                    onChange={onChange}/>
                </div>
                <div className="contact-us-btn">
                  <button>{loader ? "Sending..." : "Send Messgae"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
            <div className="contactus-sidebar">
             <Sidebar sideBlogs = {data} latest = {latestBlogs}/>
            </div>
        </div>
      </div>
    </>
  )
}

export default index
export async function getServerSideProps({ params, page }) {
  // const singleResponse = await fetch(
  //   `http://localhost:3000/api/blogs/${params.slug}`
  // );
  // const singleData = await singleResponse.json();

  const response = await fetch("http://localhost:3000/api/blogs");
  const data = await response.json();

  // const blogWithComments = await fetch(
  //   `http://localhost:3000/api/blogs/getallcomments?page=1`
  // );
  // console.log("blog with comments", blogWithComments);
  // const blogWithCommentsData = await blogWithComments.json();
  // console.log("blog with comments data", blogWithCommentsData.message);

  const latestBlogs = Array.isArray(data.message) ? data.message.slice(-4) : [];
  // const relatedPosts =
  //   data.message.length > 0 ? [data.message[4], data.message[8]] : [];
  return {
    props: {
      data,
      latestBlogs,
      // singleBlog: singleData,
      // relatedPosts,
      // blogWithCommentsData,
    },
  };
}