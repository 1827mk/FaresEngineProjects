// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.security;

import com.nbu.fares.security.AppRole;

privileged aspect AppRole_Roo_JavaBean {
    
    public String AppRole.getName() {
        return this.name;
    }
    
    public void AppRole.setName(String name) {
        this.name = name;
    }
    
    public String AppRole.getDescription() {
        return this.description;
    }
    
    public void AppRole.setDescription(String description) {
        this.description = description;
    }
    
}
