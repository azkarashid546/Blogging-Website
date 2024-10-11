import Link from "next/link";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const blogs = ({ first, discription, remaining, data, commentssingle }) => {
  // const remainingDiscription = remaining.discription ? remaining.discription.slice(0,6) : ""
  function createMarkup(c) {
    return { __html: c };
  }
  console.log("remaining Blog", remaining);
  console.log("hello first blog", first);

  const paragraphs = discription.split("\n");
  console.log("para", paragraphs);

  const [items, setItems] = useState(5);
  const slice = remaining.slice(0, items);
  console.log("Sliced", slice)
  const loadMore = () => {
    setItems(items + 7);
  };
  // const firstBlogComments = first.comments.length
  // const remainingBlogComments = remaining.comments.length

  // console.log("first Comment", firstBlogComments)
  
  return (
    <>
      <div className="blogs-posts-card">
        <div className="blogs-post-content">
          <div className="blogs-posts-categories">
            <span>{first.category}</span>
          </div>
          <div className="blogs-posts-title">
            <h1>
              <Link href={`/blog/${first.slug}`}>{first.title}</Link>
            </h1>
          </div>
          <div className="blogs-comment">
            <span className="comment-date">
              {new Date(first.createdAt).toDateString()} -{" "}
            </span>{" "}
            <span className="count-comments">{first.comments.length} COMMENTS</span>
          </div>
          <div className="blogs-image">
            <img src={first.picture} alt="" />
          </div>
          <div className="blogs-content">
            {paragraphs.map((paragraph, index) => (
              <div
                key={index}
                dangerouslySetInnerHTML={createMarkup(paragraph)}
              ></div>
            ))}
          </div>
          <div className="readmore-button">
            <button>
              <Link href={`/blog/${first.slug}`}>Read More</Link>
            </button>
          </div>
        </div>
        <div className="blogs-post-author">
          <div className="author-name">
            <span>By</span> <span className="name">{first.author}</span>
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
      <div className="blogs-post-grid">
        {slice.map((v) => (
          <div key={v._i}>
            <div className="blogs-post-card">
              <div className="blogs-post-grid-content">
                <div className="blogs-post-grid-image">
                  <img src={v.picture} alt="" />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="blogs-posts-grid-categories">
                    <span>{v.categories}</span>
                  </div>
                  <div className="blogs-posts-grid-title">
                    <h1>
                      <Link href={`/blog/${v.slug}`}>{v.title}</Link>
                    </h1>
                  </div>
                  <div className="blogs-post-grid-comment">
                    <span className="comment-date">
                      {" "}
                      {new Date(v.createdAt).toDateString()}-{" "}
                    </span>
                    <span className="count-comments"> {v.comments.length} COMMENTS</span>
                  </div>
                  <div className="blogs-posts-grid-content">
                    <div className="blogs-posts-grid-content">
                      <div
                        className="description"
                        dangerouslySetInnerHTML={createMarkup(
                          v.discription
                            ? `${v.discription.slice(0, 150)}${
                                v.discription.length > 150 ? "..." : ""
                              }`
                            : ""
                        )}
                      ></div>
                    </div>
                  </div>

                  <div className="blogs-posts-grid-readmore-button">
                    <button>
                      <Link href={`/blog/${v.slug}`}>Read More</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="loading-more-btn">
        <button onClick={loadMore}>Load More</button>
      </div>
    </>
  );
};

export default blogs;
