import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from '../firebase';

const Upload = () => {
    const [file, setfile] = useState(undefined);
    const [video, setvideo] = useState(undefined);
    const [filePerc, setfilePerc] = useState("0");
    const [videoPerc, setvideoPerc] = useState("0");
    const [inputs, setInputs] = useState({})
    // Create a root reference
    useEffect(() => {
        video && uploadFile(video, "videoUrl");
    }, [video])

    useEffect(() => {
        file && uploadFile(file, "fileUrl");

    }, [file])

    const uploadFile = (file, fileType) => {
        const storage = getStorage(app);
        const folder = fileType === 'videoUrl' ? 'videos/' : 'files/';
        const fileName = new Date().getTime() + "-" + file.name;
        const storageRef = ref(storage, folder + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                fileType === "fileUrl" ? setfilePerc(Math.round(progress)) : setvideoPerc(Math.round(progress));
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case "storage/unauthorized":
                        console.log(error);
                        break;
                    case "storage/canceled":
                        console.log(error);
                        break;
                    case "storage/unknown":
                        console.log(error);
                        break;
                    default:
                        break;


                }
            },
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setInputs((prev) => {
                        return {
                            ...prev,
                            [fileType]: downloadURL,
                        }
                    })
                });
            }
        );
    }
    const handelSubmit = async (e) => {
        e.preventDefault();

        axios.post(`http://localhost:8080/api/files`, { ...inputs }).then((response) => {
            console.log("response", response.data.msg)
            alert(response.data.msg)

        }).catch((error) => {
            console.log("error", error);
            alert(error);

        });



    }
    return (
        <div>
            <form onSubmit={handelSubmit}>

                <div>
                    <label htmlFor="video">Video</label>{videoPerc > 0 && "Uploading :" + videoPerc + "%"}
                    <input type="file" accept='video/*' id="video" name="video" onChange={(e) => setvideo((prev) => e.target.files[0])} />

                </div>
                <br /><br />
                <div>
                    <label htmlFor="file">File</label>{filePerc > 0 && "Uploading :" + filePerc + "%"}
                    <input type="file" id="file" name="file" onChange={(e) => setfile((prev) => e.target.files[0])} />
                </div>
                <br /><br />

                <button type="submit">Upload</button>
            </form>

        </div>
    )
}


export default Upload
