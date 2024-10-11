import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Sidebar from "@/pages/components/sidebar/index";
import Link from "next/link";
import Comments from "@/models/comments";

const singleBlog = ({ data, latestBlogs, singleBlog, relatedPosts }) => {
  const { singleblog, commentssingle } = singleBlog.message;
  console.log("hi blog", singleblog);


  const commentsContainerRef = useRef(null); 
  const [items, setItems] = useState(3);
  const slice = commentssingle.slice(0, items);
  console.log("Sliced", slice);
  const loadMore = () => {
    setItems(items + 2);
    if (commentsContainerRef.current) {
      commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
    }
  };
  const currentDate = new Date();
  const inputDate = new Date(commentssingle.createdAt).toDateString();

  const timeDifference = currentDate - inputDate;

  // Calculate the number of milliseconds in a year
  const millisecondsInYear = 1000 * 60 * 60 * 24 * 365;

  // Calculate the number of years
  const yearsAgo = Math.floor(timeDifference / millisecondsInYear);

  // if (comments && comments.createdAt) {
  //   const createdAtDate = parseISO(comments.createdAt);
  //   const yearsAgo = formatDistanceToNow(createdAtDate, { addSuffix: true, unit: 'year' });
  //   console.log("Posted", yearsAgo);
  // }
  console.log("related posts", relatedPosts);
  console.log("single blog Comments", singleblog?.message);
  function createMarkup(c) {
    return { __html: c };
  }
  console.log("single blog sidebar", data.message);

  const [loader, setloader] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    comments: "",
  });
  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // useEffect(() => {
  //   // Assume you have a function to fetch comments from the server
  //   const fetchComments = async () => {
  //     try {
  //       const response = await axios.get('/api/blogs/getallcomments');
  //       setComments(response.data.message);
  //       const yearsAgo = formatDistanceToNow(response.data.message.createdAt, { addSuffix: true, unit: 'year' });
  //       console.log(`Posted ${yearsAgo}`);
  //       console.log("fetch response", response.data.message)
  //     } catch (error) {
  //       console.error('Error fetching comments:', error);
  //     }
  //   };

  //   fetchComments();
  // }, []);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setloader(true);
      if (singleblog && singleblog._id) {
        const data = {
          blogId: singleblog._id,
          name: credentials.name,
          email: credentials.email,
          comments: credentials.comments,
        };

        const response = await axios.post(`/api/blogs/comments`, data);
        if (response && response.data && response.data.success) {
          // Update the comments state for the single blog
          setCredentials({
            ...singleblog,
            commentssingle: [...commentssingle, response.data.comment],
          });

          setCredentials({
            name: "",
            email: "",
            comments: "",
          });
          toast.success("Comment Posted Successfully!");
        }
      } else {
        toast.error("Invalid blog post or no comments available.");
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    } finally {
      setloader(false);
    }
  };
  useEffect(() => {
    // Use the ref to access the comments container
    const commentsContainer = commentsContainerRef.current;

    if (commentsContainer) {
      const handleScroll = () => {
        // Check if the user has scrolled to the bottom
        if (
          commentsContainer.scrollHeight - commentsContainer.scrollTop ===
          commentsContainer.clientHeight
        ) {
          // Load more comments when scrolled to the bottom
          loadMore();
        }
      };

      commentsContainer.addEventListener('scroll', handleScroll);

      return () => {
        commentsContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [items]);
  return (
    <>
      <div className="container">
        <div className="single-hero-blogs-post">
          <Toaster></Toaster>
          <div className="single-blog-post-hero-card">
            <div className="single-hero-blog-post-img">
              <img src={singleblog.picture} />
            </div>
            <div className="single-hero-blog-post-content">
              <div className="single-blog-post-category-batch">
                <span>{singleblog.category}</span>
              </div>
              <div className="single-hero-blog-post-title">
                <h1>
                  <Link href="/">{singleblog.title}</Link>
                </h1>
              </div>
              <div className="single-hero-blog-post-author-date">
                <span className="author-name">By {singleblog.author}</span>
                <span className="comment-date">
                  {new Date(singleblog.createdAt).toDateString()} -{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="single-blogs-posts-grid">
          <div className="single-blogs-post-content-cards">
            <div
              className="blogs-content"
              dangerouslySetInnerHTML={createMarkup(singleblog.discription)}
            ></div>
            <div className="single-blog-post-admin-details">
              <div className="admin-img">
                <img src={"/assets/author/admin-avatar.jpg"} alt="" />
              </div>
              <div className="admin-name">
                <h3>Azka Rashid</h3>
              </div>
              <div className="admin-info">
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et.
                </p>
              </div>
              <div className="admin-social-contacts">
                <div className="admin-social-icons">
                  <a href="https://www.facebook.com/azka.rashid.965?mibextid=ZbWKwL">
                    <i class="fa-brands fa-facebook-f"></i>
                  </a>
                </div>
                <div className="admin-social-icons">
                  <a href="https://www.instagram.com/invites/contact/?i=1xhpqqtvu175o&utm_content=d52apfc">
                    <i class="fa-brands fa-instagram"> </i>
                  </a>
                </div>
                <div className="admin-social-icons">
                  <a href="https://twitter.com/Azka61714">
                    <i class="fa-brands fa-x-twitter"> </i>
                  </a>
                </div>
              </div>
            </div>

            <div className="recent-posts">
              <div className="recent-posts-heading">
                <h3>Related Posts</h3>
              </div>
              <div className="recent-posts-grid">
                {relatedPosts.map((v) => (
                  <div key={v._i}>
                    <div className="recent-posts-single-card">
                      <div className="recent-posts-img">
                        <img src={v.picture} alt="" />
                      </div>
                      <div className="recent-post-content">
                        <h3>
                          <Link href={`/blog/${v.slug}`}>{v.title}</Link>
                        </h3>
                      </div>
                      <div className="recent-post-date">
                        <span>{new Date(v.createdAt).toDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="single-blog-post-comment-view">
              <div className="comment-view-heading">
                <h3>{commentssingle.length} Comments</h3>
                <hr />
              </div>
              <div className="overflow">
                {commentssingle.length > 0 ? (
                  <div className="comments-blog">
                    {commentssingle.slice(0, items).map((v) => (
                      <div key={v._id}>
                        <div className="single-comment">
                          <div className="comment-img-center">
                            <div className="comment-img">
                              <img src="/assets/comment/dummy.jpg" alt="" />
                            </div>
                          </div>

                          <div className="comment-content">
                            <div className="comment-details">
                              <div className="comment-name">
                                <h4>{v.name}</h4>
                                <div className="comment-year">
                                  <span>
                                    {new Date(v.createdAt).toDateString()}
                                  </span>
                                </div>
                                {/* <div className="comment-year">
                              <span>{yearsAgo > 0 ? `${yearsAgo} ${yearsAgo === 1 ? 'year' : 'years'} ago` : 'Just now'}</span>
                            </div> */}
                              </div>

                              {/* <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div className="trash-icon">
                                  <i
                                    style={{ color: "red" }}
                                    className="fa-solid fa-trash-can"
                                  ></i>
                                </div>
                                <div className="reply-form">
                                  <Link href="/reply">Reply</Link>
                                </div>
                              </div> */}
                            </div>

                            <div className="comment-review">
                              <p>{v.comments}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {items <= commentssingle.length ? (
                      <div className="load-more-comments">
                        <span>
                          Show More
                          <i
                            className="fa-solid fa-angle-down fa-lg"
                            onClick={loadMore}
                          ></i>
                        </span>
                      </div>
                    ) : (
                      <div style={{display : "flex", alignItems : "center", justifyContent : "center", margin : "20px"}}>
                        <span>No More Comments</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ margin: "20px 0" }}>
                    {" "}
                    <p style={{ textAlign: "center" }}>
                      No comments to show here
                    </p>{" "}
                  </div>
                )}
              </div>
            </div>
            <div className="comment-form">
              <div className="comment-form-heading">
                <h3>Write a Commment</h3>
                <hr />
              </div>

              <form onSubmit={handleSubmit}>
                <div className="comment-form-content">
                  <input
                    type="text"
                    placeholder="Name"
                    id="name"
                    name="name"
                    value={credentials.name}
                    onChange={onChange}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={onChange}
                  />
                  <textarea
                    type="text"
                    name="comments"
                    id="comments"
                    cols="30"
                    rows="10"
                    className="comment"
                    placeholder="Write a Comment"
                    value={credentials.comments}
                    onChange={onChange}
                  />
                </div>
                <div className="comment-form-btn">
                  <button disabled={loader}>
                    {loader ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="blog-sidebar">
            <Sidebar sideBlogs={data} latest={latestBlogs} />
          </div>
        </div>
      </div>
    </>
  );
};

export default singleBlog;

export async function getServerSideProps({ params, page }) {
  const singleResponse = await fetch(
    `http://localhost:3000/api/blogs/${params.slug}`
  );

  const singleData = await singleResponse.json();

  const response = await fetch("http://localhost:3000/api/blogs");
  const data = await response.json();

  const latestBlogs = Array.isArray(data.message) ? data.message.slice(-4) : [];
  const relatedPosts =
    data.message.length > 0 ? [data.message[4], data.message[8]] : [];
  return {
    props: {
      data,
      latestBlogs,
      singleBlog: singleData,
      relatedPosts,
    },
  };
}
