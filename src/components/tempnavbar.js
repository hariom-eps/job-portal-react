import React from "react";
import "../../src/css/style.css";
import { Link } from "react-router";

export default function Tempnavbar() {
  return (
    <div>
      <div class="container">
        <Link class="navbar-brand" to={'/'}>
          <img
            src="http://ls.bizbybot.com/front/images/logo/logo.png"
            alt="Logo"
            class="img-fluid"
            width="60"
            height="60"
          />
        </Link>
        <div class="mob-bar-and-pro-img-div">
          <button
            class="navbar-toggler mob-nav-bar-btn"
            type="button"
            fdprocessedid="h3ldjl"
          >
            <svg
              id="mobBars"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg') }}"
            >
              <path
                d="M13 21V17H22V21H13ZM9 7V3H22L22 7L9 7ZM3 14V10L22 10V14L3 14Z"
                fill="#fff"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
