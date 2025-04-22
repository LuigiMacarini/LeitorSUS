import React, { useRef, useState, useEffect } from "react";
import "./Camera.css"; 

function Camera() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: 'environment'
          }
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        setError("Não foi possível acessar a câmera");
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureCard = async () => {
    setLoading(true);
    setError("");
    
    try {
      const video = videoRef.current;
      const canvas = photoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('file', blob, 'cartao_sus.png');
        
        const response = await fetch('http://192.168.5.87:8888/ocr', {
          method: 'POST',
          body: formData
        });
        
        setResult(await response.text());
        setLoading(false);
      }, 'image/png', 1.0);
      
    } catch (err) {
      setError("Erro ao processar a imagem");
      setLoading(false);
    }
  };

  return (
    <div className="card-reader-container">
      
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="camera-preview">
        <video ref={videoRef} className="video-element" playsInline muted autoPlay />
        <button 
          onClick={captureCard} 
          disabled={loading}
          className={`capture-button ${loading ? 'loading' : ''}`}
        >
          {loading ? 'Processando...' : 'Capturar Cartão'}
        </button>
      </div>
      
      <canvas ref={photoRef} className="hidden-canvas" />
      
      {result && (
        <div className="result-container">
          <h3>Número do CNS:</h3>
          <p className="result-text">{result}</p>
          {result !== "Não identificado"}
        </div>
      )}
    </div>
  );
}

export default Camera;