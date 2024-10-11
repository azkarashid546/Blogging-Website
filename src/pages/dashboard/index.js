import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";

const index = ({totalBlogs, data, blogWithCommentsData}) => {
 
  const router = useRouter();
  const slug = router.query.slug;
  const handleDelete = async(slug) => {
    try{
      if(window.confirm("Do you want to delete this blog?") === true){
      const res = await fetch(`/api/blogs/${slug}`, {
        method : "DELETE"
      }) 
      res && toast.success("Blog has been deleted sucessfully!")
      router.push("/dashboard")
      }
    }
    catch(error){
    toast.error("Something went wrong!")
    }
    }

  return (
    <>
    <div className="user-dashboard">
    <Toaster />
        <div className="user-dashboard-grid">
          <div className="user-dashboard-content">
            <div className="user-dashboard-cards">
              <div className="user-dashboard-single-card">
                <div className="user-dashboard-blog-details">
                  <span className="dashboard-counter">{totalBlogs}</span>
                  <span className="dashboard-about">Blogs</span>
                </div>
                <div className="user-dashboard-blog-details-icons">
                  <i class="fa-solid fa-blog fa-2xl"></i>
                </div>
              </div>
              <div className="user-dashboard-single-card">
                <div className="user-dashboard-blog-details">
                  <span className="dashboard-counter">1000</span>
                  <span className="dashboard-about">Categories</span>
                </div>
                <div className="user-dashboard-blog-details-icons">
                  <i class="fa-solid fa-quote-left fa-2xl"></i>
                </div>
              </div>
              <div className="user-dashboard-single-card">
                <div className="user-dashboard-blog-details">
                  <span className="dashboard-counter">{blogWithCommentsData.message.length}</span>
                  <span className="dashboard-about">Comments</span>
                </div>
                <div className="user-dashboard-blog-details-icons">
                  <i class="fa-solid fa-comments fa-2xl"></i>
                </div>
              </div>
            </div>
            <div className="user-dashboard-blogs-tables">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Picture</th>
                    <th>Preview</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                    {data?.message.map((v) => (
                        <tr key = {v._i}>
              
                    <td className="title">{v.title}</td>
                    <td className="category">{v.category}</td>
                    <td>{new Date(v.createdAt).toDateString()}</td>
                    <td><div className="data-img">
                    <img src={v.picture} alt={v.alttext} />
                      </div></td>
                    <td><Link href={`/blog/${v.slug}`}><i class="fa-solid fa-eye fa-lg"></i></Link></td>
                    <td><button className="update"><Link href={`/dashboard/update/${v.slug}`}>Update</Link></button></td>
                    <td><button className="delete"  onClick={() => handleDelete(v.slug)}>Delete</button></td>
                  </tr>
                    ))}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default index;
export async function getServerSideProps({params}) {
  const blogWithComments = await fetch(
    `http://localhost:3000/api/blogs/getallcomments`
  );
  console.log("blog with comments", blogWithComments);
  const blogWithCommentsData = await blogWithComments.json();
  const response = await fetch("http://localhost:3000/api/blogs");
  const data = await response.json();
  
  const totalBlogs = data.message.length
  return {
    props: {
      data,
      totalBlogs,
      blogWithCommentsData
    },
  };
}