import React, { useState } from 'react'
import FileUpload from '../../components/FileUpload'
import StepWrapper from '../../components/StepWrapper'
import MainLayouts from '../../layouts/MainLayouts'
import { Button, Grid, TextField } from "@material-ui/core"
import { useInput } from '../../hooks/useInput'
import axios from 'axios'
import { useRouter } from 'next/router'





const Create = props => {
    const [activeStep, setActiveStep] = useState(0);
    const [picture,setPicture] = useState('');
    const [audio, setAudio] = useState('');
    const name  = useInput('');
    const artist = useInput('');
    const text = useInput('');
    const router = useRouter();

    const back = () =>{
        const minStep = 0;
        setActiveStep(Math.max(activeStep - 1, minStep));
    }
    const next = () => {
       if(activeStep===2){
            const formData = new FormData();
            formData.append("name",name.value);
            formData.append("artist",artist.value);
            formData.append("text",text.value);
            formData.append("picture",picture);
            formData.append("audio",audio);
            axios.post("http://localhost:5000/tracks",formData).then(res=>{
                router.push('/tracks')
            }).catch(err=>{
                console.log(err.message)
            });
            console.log('FAILD')
            return;
        }
        const maxStep = 3;
        setActiveStep(Math.min(activeStep + 1, maxStep))
        
    }
    
    
  return (
    <MainLayouts>
            <StepWrapper activeStep={activeStep}>
                {
                    activeStep === 0 && 
                    <Grid container direction={"column"} style={{padding:20}}>
                        <TextField style={{marginTop:15}} label={'Track name'} {...name} />
                        <TextField style={{marginTop:15}} label={'Track author' } {...artist} />
                        <TextField style={{marginTop:15}} label={'Track text'} multiline rows={3} {...text} />
                    </Grid>
                }
                {
                    activeStep === 1 && 
                    <FileUpload setFile={setPicture} accept={'image/*'}>
                        <Button>Set image wrapper</Button>
                    </FileUpload>
                }
                {
                    activeStep === 2 && 
                    <FileUpload  setFile={setAudio} accept={'audio/*'}>
                        <Button>Set video</Button>
                    </FileUpload>
                }
                {
                    activeStep === 3 && <h1>STEP3</h1>
                }
            </StepWrapper>
            <Grid container justifyContent='space-between'>
                <Button onClick={(e)=>{back()}}>Back</Button>
                <Button onClick={(e)=>{next()}}>Next</Button>
            </Grid>
    </MainLayouts>
  )
}


export default Create