// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.domain;

import org.apache.derby.vti.Restriction;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Date;
import java.util.List;

privileged aspect Location_Custom_Jpa_ActiveRecord {

    public static List<Location> Location.findLocationByCode(String locationCode,String locationName) {
        Session session = (Session) Location.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Location.class);
        Criterion codeRestriction = (Restrictions.or(Restrictions.eq("locationCode", locationCode),Restrictions.eq("locationName", locationName)));
        criteria.add(codeRestriction);
        return criteria.list();
    }

    public static List<Location> Location.findLocationsByCode(String locationCode) {
        Session session = (Session) Location.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Location.class);
        Criterion codeRestriction = Restrictions.eq("locationCode", locationCode);
        criteria.add(codeRestriction);
        return criteria.list();
    }

//    Edit
    public static List<Location> Location.findLocationCodeDuplicate(String locationCode) {
        Session session = (Session) Location.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Location.class);
        Criterion codeRestriction = Restrictions.eq("locationCode", locationCode);
        criteria.add(codeRestriction);
        return criteria.list();
    }

    public static List<Location> Location.findLocationNameDuplicate(String locationName) {
        Session session = (Session) Location.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Location.class);
        Criterion codeRestriction = Restrictions.eq("locationName", locationName);
        criteria.add(codeRestriction);
        return criteria.list();
    }
}
