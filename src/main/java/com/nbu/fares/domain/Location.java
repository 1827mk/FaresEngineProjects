package com.nbu.fares.domain;
import com.nbu.fares.base.BaseEntity;
import flexjson.JSONSerializer;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import org.springframework.roo.addon.json.RooJson;
import javax.persistence.Lob;
import org.springframework.roo.classpath.operations.jsr303.RooUploadedFile;

import java.util.Collection;

@RooJavaBean
@RooToString
@RooJpaActiveRecord
@RooJson(deepSerialize = true)
public class Location extends BaseEntity {

    /**
     */
    private String locationCode;

    /**
     */
    private String locationName;

    /**
     */
    private String fileName;

}
