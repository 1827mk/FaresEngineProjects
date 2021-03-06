// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.domain;

import com.nbu.fares.domain.Fares;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

privileged aspect Fares_Roo_Jpa_ActiveRecord {
    
    public static final List<String> Fares.fieldNames4OrderClauseFilter = java.util.Arrays.asList("faresCode", "price", "travel", "promote");
    
    public static long Fares.countFareses() {
        return entityManager().createQuery("SELECT COUNT(o) FROM Fares o", Long.class).getSingleResult();
    }
    
    public static List<Fares> Fares.findAllFareses() {
        return entityManager().createQuery("SELECT o FROM Fares o", Fares.class).getResultList();
    }
    
    public static List<Fares> Fares.findAllFareses(String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM Fares o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, Fares.class).getResultList();
    }
    
    public static Fares Fares.findFares(Long id) {
        if (id == null) return null;
        return entityManager().find(Fares.class, id);
    }
    
    public static List<Fares> Fares.findFaresEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM Fares o", Fares.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    public static List<Fares> Fares.findFaresEntries(int firstResult, int maxResults, String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM Fares o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, Fares.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    @Transactional
    public Fares Fares.merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        Fares merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }
    
}
