import React from 'react';

interface ITrackProgres{
    left:number,
    right:number,
    onChange:void
}

const TrackProgres: React.FC<ITrackProgres> = ({left,right,onChange}) => {
  return (
    <div style={{display:'flex'}}>
        <input type="range" min={0} max={right} value={left} onChange={onChange}/>
        <section>{left} / {Number(Number(right))}</section>
    </div>
  )
}

export default TrackProgres