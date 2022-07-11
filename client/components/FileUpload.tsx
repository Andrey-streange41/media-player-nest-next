import React, { useRef } from "react";

interface IFileUpload {
  setFile: Function;
  accept:string
}

const FileUpload: React.FC<IFileUpload> = ({  setFile, accept, children }) => {
    const ref = useRef<HTMLInputElement>();
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0]);
    }
  return (
    <div onClick={()=> ref.current.click() }>
      <input onChange={onChange} ref={ref} type="file" accept={accept} style={{display:'none'}}/>
      {children}
    </div>
  );
};

export default FileUpload;
