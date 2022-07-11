import React from "react";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import { Container } from "@material-ui/core";
import Head from 'next/head';


interface MainLayoutProps{
  title ?: string;
  description : string;
  keywords?:string;
}

export const MainLayouts: React.FC<MainLayoutProps> = ({ children, title, description,keywords }) => {
  return (
    <>
     <Head>
      <title>{title || 'Media player'}</title>
      <meta name="desription" content={"In this place each can create and publish musical post "+description}/>
      <meta name="robots" content="index, follow"/>
      <meta name="keywords" content={keywords||"Music,tracks,create track, actors, compositor"}/>
     
      </Head>
      <Container className="list">
        <Navbar />
        {children}
      </Container>
      <Player />
      <style tsx>
        {`
                    .list{
                        margin-top:5%;
                    }
                `}
      </style>
    </>
  );
};

export default MainLayouts;
