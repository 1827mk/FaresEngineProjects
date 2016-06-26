package com.nbu.fares.domain;
import com.nbu.fares.base.BaseEntity;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooToString
@RooJpaActiveRecord
@RooJson(deepSerialize = true)
public class Fares extends BaseEntity {

    /**
     */
    private String faresCode;

    /**
     */
    private Double price;
    /**
     */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "travel")
    private Travel travel;

    /**
     */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "promote")
    private Promote promote;


}
