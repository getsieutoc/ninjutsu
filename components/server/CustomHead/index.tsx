import Head from 'next/head';

const logo = '/favicon.ico';

export type CustomHeadProps = {
  title: string;
  description: string;
};

export const CustomHead = ({ title, description }: CustomHeadProps) => (
  <Head>
    <title>{title}</title>
    <link rel="icon" href={logo} />
    <link rel="shortcut icon" type="image/x-icon" href={logo} />
    <link rel="apple-touch-icon" sizes="180x180" href={logo} />
    <meta name="theme-color" content="#7b46f6" />

    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <meta itemProp="name" content={title} />
    <meta itemProp="description" content={description} />
    <meta itemProp="image" content={logo} />
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={logo} />
    <meta property="og:type" content="webproject" />
  </Head>
);
