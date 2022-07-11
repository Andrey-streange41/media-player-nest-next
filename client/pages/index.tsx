import React from 'react';
import { MainLayouts } from '../layouts/MainLayouts';


const Home  = () => {
  return (
    <>
     <MainLayouts>
        <div className='center'>
          <h1>Welcome home</h1>
          <h3>Here collected wondefull tracks </h3>
        </div>
      </MainLayouts> 
      <style jsx>
        {
          `
            .center{
              margin-top:150px;
              display:flex;
              flex-direction:column;
              align-items:center;
              justify-content:center;
            }
          `
        }
      </style>
      </>
  )
}

export default Home
