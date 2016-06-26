// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.domain;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

privileged aspect Transport_Custom_Jpa_ActiveRecord {

    public static List<Transport> Transport.findTransportByCode(String transportCode,String transportName) {
        Session session = (Session) Transport.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Transport.class);
        Criterion codeRestriction = (Restrictions.or(Restrictions.eq("transportCode", transportCode),Restrictions.eq("transportName", transportName)));
        criteria.add(codeRestriction);
        return criteria.list();
    }

    public static List<Transport> Transport.findTransportsByCode(String transportCode) {
        Session session = (Session) Transport.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Transport.class);
        Criterion codeRestriction = (Restrictions.eq("transportCode", transportCode));
        criteria.add(codeRestriction);
        return criteria.list();
    }

    //    Edit
    public static List<Transport> Transport.findTransportCodeDuplicate(String transportCode) {
        Session session = (Session) Transport.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Transport.class);
        Criterion codeRestriction = Restrictions.eq("transportCode", transportCode);
        criteria.add(codeRestriction);
        return criteria.list();
    }

    public static List<Transport> Transport.findTransportNameDuplicate(String transportName) {
        Session session = (Session) Transport.entityManager().getDelegate();
        Criteria criteria = session.createCriteria(Transport.class);
        Criterion codeRestriction = Restrictions.eq("transportName", transportName);
        criteria.add(codeRestriction);
        return criteria.list();
    }
    
}
