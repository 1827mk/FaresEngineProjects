// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.security;

import com.nbu.fares.security.AppRole;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

privileged aspect AppRole_Roo_Jpa_Entity {
    
    declare @type: AppRole: @Entity;
    
    declare @type: AppRole: @Inheritance(strategy = InheritanceType.TABLE_PER_CLASS);
    
}
