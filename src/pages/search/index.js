import React, { useState, useEffect } from "react";
import Sidebar from "@/pages/components/sidebar";
import Link from "next/link";
const index = (searchData) => {
 
  console.log("dfgjvfcnh", searchData.searchData.message)
  const searchResult = searchData.searchData.message
  // console.log(searchResult.category)
 
  function createMarkup(c) {
    return { __html: c };
  }

  const category = [
    {
      title: "sdfghjhgf",
      category: "dfcgvfc",
      comments: "5",
      picture: "/assets/blogPosts.jpg",
      paragraph: "dfghjhgfdghj",
      author: "dfghjhkjhgf",
    },
    {
      title: "sdfghjhgf",
      category: "dfcgvfc",
      comments: "5",
      picture: "/assets/blogPosts.jpg",
      paragraph: "dfghjhgfdghj",
      author: "dfghjhkjhgf",
    },
    {
      title: "sdfghjhgf",
      category: "dfcgvfc",
      comments: "5",
      picture: "/assets/blogPosts.jpg",
      paragraph: "dfghjhgfdghj",
      author: "dfghjhkjhgf",
    },
    {
      title: "sdfghjhgf",
      category: "dfcgvfc",
      comments: "5",
      picture: "/assets/blogPosts.jpg",
      paragraph: "dfghjhgfdghj",
      author: "dfghjhkjhgf",
    },
  ];
  return (
    <>
 
      <div className="search-page">
        <div className="search-header">
          <div className="results-count">
            <span key={searchResult._i}>{searchResult.length} RESULTS</span>
          </div>
          {/* <div className="search-category">
            <h2>{searchResult.category}</h2>
          </div> */}
        </div>

        {searchResult && searchResult.length > 0 ? (
          <div className="search-content">
            {searchResult.map((v) => (
              <div key={v._i}>
                <div className="blogs-posts-card">
                  <div className="blogs-post-content">
                    <div className="blogs-posts-categories">
                      <span>{v.category}</span>
                    </div>
                    <div className="blogs-posts-title">
                      <h1>
                        <Link href={`/blog/${v.slug}`}>{v.title}</Link>
                      </h1>
                    </div>
                    <div className="blogs-comment">
                      <span className="comment-date">{new Date(v.createdAt).toDateString()} - </span>{" "}
                      <span className="count-comments">
                        {" "}
                        {v.comments.length} COMMENTS
                      </span>
                    </div>
                    <div className="search-blogs-image">
                      <img src={v.picture} alt="" />
                    </div>
                    <div className="blogs-content">
                      <div
                        dangerouslySetInnerHTML={createMarkup(
                          v.discription
                            ? `${v.discription.slice(0, 150)}${
                                v.discription.length > 150 ? "..." : ""
                              }`
                            : ""
                        )}
                      ></div>
                    </div>
                    <div className="readmore-button">
                      <button>
                        <Link href={`/blog/${v.slug}`}>Read More</Link>
                      </button>
                    </div>
                  </div>
                  <div className="blogs-post-author">
                    <div className="author-name">
                      <span>By</span> <span className="name">{v.author}</span>
                    </div>
                    <div className="author-social-contacts">
                      <div className="author-social-icons">
                        <a href="https://www.facebook.com/azka.rashid.965?mibextid=ZbWKwL">
                          <i class="fa-brands fa-facebook-f fa-lg"></i>
                        </a>
                      </div>
                      <div className="author-social-icons">
                        <a href="https://www.instagram.com/invites/contact/?i=1xhpqqtvu175o&utm_content=d52apfc">
                          <i class="fa-brands fa-instagram fa-lg"> </i>
                        </a>
                      </div>
                      <div className="author-social-icons">
                        <a href="https://twitter.com/Azka61714">
                          <i class="fa-brands fa-x-twitter fa-lg"> </i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              height: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                textAlign: "center",
                fontSize: "30px",
                fontWeight: "600px",
              }}
            >
              No Results Found!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default index;

export async function getServerSideProps(context) {
  const { category } = context.query;
  const searchResponse = await fetch(
    `http://localhost:3000/api/search?category=${category}`
  );
  const searchData = await searchResponse.json();
  console.log("sdfgh", searchData);
  // const searchResult = searchData.message || [];
  // console.log("Azka rAS",searchResult)
  return {
    props: {
      searchData,
     
    },
  };
}
