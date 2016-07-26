package com.nbu.fares.domain;
import com.nbu.fares.base.BaseEntity;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;

import javax.persistence.*;

import org.springframework.roo.addon.json.RooJson;

import java.util.Date;

@RooJavaBean
@RooToString
@RooJpaActiveRecord
@RooJson(deepSerialize = true)
public class Promote extends BaseEntity {

    /**
     */
    private String promoteCode;

    /**
     */
    private Double promotePrice;


    /**
     */
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "M-")
    private Date dateFared;

    /**
     */
    private String promotion;


}
