import React from "react";
import { Grid,Card,Button,Box} from "@material-ui/core";
import { useRouter } from "next/router";
import { MainLayouts } from "../../layouts/MainLayouts";
import TrackCollection from "../../components/TrackList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fetchTracks } from "../../store/actionsCreator/track";
import {NextThunkDispatch, wrapper} from "../../store";

export const Index = () => {
    const router = useRouter();
    const { tracks, error} = useTypedSelector((state)=> state.track);
   
    if(error){
        return <MainLayouts>
            <h1>{error}</h1>
        </MainLayouts>
    }
  return (
    <MainLayouts title={"Media player " + "tracks"}
      keywords={"track list , listen track, create track"}
    > 
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Track list</h1>
              <Button onClick={()=>router.push('/tracks/create')}>Download</Button>
            </Grid>
          </Box>
          <TrackCollection tracks={tracks}/>
        </Card>
      </Grid>
    </MainLayouts>
  );
};

export default Index;


export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
  const dispatch = store.dispatch as NextThunkDispatch
  await dispatch(await fetchTracks())
})
