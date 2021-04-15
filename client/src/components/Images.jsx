import React, {useState} from 'react';

export default function Images(){
    const [file, setFile] = useState();

     const submit = event => {
        debugger;
         const data = new FormData();
         data.append("file", file );
         data.append('ticket_id',34) //adds to req.body!
        
        // fetch('https://mema4kids.info/api/post' , {
        //     method: 'post',
        //     body: data,
        //     mode: 'no-cors'
        //   }).then(response => console.log('Success:', response))
        //   .catch(error => console.error('Error:', error));

     
          fetch('http://localhost:4000/api/files/post' , {
            method: 'POST',
            body: data,
            // mode: 'no-cors'
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


