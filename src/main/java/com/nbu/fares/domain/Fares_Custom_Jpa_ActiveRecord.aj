// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.domain;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.expression.spel.ast.*;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

privileged aspect Fares_Custom_Jpa_ActiveRecord {

    static Logger logger = LoggerFactory.getLogger(Fares_Custom_Jpa_ActiveRecord.class);

    public static List Fares.findAllFaresCustomJPA() {
        Session session = (Session) Fares.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Fares.class);
        criteria.addOrder(Order.asc("faresCode"));
        return criteria.list();
    }

    public static List<Fares> Fares.findFaresCodeDuplicate(String faresCode,Double price,String travel,String promote) {
        Session session = (Session) Fares.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Fares.class);
        criteria.createCriteria("travel","travel");
        criteria.createCriteria("promote","promote");

        Criterion codeRestriction = (Restrictions.and(
                Restrictions.eq("faresCode", faresCode),
                Restrictions.eq("price", price),
                Restrictions.eq("travel.travelCode", travel),
                Restrictions.eq("promote.promoteCode", promote))
        );
        criteria.add(codeRestriction);
        return criteria.list();
    }
    public static List<Fares> Fares.checkDuplicateCode(String faresCode) {
        Session session = (Session) Fares.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Fares.class);
        Criterion codeRestriction = (Restrictions.and(
                Restrictions.eq("faresCode", faresCode))
        );
        criteria.add(codeRestriction);
        return criteria.list();
    }
    public static List<Fares> Fares.checkDuplicateCodeFTP(String faresCode,String travel,String promote) {
        Session session = (Session) Fares.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Fares.class);
        criteria.createCriteria("travel","travel");
        criteria.createCriteria("promote","promote");

        Criterion codeRestriction = (Restrictions.and(
                Restrictions.eq("faresCode", faresCode),
                Restrictions.eq("travel.travelCode", travel),
                Restrictions.eq("promote.promoteCode", promote))
        );
        criteria.add(codeRestriction);
        return criteria.list();
    }

    public static List<Fares> Fares.checkDuplicateCodeTP(String travel,String promote) {
        Session session = (Session) Fares.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Fares.class);
        criteria.createCriteria("travel","travel");
        criteria.createCriteria("promote","promote");

        Criterion codeRestriction = (Restrictions.and(
                Restrictions.eq("travel.travelCode", travel),
                Restrictions.eq("promote.promoteCode", promote))
        );
        criteria.add(codeRestriction);
        return criteria.list();
    }

    public static List<Fares> Fares.searchAll(String source,String destination) {
        Session session = (Session) Fares.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Fares.class);
        criteria.createCriteria("travel","travel");

        Criterion codeRestriction = (Restrictions.and(
                Restrictions.eq("travel.locationSourCode", source),
                Restrictions.eq("travel.locationDisCode", destination))
        );

        criteria.add(codeRestriction);
        criteria.addOrder(Order.asc("price"));
        return criteria.list();
    }

    public static List<Fares> Fares.searchByTrans(String source,String destination,String trainCode) {
        Session session = (Session) Fares.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Fares.class);

        criteria.createCriteria("travel","travel");
        criteria.createCriteria("travel.transport","transport");

        Criterion codeRestriction = (Restrictions.and(
                Restrictions.eq("travel.locationSourCode", source),
                Restrictions.eq("travel.locationDisCode", destination),
                Restrictions.eq("transport.transportCode", trainCode))
        );
        criteria.add(codeRestriction);
    //        logger.error("searchFlight");
        criteria.addOrder(Order.asc("price"));
        return criteria.list();
    }


    public static List<Fares> Fares.searchFlight(String source,String destination,String trainCode , String busCode) {
        Session session = (Session) Fares.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Fares.class);

        criteria.createCriteria("travel","travel");
        criteria.createCriteria("travel.transport","transport");

        Criterion codeRestriction = (Restrictions.and(
                Restrictions.eq("travel.locationSourCode", source),
                Restrictions.eq("travel.locationDisCode", destination),
                Restrictions.ne("transport.transportCode", trainCode),
                Restrictions.ne("transport.transportCode", busCode))
        );
        criteria.add(codeRestriction);
//        logger.error("searchFlight");
        criteria.addOrder(Order.asc("price"));
        return criteria.list();
    }





}
