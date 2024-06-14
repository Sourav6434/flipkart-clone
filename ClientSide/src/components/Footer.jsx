import React from "react";
import { NavLink } from "react-router-dom";
import "../css/Footer.css";

export default function Footer() {
  return (
    <>
      <footer className="footer-distributed">
        <div className="footer-left">
          <h3>
            Flipkart <span>plus</span>
          </h3>

          <p className="footer-links">
            <NavLink to="/">Home</NavLink>

            <a href="#">Blog</a>

            <a href="#">About</a>

            <a href="#">Faq</a>

            <a href="#">Contact</a>
          </p>

          <p className="footer-company-name">Flipkart website © 2024</p>
        </div>

        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>
              <span>DTP TechPark</span> Banglore, India
            </p>
          </div>

          <div>
            <i className="fa fa-phone"></i>
            <p>+91 9090932010</p>
          </div>

          <div>
            <i className="fa fa-envelope"></i>
            <p>
              <a href="mailto:support@company.com">support@DCX.com</a>
            </p>
          </div>
        </div>

        <div className="footer-right">
          <p className="footer-company-about">
            <span>About the company </span>: Flipkart's vision is to create a
            world-class e-commerce platform that enables sellers and consumers
            to connect and transact seamlessly. Their mission revolves around
            providing customers with a delightful shopping experience through
            innovation, technology, and customer-centricity.
          </p>

          <div className="footer-icons">
            <a href="#">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="#">
              <i className="fa fa-github"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
