import React, { useState } from "react";
import MainLayouts from "../../layouts/MainLayouts";
import { Button, Grid, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useInput } from "../../hooks/useInput";
import { ITrack } from "../../types/track";

const TrackPage = ({ serverTrack }) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const router = useRouter();
  const userName = useInput("");
  const userComment = useInput("");

  const addComment = async () => {
    try {
      const responce = await axios.post(
        "http://localhost:5000/tracks/comment",
        {
          user_name: userName.value,
          text: userComment.value,
          track_id: track._id,
        }
      );
      setTrack({ ...track, comments: [...track.comments, responce.data] });
      return responce.data;
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <MainLayouts title={"Media player tracks " + track.name}
    keywords={"composition, track, info" + track.artist + ' ' + track.name}
    >
      <Button
        style={{ fontSize: 32, border: "solid black 1px", minWidth: 200 }}
        variant="outlined"
        onClick={() => router.push("/tracks")}
      >
        To list
      </Button>
      <Grid container style={{ margin: "20px 0" }}>
        <img
          src={"http://localhost:5000/" + track.picture}
          alt="track-image"
          width={200}
          height={200}
        />
        <div style={{ marginLeft: 30 }}>
          <h3>Title - {track.name}</h3>
          <h3>Artist - {track.artist}</h3>
          <h3>Listens - {track.listens}</h3>
        </div>
      </Grid>
      <h2>Words in track</h2>
      <p>{track.text}</p>
      <h2>Comments</h2>
      <Grid container>
        <TextField {...userName} label={"Your name"} fullWidth />
        <TextField
          {...userComment}
          label={"Comment"}
          fullWidth
          multiline
          rows={4}
        />
        <Button onClick={addComment}>Send</Button>
      </Grid>
      <div>
        {track.comments.map((comment) => (
          <div>
            <div>Author: {comment.user_name}</div>
            <p>Message: {comment.text}</p>
          </div>
        ))}
      </div>
    </MainLayouts>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const responce = await axios.get("http://localhost:5000/tracks/" + params.id);
  return {
    props: {
      serverTrack: responce.data,
    },
  };
};
