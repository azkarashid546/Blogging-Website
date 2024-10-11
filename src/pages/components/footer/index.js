import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <>
      <div className="footer">
        <footer>
          <div className="footer-grid">
            <div className="footer-contact-details">
              <div className="blogger-info">
                <h3>Azka,Blogger</h3>
              </div>
              <div className="blogger-details">
                <span>Lalazar Canal View House # 312</span>
              </div>
              <div className="blogger-details">
                <span>03055358098</span>
              </div>
              <div className="blogger-details">
                <span>azkarashid196@gmail.com</span>
              </div>
            </div>
            <div className="footer-category">
              <div className="footer-category-heading">
                <h4>Category</h4>
              </div>
              <div className="footer-category-grid">
                <div className="category-grid">
                  <ul>
                    <li>
                      <Link href="/blog">Technology</Link>
                    </li>
                    <li>
                      <Link href="/blog">Travel</Link>
                    </li>
                    <li>
                      <Link href="/blog">Food</Link>
                    </li>
                  </ul>
                </div>
                <div className="category-grid">
                    <ul>
                    <li>
                      <Link href="/blog">Photography</Link>
                    </li> 
                    <li>
                      <Link href="/blog">Fashion</Link>
                    </li>
                    <li>
                      <Link href="/blog">Trending</Link>
                    </li>
                    </ul>
                </div>
              </div>
            </div>
            <div className="footer-social-contacts">
                <div className="footer-social-contacts-heading">
                    <h4>Follow us
                    </h4>
                </div>
                <div className="footer-social-contact-icons">
                <div className="footer-contacts-icon">
                <a href="https://www.facebook.com/azka.rashid.965?mibextid=ZbWKwL"><i class="fa-brands fa-facebook-f fa-lg"></i></a>
                </div>
                <div className="footer-contacts-icon">
                <a href="https://www.instagram.com/invites/contact/?i=1xhpqqtvu175o&utm_content=d52apfc"><i class="fa-brands fa-instagram fa-lg"></i></a>
                </div>
                <div className="footer-contacts-icon">
                <a href="https://twitter.com/Azka61714"><i class="fa-brands fa-x-twitter fa-lg"></i></a>
                </div>
                </div>
              
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default index;
