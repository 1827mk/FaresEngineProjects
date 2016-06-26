// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.domain;

import com.nbu.fares.domain.DateFaresDataOnDemand;
import com.nbu.fares.domain.Promote;
import com.nbu.fares.domain.PromoteDataOnDemand;
import com.nbu.fares.domain.PromotionDataOnDemand;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

privileged aspect PromoteDataOnDemand_Roo_DataOnDemand {
    
    declare @type: PromoteDataOnDemand: @Component;
    
    private Random PromoteDataOnDemand.rnd = new SecureRandom();
    
    private List<Promote> PromoteDataOnDemand.data;
    
    @Autowired
    DateFaresDataOnDemand PromoteDataOnDemand.dateFaresDataOnDemand;
    
    @Autowired
    PromotionDataOnDemand PromoteDataOnDemand.promotionDataOnDemand;
    
    public Promote PromoteDataOnDemand.getNewTransientPromote(int index) {
        Promote obj = new Promote();
        setCreatedBy(obj, index);
        setCreatedDate(obj, index);
        setPromoteCode(obj, index);
        setPromotePrice(obj, index);
        setUpdatedBy(obj, index);
        setUpdatedDate(obj, index);
        return obj;
    }
    
    public void PromoteDataOnDemand.setCreatedBy(Promote obj, int index) {
        String createdBy = "createdBy_" + index;
        obj.setCreatedBy(createdBy);
    }
    
    public void PromoteDataOnDemand.setCreatedDate(Promote obj, int index) {
        Date createdDate = new GregorianCalendar(Calendar.getInstance().get(Calendar.YEAR), Calendar.getInstance().get(Calendar.MONTH), Calendar.getInstance().get(Calendar.DAY_OF_MONTH), Calendar.getInstance().get(Calendar.HOUR_OF_DAY), Calendar.getInstance().get(Calendar.MINUTE), Calendar.getInstance().get(Calendar.SECOND) + new Double(Math.random() * 1000).intValue()).getTime();
        obj.setCreatedDate(createdDate);
    }
    
    public void PromoteDataOnDemand.setPromoteCode(Promote obj, int index) {
        String promoteCode = "promoteCode_" + index;
        obj.setPromoteCode(promoteCode);
    }
    
    public void PromoteDataOnDemand.setPromotePrice(Promote obj, int index) {
        Double promotePrice = new Integer(index).doubleValue();
        obj.setPromotePrice(promotePrice);
    }
    
    public void PromoteDataOnDemand.setUpdatedBy(Promote obj, int index) {
        String updatedBy = "updatedBy_" + index;
        obj.setUpdatedBy(updatedBy);
    }
    
    public void PromoteDataOnDemand.setUpdatedDate(Promote obj, int index) {
        Date updatedDate = new GregorianCalendar(Calendar.getInstance().get(Calendar.YEAR), Calendar.getInstance().get(Calendar.MONTH), Calendar.getInstance().get(Calendar.DAY_OF_MONTH), Calendar.getInstance().get(Calendar.HOUR_OF_DAY), Calendar.getInstance().get(Calendar.MINUTE), Calendar.getInstance().get(Calendar.SECOND) + new Double(Math.random() * 1000).intValue()).getTime();
        obj.setUpdatedDate(updatedDate);
    }
    
    public Promote PromoteDataOnDemand.getSpecificPromote(int index) {
        init();
        if (index < 0) {
            index = 0;
        }
        if (index > (data.size() - 1)) {
            index = data.size() - 1;
        }
        Promote obj = data.get(index);
        Long id = obj.getId();
        return Promote.findPromote(id);
    }
    
    public Promote PromoteDataOnDemand.getRandomPromote() {
        init();
        Promote obj = data.get(rnd.nextInt(data.size()));
        Long id = obj.getId();
        return Promote.findPromote(id);
    }
    
    public boolean PromoteDataOnDemand.modifyPromote(Promote obj) {
        return false;
    }
    
    public void PromoteDataOnDemand.init() {
        int from = 0;
        int to = 10;
        data = Promote.findPromoteEntries(from, to);
        if (data == null) {
            throw new IllegalStateException("Find entries implementation for 'Promote' illegally returned null");
        }
        if (!data.isEmpty()) {
            return;
        }
        
        data = new ArrayList<Promote>();
        for (int i = 0; i < 10; i++) {
            Promote obj = getNewTransientPromote(i);
            try {
                obj.persist();
            } catch (final ConstraintViolationException e) {
                final StringBuilder msg = new StringBuilder();
                for (Iterator<ConstraintViolation<?>> iter = e.getConstraintViolations().iterator(); iter.hasNext();) {
                    final ConstraintViolation<?> cv = iter.next();
                    msg.append("[").append(cv.getRootBean().getClass().getName()).append(".").append(cv.getPropertyPath()).append(": ").append(cv.getMessage()).append(" (invalid value = ").append(cv.getInvalidValue()).append(")").append("]");
                }
                throw new IllegalStateException(msg.toString(), e);
            }
            obj.flush();
            data.add(obj);
        }
    }
    
}
