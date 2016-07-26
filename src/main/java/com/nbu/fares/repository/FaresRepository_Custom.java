package com.nbu.fares.repository;

import com.nbu.fares.domain.Fares;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by tanaphatdev on 20/5/2559.
 */
@Repository
@Transactional
public class FaresRepository_Custom {
    static Logger LOGGER = LoggerFactory.getLogger(FaresRepository_Custom.class);

    @PersistenceContext
    private EntityManager entityManager;

//    @Autowired
//    FaresRepository faresRepository ;


    public static List<Fares> findFaresByCriteria(String code) {
        List<Fares>faresList = new ArrayList<>();
        try {
            EntityManager ent = Fares.entityManager();
            Criteria cr = ((Session) ent.getDelegate()).createCriteria(Fares.class);
            if (!(code.equals("null"))) {
                cr.add(Restrictions.eq("faresCode", code));
            }
            faresList = cr.list();

        } catch (Exception e) {
            LOGGER.info("");
        }
        return faresList;

    }
}