package com.nbu.fares.service;

import com.nbu.fares.domain.Fares;
import com.nbu.fares.repository.FaresRepository;
import com.nbu.fares.repository.FaresRepository_Custom;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by tanaphatdev on 20/5/2559.
 */

@Service
@Transactional
public class FaresServiceImpl implements FaresService {

    @PersistenceContext
    EntityManager em;

    @Autowired
    FaresRepository_Custom faresRepository_custom;


    @Override
    public List<Fares> findFaresByCriteria(String code) {
        return faresRepository_custom.findFaresByCriteria(code);
    }

//    @Override
//    public Map<String, Object> faresEngings(String faresCode,Double price,String travel,String promote,Integer first,Integer max) {
//        Map<String, Object> map = new HashMap<String, Object>();
//
//        StringBuilder query = new StringBuilder();
//        query.append("SELECT o FROM Fares o WHERE 1=1 ");
//
//        if(!"".equals(faresCode)) {
//            query.append(" and o.faresCode=:faresCode");
//        }
//        if(!"".equals(price)) {
//            query.append(" and o.price=:price");
//        }
//        if(!"".equals(travel)) {
//            query.append(" and o.travel=:travel");
//        }
//        if(!"".equals(promote)) {
//            query.append(" and o.promote=:promote");
//        }
//
//        query.append(" order by o.faresCode asc");
//
//
//        if("".equals(faresCode) && "".equals(price) && "".equals(travel) && "".equals(promote)){
//            if (null!=first && null!=max) {
//                map.put("data", em.createQuery("SELECT o FROM Fares o order by o.faresCode asc", Fares.class).setFirstResult(first).setMaxResults(max).getResultList());
//            }else {
//                map.put("data", em.createQuery("SELECT o FROM Fares o order by o.faresCode asc", Fares.class).getResultList());
//            }
//            map.put("size",em.createQuery("SELECT o FROM Fares o",Fares.class).getResultList().size());
//
//            return map;
//        }else{
//            Query query1 = em.createQuery(query.toString(), Fares.class);
//            if(! "".equals(faresCode)) {
//                query1.setParameter("faresCode",faresCode);
//            }
//            if(!"".equals(price)) {
//                query1.setParameter("price",price);
//            }
//            if(!"".equals(travel)) {
//                query1.setParameter("travel",travel);
//            }
//            if(!"".equals(promote)) {
//                query1.setParameter("promote",promote);
//            }
//
//            map.put("size",query1.getResultList().size());
//            if (null!=first && null!=max) {
//                map.put("data", query1.setFirstResult(first).setMaxResults(max).getResultList());
//            }else {
//                map.put("data", query1.getResultList());
//            }
//            return map;
//        }
//    }
//
//    @Override
//    public Map<String, Object> faresEngingsSize(String faresCode,Double price,String travel,String promote) {
//        Map<String, Object> map = new HashMap<String, Object>();
//
//        StringBuilder query = new StringBuilder();
//        query.append("SELECT o FROM Fares o WHERE 1=1 ");
//
//        if(!"".equals(faresCode)) {
//            query.append(" and o.faresCode=:faresCode");
//        }
//        if(!"".equals(price)) {
//            query.append(" and o.price=:price");
//        }
//        if(!"".equals(travel)) {
//            query.append(" and o.travel=:travel");
//        }
//        if(!"".equals(promote)) {
//            query.append(" and o.promote=:promote");
//        }
//
//        query.append(" order by o.faresCode asc");
//
//        if("".equals(faresCode) && "".equals(price) && "".equals(travel) && "".equals(promote)){
//            map.put("size",em.createQuery("SELECT o FROM Fares o",Fares.class).getResultList().size());
//            return map;
//        }else{
//            Query query1 = em.createQuery(query.toString(), Fares.class);
//            if(! "".equals(faresCode)) {
//                query1.setParameter("faresCode",faresCode);
//            }
//            if(!"".equals(price)) {
//                query1.setParameter("price",price);
//            }
//            if(!"".equals(travel)) {
//                query1.setParameter("travel",travel);
//            }
//            if(!"".equals(promote)) {
//                query1.setParameter("promote",promote);
//            }
//
//            map.put("size",query1.getResultList().size());
//            return map;
//        }
//    }
}
