import Link from "next/link";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const index = ({ popularBlogs }) => {

  console.log("popular Blogs", popularBlogs?.message);
  const evenBlogs = popularBlogs.message.filter((index) => index % 2 !== 0);
  console.log("Even Blogs",evenBlogs)

  const settings2 = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 995,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 658,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  function SampleNextArrow() {
    return <div style={{ display: "none" }} />;
  }

  function SamplePrevArrow() {
    return <div style={{ display: "none" }} />;
  }
  return (
    <>
      <div className="popular-blogs">
        <div className="popular-heading">
          <h1>MOST POPULAR</h1>
        </div>
        <div className="popular-cards">
          <Slider {...settings2}>
            {evenBlogs.map((v) => (
              <div key={v._i}>
                <div className="pad-main">
                <div  className="popular-single-card">
                  <div className="popular-card-img">
                    <img src={v.picture} alt="" />
                  </div>
                  <div className="popular-card-content">
                    <div className="popular-category-batch">
                      <span>{v.category}</span>
                    </div>
                    <div className="popular-blog-title">
                      <h3>
                        <Link href={`/blog/${v.slug}`}>{v.title}</Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            ))}

          </Slider>
        </div>
      </div>
    </>
  );
};
export default index;
