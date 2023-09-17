import React from "react";

const Post = () => {
  return <div> [id]</div>;
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
};
