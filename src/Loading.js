import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <section className="listing-main">
      <div className="listing loading">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
