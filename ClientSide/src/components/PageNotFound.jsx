import React, { useEffect } from "react";
import "../css/PageNotFound.css";
import { useNavigate } from "react-router";

function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    // Assuming you want to remove a CSS class with a specific name
    let pnflogocls = document.querySelector(".nav-1");
    pnflogocls && pnflogocls.classList.add("pnflogo");

    let hidesrccls = document.querySelector(".search-container1");
    hidesrccls && hidesrccls.classList.add("hidesrc");

    let hidecls = document.querySelector(".nav-2");
    hidecls && hidecls.classList.add("hidden");

    let hidefootercls = document.querySelector(".footer-distributed");
    hidefootercls && hidefootercls.classList.add("hidden");

    return () => (
      // hiddencls && hiddencls.classList.remove("hidden"),
      pnflogocls && pnflogocls.classList.remove("pnflogo"),
      hidesrccls && hidesrccls.classList.remove("hidesrc"),
      hidecls && hidecls.classList.remove("hidden"),
      hidefootercls && hidefootercls.classList.remove("hidden")
    );
  }, []);
  return (
    <div className="page-not-found">
      <img
        className="pnfImg"
        src={process.env.PUBLIC_URL + "PageNotFound.png"}
        alt="pagenotfound"
      />
      <p className="pnftext">
        Unfortunately the page you are looking for has been moved or deleted
      </p>
      <button onClick={() => navigate("/")}>GO TO HOMEPAGE</button>
    </div>
  );
}

export default PageNotFound;
