// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.web;

import com.nbu.fares.domain.DateFares;
import flexjson.JSONSerializer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Date;
import java.util.List;

privileged aspect DateFaresController_Custom_Controller_Json {

    @RequestMapping(value = "/findAllDatefared", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> DateFaresController.findAllDatefared() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        List<DateFares> dateFaresList = DateFares.findAllDateCustomJPA();
        return new ResponseEntity<String>((new JSONSerializer()
                .include("id")
                .include("version")
                .include("dateFared")
                .include("dateName")
                .exclude("*").deepSerialize(dateFaresList)), headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/findDateCode", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String>DateFaresController.findDateCode(@RequestParam(value="dateFared", required = false)Date dateFared) {
        List<DateFares> parameterDetail=DateFares.findDateByCode(dateFared);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        if (parameterDetail == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>((new JSONSerializer().exclude("*.class")
                .include("id")
                .include("version")
                .include("dateFared")
                .include("dateName")
                .exclude("*")
                .deepSerialize(parameterDetail)),headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/findDateDuplicate", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String>DateFaresController.findDateDuplicate(@RequestParam(value="dateFared", required = false)Date dateFared) {
        List<DateFares> parameterDetail=DateFares.findDateDuplicate(dateFared);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        if (parameterDetail == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>((new JSONSerializer().exclude("*.class")
                .include("id")
                .include("version")
                .include("dateFared")
                .include("dateName")
                .exclude("*")
                .deepSerialize(parameterDetail)),headers, HttpStatus.OK);
    }

}