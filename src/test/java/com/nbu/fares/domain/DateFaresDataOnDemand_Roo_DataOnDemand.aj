// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.domain;

import com.nbu.fares.domain.DateFares;
import com.nbu.fares.domain.DateFaresDataOnDemand;
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
import org.springframework.stereotype.Component;

privileged aspect DateFaresDataOnDemand_Roo_DataOnDemand {
    
    declare @type: DateFaresDataOnDemand: @Component;
    
    private Random DateFaresDataOnDemand.rnd = new SecureRandom();
    
    private List<DateFares> DateFaresDataOnDemand.data;
    
    public DateFares DateFaresDataOnDemand.getNewTransientDateFares(int index) {
        DateFares obj = new DateFares();
        setCreatedBy(obj, index);
        setCreatedDate(obj, index);
        setUpdatedBy(obj, index);
        setUpdatedDate(obj, index);
        return obj;
    }
    
    public void DateFaresDataOnDemand.setCreatedBy(DateFares obj, int index) {
        String createdBy = "createdBy_" + index;
        obj.setCreatedBy(createdBy);
    }
    
    public void DateFaresDataOnDemand.setCreatedDate(DateFares obj, int index) {
        Date createdDate = new GregorianCalendar(Calendar.getInstance().get(Calendar.YEAR), Calendar.getInstance().get(Calendar.MONTH), Calendar.getInstance().get(Calendar.DAY_OF_MONTH), Calendar.getInstance().get(Calendar.HOUR_OF_DAY), Calendar.getInstance().get(Calendar.MINUTE), Calendar.getInstance().get(Calendar.SECOND) + new Double(Math.random() * 1000).intValue()).getTime();
        obj.setCreatedDate(createdDate);
    }
    
    public void DateFaresDataOnDemand.setUpdatedBy(DateFares obj, int index) {
        String updatedBy = "updatedBy_" + index;
        obj.setUpdatedBy(updatedBy);
    }
    
    public void DateFaresDataOnDemand.setUpdatedDate(DateFares obj, int index) {
        Date updatedDate = new GregorianCalendar(Calendar.getInstance().get(Calendar.YEAR), Calendar.getInstance().get(Calendar.MONTH), Calendar.getInstance().get(Calendar.DAY_OF_MONTH), Calendar.getInstance().get(Calendar.HOUR_OF_DAY), Calendar.getInstance().get(Calendar.MINUTE), Calendar.getInstance().get(Calendar.SECOND) + new Double(Math.random() * 1000).intValue()).getTime();
        obj.setUpdatedDate(updatedDate);
    }
    
    public DateFares DateFaresDataOnDemand.getSpecificDateFares(int index) {
        init();
        if (index < 0) {
            index = 0;
        }
        if (index > (data.size() - 1)) {
            index = data.size() - 1;
        }
        DateFares obj = data.get(index);
        Long id = obj.getId();
        return DateFares.findDateFares(id);
    }
    
    public DateFares DateFaresDataOnDemand.getRandomDateFares() {
        init();
        DateFares obj = data.get(rnd.nextInt(data.size()));
        Long id = obj.getId();
        return DateFares.findDateFares(id);
    }
    
    public boolean DateFaresDataOnDemand.modifyDateFares(DateFares obj) {
        return false;
    }
    
    public void DateFaresDataOnDemand.init() {
        int from = 0;
        int to = 10;
        data = DateFares.findDateFaresEntries(from, to);
        if (data == null) {
            throw new IllegalStateException("Find entries implementation for 'DateFares' illegally returned null");
        }
        if (!data.isEmpty()) {
            return;
        }
        
        data = new ArrayList<DateFares>();
        for (int i = 0; i < 10; i++) {
            DateFares obj = getNewTransientDateFares(i);
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
