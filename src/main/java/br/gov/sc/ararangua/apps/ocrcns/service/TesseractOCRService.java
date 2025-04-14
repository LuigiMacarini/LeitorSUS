package br.gov.sc.ararangua.apps.ocrcns.service;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

@Service
public class TesseractOCRService {

 @Autowired
 private Tesseract tesseract;

 public String recognizeText(InputStream inputStream) throws IOException {
  BufferedImage image = ImageIO.read(inputStream);
  try {
   return tesseract.doOCR(image);
  } catch (TesseractException e) {
   e.printStackTrace();
  }
  return "failed";
 }

}