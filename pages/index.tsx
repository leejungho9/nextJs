import Head from "next/head";
import Link from "next/link";
import homeStyles from "../styles/Home.module.css";
import { getSortedPostsData } from "../lib/posts";
import { GetStaticProps } from "next";

const Home = ({ allPostData }) => {
  console.log(allPostData);
  return (
    <div>
      <Head>
        <title>John Ahn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={homeStyles.headingMd}>
        <p>[John Ahn Introduction]</p>
        <p>(This is a website)</p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}></ul>
        {allPostData.map(({ id, title, date }) => (
          <li className={homeStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <p>{title}</p>
            </Link>
            <br />
            <small className={homeStyles.lightText}>{date}</small>
          </li>
        ))}
      </section>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const allPostData = getSortedPostsData();

  return {
    props: {
      allPostData,
    },
  };
};
