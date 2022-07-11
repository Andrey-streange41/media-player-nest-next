import React from "react";
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Card
} from "@material-ui/core";

interface IStepWrapper {
  activeStep: number;
}

const steps = ["TrackInfo", "Wrapper download", "Upload file"];

const StepWrapper: React.FC<IStepWrapper> = ({ activeStep, children }) => {
  return (
    <Container>
      <Stepper>
        {steps.map((step, index) => (
          <Step key={index} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container justifyContent="center" style={{margin:"70px 0px", height:270}}>
        <Card style={{width:600}}>
           { children}
        </Card>
      </Grid>
    </Container>
  );
};

export default StepWrapper;
