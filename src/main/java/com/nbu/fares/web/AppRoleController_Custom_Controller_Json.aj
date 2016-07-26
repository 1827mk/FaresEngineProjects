// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.web;

import com.nbu.fares.security.AppRole;
import flexjson.JSONSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Date;
import java.util.List;

privileged aspect AppRoleController_Custom_Controller_Json {

    static Logger logger = LoggerFactory.getLogger(AppRoleController_Custom_Controller_Json.class);

    @RequestMapping(value = "/findAllRole", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> AppRoleController.findAllRole() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        List<AppRole> locationList = AppRole.findAllAppRoles();
        return new ResponseEntity<String>((new JSONSerializer()
                .include("id")
                .include("version")
                .include("name")
                .include("description")
                .exclude("*").deepSerialize(locationList)), headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/findCheckDuplicate", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String>AppRoleController.findCheckDuplicate(@RequestParam(value="name", required = false)String name,
                                                                     @RequestParam(value="description", required = false)String description) {
        List<AppRole> parameterDetail = AppRole.findCheckDuplicate(name,description);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        if (parameterDetail == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>((new JSONSerializer().exclude("*.class")
                .include("id")
                .include("version")
                .include("name")
                .include("description")
                .exclude("*")
                .deepSerialize(parameterDetail)),headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/findByName", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String>AppRoleController.findByName(@RequestParam(value="name", required = false)String name) {
        List<AppRole> parameterDetail=AppRole.findByName(name);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        if (parameterDetail == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>((new JSONSerializer().exclude("*.class")
                .include("id")
                .include("version")
                .include("name")
                .include("description")
                .exclude("*")
                .deepSerialize(parameterDetail)),headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/insertData", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> AppRoleController.insertData(@RequestParam(value="name", required = false)String name,
                                                             @RequestParam(value="description", required = false)String description,
                                                             @RequestParam(value="createdBy", required = false)String createdBy,
                                                             @RequestParam(value="updatedBy", required = false)String updatedBy) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        Date date = new Date();

        if(name != null && description != null){
            AppRole appRole = new AppRole();
            appRole.setName(name);
            appRole.setDescription(description);
            appRole.setCreatedBy(createdBy);
            appRole.setUpdatedBy(updatedBy);
            appRole.setCreatedDate(date);
            appRole.setUpdatedDate(date);
            appRole.persist();
            return new ResponseEntity<String>((new JSONSerializer().deepSerialize("success")),headers, HttpStatus.CREATED);
        }else{
            return new ResponseEntity<String>((new JSONSerializer().deepSerialize("failed")),headers, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/updateData", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> AppRoleController.updateData(@RequestParam(value="id", required = false)Long roleId,
                                                             @RequestParam(value="name", required = false)String name,
                                                             @RequestParam(value="description", required = false)String description,
                                                             @RequestParam(value="updatedBy", required = false)String updatedBy) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        AppRole appRole = AppRole.findAppRole(roleId);
        Date date = new Date();

        if(name!= null && description != null){
            appRole.setName(name);
            appRole.setDescription(description);
            appRole.setUpdatedBy(updatedBy);
            appRole.setUpdatedDate(date);
            appRole.merge();
            return new ResponseEntity<String>((new JSONSerializer().deepSerialize("success")),headers, HttpStatus.OK);
        }else{
            return new ResponseEntity<String>((new JSONSerializer().deepSerialize("failed")),headers, HttpStatus.NO_CONTENT);
        }
    }
}
