import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";




const hero = ({ props }) => {
  console.log("All Blogs", props?.message);

  const settings = {
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  function SampleNextArrow() {
    return <div style={{ display: "none" }} />;
  }

  function SamplePrevArrow() {
    return <div style={{ display: "none" }} />;
  }
  return (
    <>
      <div className="hero-section">
        <Slider {...settings}>
          {props?.message.map((v, pascalCasetitle) => (
            <div key={v._i} className="hero-card">
              <div className="hero-single-blog">
                <img src={v.picture} />
                <div className="hero-blog-content">
                  <div className="category-batch">
                    <span>{v.category}</span>
                  </div>
                  <div className="hero-blog-title">
                    <h1>
                      <Link className="hero-title" href={`/blog/${v.slug}`}>
                     
                       {v.title}
                      </Link>
                    </h1>
                  </div>
                  <div className="hero-blog-author">
                    <span>{v.author}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default hero;
