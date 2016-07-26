package com.nbu.fares.domain;
import com.nbu.fares.base.BaseEntity;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooToString
@RooJpaActiveRecord
@RooJson(deepSerialize = true)
public class Travel extends BaseEntity {

    /**
     */
    private String travelCode;

    /**
     */
    private String locationSourCode;

    /**
     */
    private String locationSourName;

    /**
     */
    private String locationDisCode;

    /**
     */
    private String locationDisName;

    /**
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "transport")
    private Transport transport;
}
