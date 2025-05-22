// lib/meta
import Head from "next/head";

const usePresetMeta = () => {
  return <Head>
    <title>Permanence</title>
    <meta name="description" content="Experimenting the bounds of feasibility for interactivity and design." />
    <meta name="keywords" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:title" content="Permanence" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Permanence" />
    <meta property="og:description" content="Experimenting the bounds of feasibility for interactivity and design." />
    <meta property="og:url" content="permanence.vercel.app/cover.png" />
    <meta property="og:image" content={`permanence.vercel.app/cover.png`} />
    <link rel="icon" href="/favicon.ico" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Permanence" />
    <meta name="twitter:description" content="Experimenting the bounds of feasibility for interactivity and design." />
    <meta name="twitter:image" content={`$permanence.vercel.app/cover.png`} />
  </Head>
};

export default usePresetMeta;
