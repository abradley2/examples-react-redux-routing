import React from "react";
import Link from "./components/Link";

export default function Home() {
  return (
    <div>
      <Link url="/posts/1">Post One</Link>
      <Link url="/posts/2">Post Two</Link>
      <Link url="/posts/300">Post Three</Link>
      <h3>Home Route</h3>
    </div>
  );
}
