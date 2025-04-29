import "./App.css";
import * as React from "react";
import { Typography } from "@mui/material";
import Camera from "./camera";

export default function App() {
  return (
    <div className="appContainer">
      <header className="cardHeader">
        <h1 className="title">Leitor de Cartão SUS</h1>
      </header>

      <div
        className="contentContainer"
        style={{ display: "flex", gap: "20px" }}
      >
        <div className="cameraArea">
          <Camera />
        </div>
        <div className="instructionsBox">
          <header
            className="instructionsHeader"
            style={{ display: "flex", flexDirection: "column", gap: "30px" }}
          >
            <Typography className="instructionText">
              1 - Apresente o seu cartão SUS
            </Typography>
            <Typography className="instructionText">
              2 - Aguarde o seu Cartão ser identificado
            </Typography>
          </header>
        </div>
      </div>
    </div>
  );
}