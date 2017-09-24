import React from "react";
import Link from "./components/Link";

export default function Post({ state }) {
  return (
    <div>
      <Link url="/home">Home</Link>
      <h3>Post route</h3>
      <span>Post id = {state.route.params.postId}</span>
    </div>
  );
}
