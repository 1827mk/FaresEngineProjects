// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.domain;

import com.nbu.fares.domain.DateFares;
import com.nbu.fares.domain.DateFaresDataOnDemand;
import com.nbu.fares.domain.DateFaresIntegrationTest;
import java.util.Iterator;
import java.util.List;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

privileged aspect DateFaresIntegrationTest_Roo_IntegrationTest {
    
    declare @type: DateFaresIntegrationTest: @RunWith(SpringJUnit4ClassRunner.class);
    
    declare @type: DateFaresIntegrationTest: @ContextConfiguration(locations = "classpath*:/META-INF/spring/applicationContext*.xml");
    
    declare @type: DateFaresIntegrationTest: @Transactional;
    
    @Autowired
    DateFaresDataOnDemand DateFaresIntegrationTest.dod;
    
    @Test
    public void DateFaresIntegrationTest.testCountDateFareses() {
        Assert.assertNotNull("Data on demand for 'DateFares' failed to initialize correctly", dod.getRandomDateFares());
        long count = DateFares.countDateFareses();
        Assert.assertTrue("Counter for 'DateFares' incorrectly reported there were no entries", count > 0);
    }
    
    @Test
    public void DateFaresIntegrationTest.testFindDateFares() {
        DateFares obj = dod.getRandomDateFares();
        Assert.assertNotNull("Data on demand for 'DateFares' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'DateFares' failed to provide an identifier", id);
        obj = DateFares.findDateFares(id);
        Assert.assertNotNull("Find method for 'DateFares' illegally returned null for id '" + id + "'", obj);
        Assert.assertEquals("Find method for 'DateFares' returned the incorrect identifier", id, obj.getId());
    }
    
    @Test
    public void DateFaresIntegrationTest.testFindAllDateFareses() {
        Assert.assertNotNull("Data on demand for 'DateFares' failed to initialize correctly", dod.getRandomDateFares());
        long count = DateFares.countDateFareses();
        Assert.assertTrue("Too expensive to perform a find all test for 'DateFares', as there are " + count + " entries; set the findAllMaximum to exceed this value or set findAll=false on the integration test annotation to disable the test", count < 250);
        List<DateFares> result = DateFares.findAllDateFareses();
        Assert.assertNotNull("Find all method for 'DateFares' illegally returned null", result);
        Assert.assertTrue("Find all method for 'DateFares' failed to return any data", result.size() > 0);
    }
    
    @Test
    public void DateFaresIntegrationTest.testFindDateFaresEntries() {
        Assert.assertNotNull("Data on demand for 'DateFares' failed to initialize correctly", dod.getRandomDateFares());
        long count = DateFares.countDateFareses();
        if (count > 20) count = 20;
        int firstResult = 0;
        int maxResults = (int) count;
        List<DateFares> result = DateFares.findDateFaresEntries(firstResult, maxResults);
        Assert.assertNotNull("Find entries method for 'DateFares' illegally returned null", result);
        Assert.assertEquals("Find entries method for 'DateFares' returned an incorrect number of entries", count, result.size());
    }
    
    @Test
    public void DateFaresIntegrationTest.testFlush() {
        DateFares obj = dod.getRandomDateFares();
        Assert.assertNotNull("Data on demand for 'DateFares' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'DateFares' failed to provide an identifier", id);
        obj = DateFares.findDateFares(id);
        Assert.assertNotNull("Find method for 'DateFares' illegally returned null for id '" + id + "'", obj);
        boolean modified =  dod.modifyDateFares(obj);
        Integer currentVersion = obj.getVersion();
        obj.flush();
        Assert.assertTrue("Version for 'DateFares' failed to increment on flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void DateFaresIntegrationTest.testMergeUpdate() {
        DateFares obj = dod.getRandomDateFares();
        Assert.assertNotNull("Data on demand for 'DateFares' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'DateFares' failed to provide an identifier", id);
        obj = DateFares.findDateFares(id);
        boolean modified =  dod.modifyDateFares(obj);
        Integer currentVersion = obj.getVersion();
        DateFares merged = (DateFares)obj.merge();
        obj.flush();
        Assert.assertEquals("Identifier of merged object not the same as identifier of original object", merged.getId(), id);
        Assert.assertTrue("Version for 'DateFares' failed to increment on merge and flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void DateFaresIntegrationTest.testPersist() {
        Assert.assertNotNull("Data on demand for 'DateFares' failed to initialize correctly", dod.getRandomDateFares());
        DateFares obj = dod.getNewTransientDateFares(Integer.MAX_VALUE);
        Assert.assertNotNull("Data on demand for 'DateFares' failed to provide a new transient entity", obj);
        Assert.assertNull("Expected 'DateFares' identifier to be null", obj.getId());
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
        Assert.assertNotNull("Expected 'DateFares' identifier to no longer be null", obj.getId());
    }
    
    @Test
    public void DateFaresIntegrationTest.testRemove() {
        DateFares obj = dod.getRandomDateFares();
        Assert.assertNotNull("Data on demand for 'DateFares' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'DateFares' failed to provide an identifier", id);
        obj = DateFares.findDateFares(id);
        obj.remove();
        obj.flush();
        Assert.assertNull("Failed to remove 'DateFares' with identifier '" + id + "'", DateFares.findDateFares(id));
    }
    
}