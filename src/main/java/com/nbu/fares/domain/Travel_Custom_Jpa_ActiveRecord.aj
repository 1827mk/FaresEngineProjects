// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.domain;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import java.lang.*;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

privileged aspect Travel_Custom_Jpa_ActiveRecord {

    static Logger logger = LoggerFactory.getLogger(Travel_Custom_Jpa_ActiveRecord.class);
    public static List<Travel> Travel.findTravelByCode(String travelCode,String locationSourCode,String locationDisCode,String transportCode) {
        Session session = (Session) Travel.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Travel.class);
        Criterion codeRestriction = (Restrictions.and(Restrictions.eq("travelCode", travelCode),Restrictions.eq("locationSourCode", locationSourCode),Restrictions.eq("locationDisCode", locationDisCode),Restrictions.eq("transport.transportCode", transportCode)));
        criteria.add(codeRestriction);
        return criteria.list();
    }

    public static List<Travel> Travel.findTravelsByCode(String travelCode) {
        Session session = (Session) Travel.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Travel.class);
        Criterion codeRestriction = Restrictions.eq("travelCode", travelCode);
        criteria.add(codeRestriction);
        return criteria.list();
    }

    public static List<Travel> Travel.findTravelDuplicate(String travelCode,String locationSourCode,String locationDisCode,String transport) {
        Session session = (Session) Travel.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Travel.class);
        criteria.createCriteria("transport","transport");

        Criterion codeRestriction = (Restrictions.and(
                Restrictions.eq("travelCode", travelCode),
                Restrictions.eq("locationSourCode", locationSourCode),
                Restrictions.eq("locationDisCode", locationDisCode),
                Restrictions.eq("transport.transportCode", transport))
        );
        criteria.add(codeRestriction);
        return criteria.list();
    }

    public static List<Travel> Travel.findTravelCodeDuplicate(String travelCode) {
        Session session = (Session) Travel.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Travel.class);
        Criterion codeRestriction = Restrictions.eq("travelCode", travelCode);
        criteria.add(codeRestriction);
        return criteria.list();
    }


    public static List<Travel> Travel.checkDuplicateCodeSDT(String locationSourCode,String locationDisCode,String transport) {
        Session session = (Session) Travel.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Travel.class);
        criteria.createCriteria("transport","transport");

        Criterion codeRestriction = (Restrictions.and(
                Restrictions.eq("locationSourCode", locationSourCode),
                Restrictions.eq("locationDisCode", locationDisCode),
                Restrictions.eq("transport.transportCode", transport))
        );
        criteria.add(codeRestriction);
        return criteria.list();
    }

    public static List<Travel> Travel.checkDelete1(Long idDelete) {
        Session session = (Session) Travel.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Travel.class);
        Criterion codeRestriction = (Restrictions.and(
                Restrictions.eq("transport.id", idDelete))
        );
        criteria.add(codeRestriction);
        return criteria.list();
    }

}