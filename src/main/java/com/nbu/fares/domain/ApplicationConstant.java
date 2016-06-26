package com.nbu.fares.domain;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import java.io.IOException;
import java.util.Properties;

public class ApplicationConstant {
    public static Logger LOGGER = LoggerFactory.getLogger(ApplicationConstant.class);
    public static  Properties connectProperties = null;

    public static  String PATH_FILE = "";

    static {
        Resource resource = new ClassPathResource("/config.properties");
        try{
            connectProperties = PropertiesLoaderUtils.loadProperties(resource);
            PATH_FILE =  ((connectProperties == null) ? PATH_FILE : (String)connectProperties.get("PathFile-Location"));
        }catch(IOException e){
            LOGGER.error("Error : {}", e);
        }
    }
}
