package com.ecoaudit.forensics;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
public class EcoAuditApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcoAuditApplication.class, args);
    }
}
