package com.nbu.fares.web;

import com.nbu.fares.domain.Fares;
import flexjson.JSONSerializer;
import org.apache.xmlbeans.impl.xb.xsdschema.Public;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/faresesEngine")
public class FaresController_Custom_From_Fares {
    static Logger logger = LoggerFactory.getLogger(FaresController_Custom_From_Fares.class);

    @RequestMapping(value = "/searchAll/{source}/{destination}",headers = "Accept=application/json")
    public ResponseEntity<String>searchAll(@PathVariable String source,
                                           @PathVariable String destination){
        List<Fares> result = Fares.searchAll(source,destination);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        if (result == null || result.isEmpty() ) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        try {
//        logger.error(":"+ source+": : :"+ destination +"\n");
        return new ResponseEntity<String>((new JSONSerializer()
                .include("id")
                .include("version")
                .include("faresCode")
                .include("price")
                .include("travel.id")
                .include("travel.travelCode")
                .include("travel.locationSourCode")
                .include("travel.locationSourName")
                .include("travel.locationDisCode")
                .include("travel.locationDisName")
                .include("travel.transport.transportCode")
                .include("travel.transport.transportName")
                .include("travel.transport.transportBusiness")
                .include("promote.id")
                .include("promote.promoteCode")
                .include("promote.promotePrice")
                .include("promote.promotion.promotionCode")
                .include("promote.promotion.promotionName")
                .include("promote.dateFares.dateFared")
                .exclude("*")
                .deepSerialize(result)),headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/searchByTransport/{source}/{destination}/{tranCode}",headers = "Accept=application/json")
    public ResponseEntity<String>searchByTransport(@PathVariable String source,
                                             @PathVariable String destination,
                                             @PathVariable String tranCode){
        List<Fares> result = Fares.searchTransport(source,destination,tranCode);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        if (result == null  || result.isEmpty() ) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        try {
//            logger.error("searchTransport"+"=="+ source+"=="+ destination+"=="+tranCode+"=="+"\n");
            return new ResponseEntity<String>((new JSONSerializer()
                    .include("id")
                    .include("version")
                    .include("faresCode")
                    .include("price")
                    .include("travel.id")
                    .include("travel.travelCode")
                    .include("travel.locationSourCode")
                    .include("travel.locationSourName")
                    .include("travel.locationDisCode")
                    .include("travel.locationDisName")
                    .include("travel.transport.transportCode")
                    .include("travel.transport.transportName")
                    .include("travel.transport.transportBusiness")
                    .include("promote.id")
                    .include("promote.promoteCode")
                    .include("promote.promotePrice")
                    .include("promote.promotion.promotionCode")
                    .include("promote.promotion.promotionName")
                    .include("promote.dateFares.dateFared")
                    .exclude("*")
                    .deepSerialize(result)),headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/searchFlightTransport/{source}/{destination}/{trainCode}/{busCode}",headers = "Accept=application/json")
    public ResponseEntity<String>searchFlightTransport(@PathVariable String source,
                                                   @PathVariable String destination,
                                                   @PathVariable String trainCode,
                                                   @PathVariable String busCode){
        List<Fares> result = Fares.searchFlight(source,destination,trainCode,busCode);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        if (result == null  || result.isEmpty() ) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        try {
//            logger.error("searchFlightTransport"+"=="+ source+"=="+ destination+"=="+trainCode+"=="+busCode+"=="+"\n");
            return new ResponseEntity<String>((new JSONSerializer()
                    .include("id")
                    .include("version")
                    .include("faresCode")
                    .include("price")
                    .include("travel.id")
                    .include("travel.travelCode")
                    .include("travel.locationSourCode")
                    .include("travel.locationSourName")
                    .include("travel.locationDisCode")
                    .include("travel.locationDisName")
                    .include("travel.transport.transportCode")
                    .include("travel.transport.transportName")
                    .include("travel.transport.transportBusiness")
                    .include("promote.id")
                    .include("promote.promoteCode")
                    .include("promote.promotePrice")
                    .include("promote.promotion.promotionCode")
                    .include("promote.promotion.promotionName")
                    .include("promote.dateFares.dateFared")
                    .exclude("*")
                    .deepSerialize(result)),headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
