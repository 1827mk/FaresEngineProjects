// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.domain;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import java.util.List;

privileged aspect Location_Custom_Finder {

    public static List<Location> Location.createLocation(String locationCode,String locationName){
        Criteria criteria = ((Session) Location.entityManager().getDelegate()).createCriteria(Location.class,"Location");
            Criterion codesame = Restrictions.eq("locationCode",locationCode);
            Criterion namesame = Restrictions.eq("locationName",locationName);
        criteria.add(Restrictions.or(codesame,namesame));
        List<Location> list = criteria.list();
        return list;
    }


}
