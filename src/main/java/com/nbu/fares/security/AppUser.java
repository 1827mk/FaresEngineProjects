package com.nbu.fares.security;
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
@RooJpaActiveRecord(inheritanceType = "TABLE_PER_CLASS")
@RooJson(deepSerialize = true)
public class AppUser extends BaseEntity {

    /**
     */
    private String username;

    /**
     */
    private String password;

    /**
     */
    private String confirmpassword;

    /**
     */
    private Boolean needLogin;

    /**
     */
    private String userEmail;

    /**
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "USERROLE")
    private AppRole userRole;
}
