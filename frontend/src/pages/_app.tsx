import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import createUploadLink from "apollo-upload-client/public/createUploadLink.js";
import "focus-visible/dist/focus-visible";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import theme from "../theme";

const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

const client = new ApolloClient({
  link: createUploadLink({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: "include",
  }),
  credentials: "include",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <link rel="shortcut icon" href="/sikendis.ico" />
        <title>Sikendis</title>
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <Global styles={GlobalStyles} />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
