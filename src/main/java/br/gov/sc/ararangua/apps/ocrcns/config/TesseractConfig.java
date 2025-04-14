package br.gov.sc.ararangua.apps.ocrcns.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.sourceforge.tess4j.Tesseract;

@Configuration
public class TesseractConfig {
	
	@Bean
	Tesseract tesseract() {
        Tesseract tesseract = new Tesseract();
        tesseract.setDatapath("/usr/share/tesseract-ocr/4.00/tessdata"); //files of the example : https://github.com/tesseract-ocr/tessdata src/main/resources/tessdata 
        return tesseract;
    }

}
