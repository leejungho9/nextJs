//md 파일을 데이터로 만드는 코드

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

//node 명령을 호출
const postsDirectory = path.join(process.cwd(), "posts");
console.log("process.cwd()", process.cwd());
console.log("postsDirectory", postsDirectory);

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  //["pre-rendering.md, ..."];

  const allPostsData = fileNames.map((fileNames) => {
    const id = fileNames.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileNames);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}
