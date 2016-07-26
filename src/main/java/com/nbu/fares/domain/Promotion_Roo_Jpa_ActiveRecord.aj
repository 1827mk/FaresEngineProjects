// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.domain;

import com.nbu.fares.domain.Promotion;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

privileged aspect Promotion_Roo_Jpa_ActiveRecord {
    
    public static final List<String> Promotion.fieldNames4OrderClauseFilter = java.util.Arrays.asList("");
    
    public static long Promotion.countPromotions() {
        return entityManager().createQuery("SELECT COUNT(o) FROM Promotion o", Long.class).getSingleResult();
    }
    
    public static List<Promotion> Promotion.findAllPromotions() {
        return entityManager().createQuery("SELECT o FROM Promotion o", Promotion.class).getResultList();
    }
    
    public static List<Promotion> Promotion.findAllPromotions(String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM Promotion o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, Promotion.class).getResultList();
    }
    
    public static Promotion Promotion.findPromotion(Long id) {
        if (id == null) return null;
        return entityManager().find(Promotion.class, id);
    }
    
    public static List<Promotion> Promotion.findPromotionEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM Promotion o", Promotion.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    public static List<Promotion> Promotion.findPromotionEntries(int firstResult, int maxResults, String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM Promotion o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, Promotion.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    @Transactional
    public Promotion Promotion.merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        Promotion merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }
    
}
