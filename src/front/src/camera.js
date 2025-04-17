import React, { useRef, useState, useEffect } from "react";
function Camera() {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [hasphoto, setHasPhoto] = useState(false);

    const getVideo = ()=>{
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        }).then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play(0);
        }).catch(err => {
            console.error("Error accessing webcam: ", err);
        });
    }

    const takePhoto = () => {
        const width = 414;
        const height = width / (16 / 9);

        const video = videoRef.current;
        const photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        const ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);
    }
    const closePhoto = () => {
        setHasPhoto(false);
        const ctx = photoRef.current.getContext('2d');
        ctx.clearRect(0, 0, photoRef.current.width, photoRef.current.height);
    };
    useEffect(() => {
        getVideo();
    }, [videoRef]);

    return (
        <div className="camera">
            <div className="camera">
                <video ref={videoRef}></video>
                <button onClick={takePhoto}>Foto</button>
            </div>
            <div className={"result"+(hasphoto ? 'hasphoto' : ''

            )}>
                <canvas ref={photoRef}></canvas>
                <button>Fechar</button>
            </div>
        </div>
    )
}
export default Camera;