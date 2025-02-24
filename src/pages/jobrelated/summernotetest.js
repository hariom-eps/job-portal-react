import React, { useEffect } from "react";
import $ from "jquery";
import "summernote/dist/summernote-lite.css";
import "summernote/dist/summernote-lite.js";

const Summernotetest = () => {
  useEffect(() => {
    $("#editor").summernote({
      placeholder: "Type here...",
      tabsize: 2,
      height: 200,
    });

    return () => {
      $("#editor").summernote("destroy"); // Cleanup
    };
  }, []);

  return (
    <div>
      <h2>Summernote in React</h2>
      <div id="editor"></div>
    </div>
  );
};

export default Summernotetest;