import React from "react";
import BlogsPosts from "@/pages/components/home/section/blogs/blogs";
import Sidebar from '@/pages/components/sidebar/index'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
const index = ({blog, first, remainingBlogs, latestBlogs, commentssingle}) => {
  return (
    <>
      <div className="blogs-section">
        <div className="grid-section">
          <div className="blogs-posts">
            <BlogsPosts first={first} discription = {first.discription} remaining = {remainingBlogs} commentssingle={commentssingle}/>
          </div>

          <div className="blogs-sidebar">
            <Sidebar sideBlogs = {blog} latest = {latestBlogs}/>
          </div>
        </div>
      </div>
    </>
  );
};
export async function getServerSideProps() {
  try {
    const first = await blog.findOne().exec();

    if (!first) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        first: JSON.parse(JSON.stringify(first)),
      },
    };
  } catch (error) {
    console.error('Error fetching first blog data:', error.message);
    return {
      notFound: true,
    };
  }
}
export default index;
