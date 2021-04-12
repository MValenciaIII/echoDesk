import React, {useState} from 'react';

export default function Images(){
    const [file, setFile] = useState();

     const submit = event => {
         const data = new FormData();
         data.append("file", file );
        
        fetch('http://mema4kids.info/api/post' , {
            method: 'post',
            body: data,
            mode: 'no-cors'
          }).then(response => console.log('Success:', response))
          .catch(error => console.error('Error:', error));
     };
        return (
            <>
            <form action="#">
                    <div className ="flex">
                      <label htmlFor ="file">File</label>
                       <input type="file" id="file" onChange={event => {
                        const file = event.target.files[0];
                        setFile(file);
                    }} />
                </div>
            </form>
           <button onClick={submit}>Send</button>
            </>
        )
}


