// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.web;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

privileged aspect LocationController_Custom_Controller {

    @RequestMapping(value = "/locationManage", produces = "text/html")
    public String LocationController.locationInsert(Model uiModel) {

        return "locations/locationManage";
    }


}