package com.nbu.fares.service;

import com.nbu.fares.domain.Fares;

import java.util.List;
import java.util.Map;


/**
 * Created by tanaphatdev on 20/5/2559.
 */
public interface FaresService {
    List<Fares>findFaresByCriteria(String code);
//    Map<String, Object> faresEngings(String faresCode,Double price,String travel,String promote,Integer first,Integer max);
//    Map<String, Object> faresEngingsSize(String faresCode,Double price,String travel,String promote);
}
