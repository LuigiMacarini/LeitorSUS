import React, { useState } from 'react';
import axios from 'axios';
import 'react-html5-camera-photo/build/css/index.css';
import Camera from 'react-html5-camera-photo';

function App() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const fileChanger = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTakePhoto = (dataUri) => {
    const byteString = atob(dataUri.split(',')[1]);
    const mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    const newFile = new File([blob], 'photo.jpg', { type: mimeString });
    setFile(newFile);
    handleSubmit(newFile);
    console.log("Carregando...");
  };

  const handleSubmit = async (fileToUpload) => {
    if (!fileToUpload && !file) {
      alert("Por favor, selecione ou capture uma imagem.");
      return;
    }
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', fileToUpload || file);
    try {
      const res = await axios.post('http://192.168.5.87:8888/ocr', formData, { 
        //requisição POST do backend
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(res.data);
      console.log("Resposta do servidor:", res.data);
      console.log("Arquivo enviado:", fileToUpload || file);
    } catch (err) {
      setError(err.response ? err.response.data : 'Erro ao enviar o arquivo');
    } finally {
      setLoading(false);
    }
  };

  //aqui vai renderizar o componente
  return (
    <div style={styles.App}>
      <h1 style={styles.title}>Leitor de Cartão SUS</h1>
      <div>
        <h2>Como usar:</h2>
        <p>- Clique no botão "Abrir câmera" para capturar a foto do cartão.</p>
        <p>- Aguarde o processamento e veja o numero abaixo.</p>
      </div>
      <button onClick={() => setShowCamera(!showCamera)} style={styles.button}>
        {showCamera ? 'Fechar câmera' : 'Abrir câmera'}
      </button>
      {showCamera && (
        <div style={styles.mirror}>
          {/* O componente Camera é utilizado tirar a foto*/}
        <Camera 
          onTakePhoto={(dataUri) => handleTakePhoto(dataUri)}
          idealResolution={{ width: 640, height: 480 }}
          isFullscreen={false}
        
        />
        </div>
      )}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} style={styles.form}>
        <input type="file" onChange={fileChanger} style={styles.input} />
        <button type="submit" style={styles.button}>
          Upload
        </button>
      </form>
      {loading && <p style={styles.loading}>Carregando...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {response && (
        <div>
          <h2 style={styles.responseTitle}>Numero do cartão:</h2>
          <pre style={styles.response}>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

const styles = {
  App: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    color: '#333',
    minHeight: '100vh',
  },
  title: {
    marginBottom: '20px',
    fontSize: '28px',
    color: '#007bff',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    marginRight: '10px',
    padding: '5px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  loading: {
    color: '#ffc107',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  responseTitle: {
    marginTop: '20px',
    fontSize: '20px',
    color: '#333',
  },
  response: {
    textAlign: 'center',
    backgroundColor: '#e9ecef',
    padding: '10px',
    borderRadius: '5px',
    color: '#333',
    fontFamily: 'monospace',
  },
  mirror:{
    transform: 'scaleX(1)'
  }
};

export default App;