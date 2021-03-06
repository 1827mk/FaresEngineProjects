// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.domain;

import com.nbu.fares.domain.DateFares;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

privileged aspect DateFares_Roo_Jpa_ActiveRecord {
    
    public static final List<String> DateFares.fieldNames4OrderClauseFilter = java.util.Arrays.asList("");
    
    public static long DateFares.countDateFareses() {
        return entityManager().createQuery("SELECT COUNT(o) FROM DateFares o", Long.class).getSingleResult();
    }
    
    public static List<DateFares> DateFares.findAllDateFareses() {
        return entityManager().createQuery("SELECT o FROM DateFares o", DateFares.class).getResultList();
    }
    
    public static List<DateFares> DateFares.findAllDateFareses(String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM DateFares o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, DateFares.class).getResultList();
    }
    
    public static DateFares DateFares.findDateFares(Long id) {
        if (id == null) return null;
        return entityManager().find(DateFares.class, id);
    }
    
    public static List<DateFares> DateFares.findDateFaresEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM DateFares o", DateFares.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    public static List<DateFares> DateFares.findDateFaresEntries(int firstResult, int maxResults, String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM DateFares o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, DateFares.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    @Transactional
    public DateFares DateFares.merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        DateFares merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }
    
}
