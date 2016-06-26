// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.web;

import com.nbu.fares.domain.Location;
import com.nbu.fares.domain.Transport;
import flexjson.JSONSerializer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

privileged aspect TransportController_Custom_Controller_Json {

    @RequestMapping(value = "/findAllTransport", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> TransportController.findAllTransport() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        List<Transport> transportList = Transport.findAllTransports();
        return new ResponseEntity<String>((new JSONSerializer()
                .include("id")
                .include("version")
                .include("transportCode")
                .include("transportName")
                .exclude("*").deepSerialize(transportList)), headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/findTransportCode", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String>TransportController.findTransportCode(@RequestParam(value="transportCode", required = false)String transportCode,
                                                                       @RequestParam(value="transportName", required = false)String transportName) {
        List<Transport> parameterDetail=Transport.findTransportByCode(transportCode,transportName);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        if (parameterDetail == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>((new JSONSerializer().exclude("*.class")
                .include("id")
                .include("version")
                .include("transportCode")
                .include("transportName")
                .exclude("*")
                .deepSerialize(parameterDetail)),headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/findTransportsByCode", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String>TransportController.findTransportsByCode(@RequestParam(value="transportCode", required = false)String transportCode) {
        List<Transport> parameterDetail=Transport.findTransportsByCode(transportCode);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        if (parameterDetail == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>((new JSONSerializer().exclude("*.class")
                .include("id")
                .include("version")
                .include("transportCode")
                .include("transportName")
                .exclude("*")
                .deepSerialize(parameterDetail)),headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/findTransportCodeDuplicate", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String>TransportController.findTransportCodeDuplicate(@RequestParam(value="transportCode", required = false)String transportCode) {
        List<Transport> parameterDetail=Transport.findTransportCodeDuplicate(transportCode);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        if (parameterDetail == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>((new JSONSerializer().exclude("*.class")
                .include("id")
                .include("version")
                .include("transportCode")
                .include("transportName")
                .exclude("*")
                .deepSerialize(parameterDetail)),headers, HttpStatus.OK);
    }
    @RequestMapping(value = "/findTransportNameDuplicate", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String>TransportController.findTransportNameDuplicate(@RequestParam(value="transportName", required = false)String transportName) {
        List<Transport> parameterDetail=Transport.findTransportNameDuplicate(transportName);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        if (parameterDetail == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>((new JSONSerializer().exclude("*.class")
                .include("id")
                .include("version")
                .include("transportCode")
                .include("transportName")
                .exclude("*")
                .deepSerialize(parameterDetail)),headers, HttpStatus.OK);
    }
    
}
