// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.security;

import com.nbu.fares.security.AppRole;
import com.nbu.fares.security.AppUser;

privileged aspect AppUser_Roo_JavaBean {
    
    public String AppUser.getUsername() {
        return this.username;
    }
    
    public void AppUser.setUsername(String username) {
        this.username = username;
    }
    
    public String AppUser.getPassword() {
        return this.password;
    }
    
    public void AppUser.setPassword(String password) {
        this.password = password;
    }
    
    public String AppUser.getConfirmpassword() {
        return this.confirmpassword;
    }
    
    public void AppUser.setConfirmpassword(String confirmpassword) {
        this.confirmpassword = confirmpassword;
    }
    
    public Boolean AppUser.getNeedLogin() {
        return this.needLogin;
    }
    
    public void AppUser.setNeedLogin(Boolean needLogin) {
        this.needLogin = needLogin;
    }
    
    public String AppUser.getUserEmail() {
        return this.userEmail;
    }
    
    public void AppUser.setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
    
    public AppRole AppUser.getUserRole() {
        return this.userRole;
    }
    
    public void AppUser.setUserRole(AppRole userRole) {
        this.userRole = userRole;
    }
    
}