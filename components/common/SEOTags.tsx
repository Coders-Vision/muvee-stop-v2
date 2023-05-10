import React from "react";

type Tags = {
  title?: string;
  description: string;
  keywords?: string;
  robots?: string;
  revist?: string;
  ogTitle: string;
  ogDescription: string;
  ogType?: string;
  ogUrl?: string;
  ogImage?: string;
  ogImageType?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  twitterTitle: string;
  twitterUrl?: string;
  twitterDescription: string;
  twitterImage?: string;
};

function SEOTags({
  title="",
  description,
  keywords = "",
  robots = "index,follow",
  revist = "1 days",
  ogTitle,
  ogDescription,
  ogType = "website",
  ogUrl = "",
  ogImage = "",
  ogImageType = "image/png",
  ogImageWidth = 650,
  ogImageHeight = 350,
  twitterTitle,
  twitterUrl = "",
  twitterDescription,
  twitterImage = "",
}: Tags) {
  return (
    <>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* <title>{title} </title> */}
      <meta name="title" content={title} />
      <meta name="description" content={description || ""} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta name="revisit-after" content={revist} />
      <meta name="author" content={"Abdullah Basha"} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />

      <meta property="og:image" content={ogImage} />
      <meta property="og:image:type" content={`${ogImageType}`} />
      <meta property="og:image:width" content={`${ogImageWidth}`} />
      <meta property="og:image:height" content={`${ogImageHeight}`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={twitterUrl} />
      <meta property="twitter:title" content={twitterTitle} />
      <meta property="twitter:description" content={twitterDescription} />
      <meta property="twitter:image" content={twitterImage} />
    </>
  );
}

export default SEOTags;
