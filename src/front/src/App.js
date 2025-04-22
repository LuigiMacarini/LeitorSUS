import './App.css';
import * as React from 'react'; import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import { FaCamera } from 'react-icons/fa';
import Camera from './camera';

export default function App() {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpansion = () => {
    setExpanded((prevExpended) => !prevExpended);
  }


  return (
    <div className="appContainer">
      <header className="cardHeader">
        <h1 className="title">Leitor de Cartão SUS</h1>
        <Accordion expanded={expanded}
          onChange={handleExpansion}
          slots={{ transition: Fade }}
          slotProps={{ transition: { timeout: 400 } }}
          sx={[
            
            expanded
              ? {
                [`& .${accordionClasses.region}`]: {
                  height: 'auto',
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: 'block',
                },
              }
              : {
                [`& .${accordionClasses.region}`]: {
                  height: 0,
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: 'none',
                },
              },
          ]}
          
        >
          <AccordionSummary
            className="accordionBtn"
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            <Typography component="span">Como usar</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className='accordionText'>
              1 - Aperte no botão “Camera”
            </Typography>
            <Typography className='accordionText'>
              2 - Apresente o seu cartão SUS
            </Typography>
            <Typography className='accordionText'>
            3 - Aguarde o ser Cartão ser identificado
            </Typography>
          </AccordionDetails>
        </Accordion>

      </header>

      <button className="btnCamera">
        <FaCamera className="iconCamera" />
        Câmera
       
      </button>
      <Camera />

     
    </div>
    
  );
}


