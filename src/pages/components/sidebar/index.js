import React , {useState} from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";


const index = ({sideBlogs, latest}) => {
  console.log("sideBlogs" , sideBlogs)
  console.log("latest Blogs",latest)
   

  const oddBlogs = sideBlogs.message ? sideBlogs.message.filter((index) => index % 2 !== 0) : [];
  console.log("sadfghgfd",oddBlogs)
  const settings4 = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  function SampleNextArrow() {
    return <div style={{ display: "none" }} />;
  }

  function SamplePrevArrow() {
    return <div style={{ display: "none" }} />;
  }
  
 
  const [credentials, setCredentials] = useState({email : ""})
  const [loader, setloader] = useState(false);

  const handleOncahange = (e) => {
    setCredentials({...credentials, [e.target.name] : e.target.value})
  }
  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      setloader(true)
      const response = await axios.post("/api/newsletter", {
        ...credentials
      })
      response && setCredentials({email : ""})
    }
    catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    } finally {
      setloader(false);
    }

  }
  const instapost = [
    {
      picture: "/assets/instagramposts/instapost.jpg",
    },
    {
      picture: "/assets/instagramposts/instapost.jpg",
    },
    {
      picture: "/assets/instagramposts/instapost.jpg",
    },
    {
      picture: "/assets/instagramposts/instapost.jpg",
    },
    {
      picture: "/assets/instagramposts/instapost.jpg",
    },
    {
      picture: "/assets/instagramposts/instapost.jpg",
    },
  ];
 
  return (
    <>


      <div className="sidebar-cards">
        <Slider {...settings4}>
          {oddBlogs.map((blog) => (
            <div key={blog._i}>
              <div className="sidebar-single-card">
                <div className="sidebar-single-card-img">
                  <img src={blog.picture} alt="" />
                  <div className="sidebar-single-card-content">
                    <div className="sidebar-single-card-category">
                      <span>{blog.category}</span>
                    </div>
                    <div className="sidebar-single-card-title">
                      <h3>
                        <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                      </h3>
                    </div>
                    <div className="sidebar-single-card-date">
                      <span>{new Date(blog.createdAt).toDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="about-sidebar">
        <div className="about-sidebar-heading">
          <h3>About</h3>
        </div>
        <div className="sidebar-pad-main">
          <div className="about-sidebar-image">
            <img src="/assets/aboutSidebar/about-side.jpg" alt="" />
          </div>
          <div className="about-sidebar-content">
            <p>
              I'm Azka, a girly girl and lover of life. Join me on the journey
              to find latest in fashion.
            </p>
          </div>
          <div className="about-sidebar-button">
            <button>
              <Link href="/about">Read More</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="social-contacts">
        <div className="social-contacts-heading">
          <h3>Connect & Follows</h3>
        </div>
        <div className="social-contacts-icons">
          <div className="social-icons">
            <a href="https://www.facebook.com/azka.rashid.965?mibextid=ZbWKwL">
              <i class="fa-brands fa-facebook-f fa-lg"></i>
            </a>
          </div>
          <div className="social-icons">
            <a href="https://www.instagram.com/invites/contact/?i=1xhpqqtvu175o&utm_content=d52apfc">
              <i class="fa-brands fa-instagram fa-lg"> </i>
            </a>
          </div>
          <div className="social-icons">
            <a href="https://twitter.com/Azka61714">
              <i class="fa-brands fa-x-twitter fa-lg"> </i>
            </a>
          </div>
          <div className="social-icons">
            <a href="https://pin.it/D30hzcs">
              <i class="fa-brands fa-pinterest-p fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="sidebar-newsletter">
        <div className="sidebar-newsletter-heading">
          <h3>Newsletter</h3>
          <hr />
        </div>
        <div className="sidebar-newsletter-content">
          <p>
            Subscribe to our newsletter for exclusive content and all of the
            behind the scenes details.
          </p>
        </div>
        <div className="newsletter-form">
          <form>
            <input
              type="email"
              placeholder="Your Email Address"
              name="email"
              id="email"
              value={credentials.email}
              onChange={handleOncahange}
            />
            <div className="newsletter-btn">
              <button onClick={handleSubmit} disabled = {loader}> {loader ? "Subscribed" : "Subscribe"}</button>
            </div>
          </form>
        </div>
      </div>
      <div className="sidebar-instagarm-posts">
        <div className="instagram-posts-heading">
          <h3>Instagram</h3>
        </div>
        <div className="instagram-posts-grid">
          {instapost.map((v, i) => (
            <div key={i}>
              <div className="instagarm-posts-img">
                <img src={v.picture} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sidebar-latest-posts">
        <div className="sidebar-latest-post-heading">
          <h3>Latest Post</h3>
        </div>
        <div className="latest-post-blogs">
          {latest.map((v) => (
            <div key={v._i}>
              <div className="latest-post-grid">
                <div className="latest-post-img">
                  <img src={v.picture} alt="" />
                </div>
                <div className="latest-post-content">
                  <div className="latestpost-post-title">
                    <h3>
                      <Link href={`/blog/${v.slug}`}>{v.title}</Link>
                    </h3>
                  </div>
                  <div className="latest-post-date">
                    <span>{new Date(v.createdAt).toDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sidebar-categories">
        <div className="sidebar-categories-heading">
          <h3>Categories</h3>
        </div>
        <div className="sidebar-categories-content">
          <ul>
            <li><Link href="/blog">Fashion</Link></li>
            <li><Link href="/blog">Food</Link></li>
            <li><Link href="/blog">Headline</Link></li>
            <li><Link href="/blog">Photography</Link></li>
            <li><Link href="/blog">Post Format</Link></li>
            <li><Link href="/blog">Technology</Link></li>
            <li><Link href="/blog">Travel</Link></li>
            <li><Link href="/blog">Trending</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default index;
