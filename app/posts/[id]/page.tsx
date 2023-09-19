import React from "react";

async function getPost(postId: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/posts/records/${postId}`,
    // 캐시된 데이터를 일정 간격으로 재검증
    { next: { revalidate: 10 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
const PostDetailPage = async ({ params }: any) => {
  const post = await getPost(params.id);
  return (
    <div>
      <h1>posts/{post.id}</h1>
      <div>
        <h3>{post.title}</h3>
        <p>{post.created}</p>
      </div>
    </div>
  );
};

export default PostDetailPage;
