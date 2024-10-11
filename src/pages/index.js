import React from "react";
import axios from "axios";
import Hero from "@/pages/components/home/hero/hero";
import PopularBlogs from "@/pages/components/home/popularBlogs/index";
import Section from "@/pages/components/home/section/index";

const index = ({ data , firstBlog, remainingBlogs, latestBlogs, singleData}) => {
  const{commentsingle} = singleData.message
  console.log(data);
 
  return (    
    <>
      <div className="container">
        <Hero props={data} />
        <PopularBlogs popularBlogs={data} />
        <Section blog={data} first = {firstBlog} remainingBlogs = {remainingBlogs} latestBlogs = {latestBlogs} commentsingle={commentsingle}/>
      </div>
    </>
  );
};

export default index;



export async function getServerSideProps(params) {
  const singleResponse = await fetch(
    `http://localhost:3000/api/blogs/${params.slug}`
  );

  const singleData = await singleResponse.json();

  const response = await fetch("http://localhost:3000/api/blogs");
  const data = await response.json();
  // const totalComments = data.comments.length;

  const firstBlog = data.message.length > 0 ? data.message[0] : {};
  console.log('First Blog:', firstBlog);

  const remainingBlogs = Array.isArray(data.message) ? data.message.slice(1) : []
  const latestBlogs = Array.isArray(data.message) ? data.message.slice(-4) : [];

 

  return {
    props: {
      singleData,
      data,
      firstBlog,
      remainingBlogs,
      latestBlogs,
    },
  };
}
