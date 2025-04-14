package br.gov.sc.ararangua.apps.ocrcns.controller;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.gov.sc.ararangua.apps.ocrcns.service.TesseractOCRService;

@RestController
@RequestMapping("/ocr")
@CrossOrigin(origins = "*") 
public class OcrController {

    @Autowired
    private TesseractOCRService tesseractOCRService;

    @PostMapping
    public String recognizeText(@RequestParam("file") MultipartFile file) throws IOException {
        String cnsReg = "(?m)[0-9]{15}";
        String cns = "Não identificado";

        String dados = tesseractOCRService.recognizeText(file.getInputStream());
        dados = dados.replaceAll("\\s+", "");
        System.out.println("Dados processados: " + dados);

        Pattern p = Pattern.compile(cnsReg);
        Matcher m = p.matcher(dados);
        int count = 0;
        while (m.find()) {
            count++;
            System.out.println("Match número " + count);
            System.out.println("Início: " + m.start() + ", Fim: " + m.end());
            cns = dados.substring(m.start(), m.end());
        }

        return cns;
    }

    @GetMapping
    @ResponseBody
    public String getMessage() {
        return "Teste Ok";
    }


    public boolean isValid(String s) {
        if (s.matches("[1-2]\\d{10}00[0-1]\\d") || s.matches("[7-9]\\d{14}")) {
            return somaPonderada(s) % 11 == 0;
        }
        return false;
    }
    
    private int somaPonderada(String s) {
        char[] cs = s.toCharArray();
        int soma = 0;
        for (int i = 0; i < cs.length; i++) {
            soma += Character.digit(cs[i], 10) * (15 - i);
        }
        return soma;
    }
}