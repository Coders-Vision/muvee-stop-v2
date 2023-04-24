import React from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/Layout";

function index() {
  return (
    <>
      <Head>
        <title>Muvee Stop | Series</title>
        <meta name="description" content="" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout headerClasses="block">
        <h1>Series Page</h1>
      </Layout>
    </>
  );
}

export default index;
