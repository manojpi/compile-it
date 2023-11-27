import React, {useState} from "react";
import { LinkContainer } from "react-router-bootstrap";

function UploadCard() {
    const { Uploader } = require("uploader");
    const [uploaded, setUploaded] = useState("");   

    // Get production API keys from Bytescale
    const uploader = Uploader({
        apiKey: "free"
    });

    const upload = () => {
        uploader.open({ multi: false }).then(files => {
            if (files.length === 0) {
                console.log('No files selected.')
            } else {
                console.log('Files uploaded:');
                console.log(files.map(f => f.fileUrl));
                setUploaded(files[0].fileUrl);
                console.log(files[0].fileUrl);
            }
        }).catch(err => {
            console.error(err);
        });
    }
    return (
        <div className="card rounded w-50 border border-light text-center">
            <div className="card-body my-5 py-5">
                <h5 className="card-title">GIVE ME SOURCE CODE</h5>
                <div className='my-3'>
                    <button className='btn btn-outline-dark btn-block' onClick={upload}> File Upload</button>
                </div>
                {uploaded && <h5 className="text-primary">Uploaded: {uploaded}</h5>}
                <LinkContainer to={'/editor'}>
                <button className='btn btn-dark'> Compile </button>
                </LinkContainer>
            </div>
        </div>
    )
}

export default UploadCard;