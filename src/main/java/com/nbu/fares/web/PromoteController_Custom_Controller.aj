// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.web;

import com.nbu.fares.domain.DateFares;
import com.nbu.fares.domain.Promote;
import com.nbu.fares.domain.Promotion;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.UriUtils;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;

privileged aspect PromoteController_Custom_Controller {

    @RequestMapping(value = "/promoteManage", produces = "text/html")
    public String PromoteController.promoteManage(Model uiModel) {
        return "promotes/promoteManage";
    }
    
}
