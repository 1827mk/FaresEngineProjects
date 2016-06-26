// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.nbu.fares.domain;

import com.nbu.fares.domain.Fares;
import com.nbu.fares.domain.FaresDataOnDemand;
import com.nbu.fares.domain.FaresIntegrationTest;
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

privileged aspect FaresIntegrationTest_Roo_IntegrationTest {
    
    declare @type: FaresIntegrationTest: @RunWith(SpringJUnit4ClassRunner.class);
    
    declare @type: FaresIntegrationTest: @ContextConfiguration(locations = "classpath*:/META-INF/spring/applicationContext*.xml");
    
    declare @type: FaresIntegrationTest: @Transactional;
    
    @Autowired
    FaresDataOnDemand FaresIntegrationTest.dod;
    
    @Test
    public void FaresIntegrationTest.testCountFareses() {
        Assert.assertNotNull("Data on demand for 'Fares' failed to initialize correctly", dod.getRandomFares());
        long count = Fares.countFareses();
        Assert.assertTrue("Counter for 'Fares' incorrectly reported there were no entries", count > 0);
    }
    
    @Test
    public void FaresIntegrationTest.testFindFares() {
        Fares obj = dod.getRandomFares();
        Assert.assertNotNull("Data on demand for 'Fares' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Fares' failed to provide an identifier", id);
        obj = Fares.findFares(id);
        Assert.assertNotNull("Find method for 'Fares' illegally returned null for id '" + id + "'", obj);
        Assert.assertEquals("Find method for 'Fares' returned the incorrect identifier", id, obj.getId());
    }
    
    @Test
    public void FaresIntegrationTest.testFindAllFareses() {
        Assert.assertNotNull("Data on demand for 'Fares' failed to initialize correctly", dod.getRandomFares());
        long count = Fares.countFareses();
        Assert.assertTrue("Too expensive to perform a find all test for 'Fares', as there are " + count + " entries; set the findAllMaximum to exceed this value or set findAll=false on the integration test annotation to disable the test", count < 250);
        List<Fares> result = Fares.findAllFareses();
        Assert.assertNotNull("Find all method for 'Fares' illegally returned null", result);
        Assert.assertTrue("Find all method for 'Fares' failed to return any data", result.size() > 0);
    }
    
    @Test
    public void FaresIntegrationTest.testFindFaresEntries() {
        Assert.assertNotNull("Data on demand for 'Fares' failed to initialize correctly", dod.getRandomFares());
        long count = Fares.countFareses();
        if (count > 20) count = 20;
        int firstResult = 0;
        int maxResults = (int) count;
        List<Fares> result = Fares.findFaresEntries(firstResult, maxResults);
        Assert.assertNotNull("Find entries method for 'Fares' illegally returned null", result);
        Assert.assertEquals("Find entries method for 'Fares' returned an incorrect number of entries", count, result.size());
    }
    
    @Test
    public void FaresIntegrationTest.testFlush() {
        Fares obj = dod.getRandomFares();
        Assert.assertNotNull("Data on demand for 'Fares' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Fares' failed to provide an identifier", id);
        obj = Fares.findFares(id);
        Assert.assertNotNull("Find method for 'Fares' illegally returned null for id '" + id + "'", obj);
        boolean modified =  dod.modifyFares(obj);
        Integer currentVersion = obj.getVersion();
        obj.flush();
        Assert.assertTrue("Version for 'Fares' failed to increment on flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void FaresIntegrationTest.testMergeUpdate() {
        Fares obj = dod.getRandomFares();
        Assert.assertNotNull("Data on demand for 'Fares' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Fares' failed to provide an identifier", id);
        obj = Fares.findFares(id);
        boolean modified =  dod.modifyFares(obj);
        Integer currentVersion = obj.getVersion();
        Fares merged = (Fares)obj.merge();
        obj.flush();
        Assert.assertEquals("Identifier of merged object not the same as identifier of original object", merged.getId(), id);
        Assert.assertTrue("Version for 'Fares' failed to increment on merge and flush directive", (currentVersion != null && obj.getVersion() > currentVersion) || !modified);
    }
    
    @Test
    public void FaresIntegrationTest.testPersist() {
        Assert.assertNotNull("Data on demand for 'Fares' failed to initialize correctly", dod.getRandomFares());
        Fares obj = dod.getNewTransientFares(Integer.MAX_VALUE);
        Assert.assertNotNull("Data on demand for 'Fares' failed to provide a new transient entity", obj);
        Assert.assertNull("Expected 'Fares' identifier to be null", obj.getId());
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
        Assert.assertNotNull("Expected 'Fares' identifier to no longer be null", obj.getId());
    }
    
    @Test
    public void FaresIntegrationTest.testRemove() {
        Fares obj = dod.getRandomFares();
        Assert.assertNotNull("Data on demand for 'Fares' failed to initialize correctly", obj);
        Long id = obj.getId();
        Assert.assertNotNull("Data on demand for 'Fares' failed to provide an identifier", id);
        obj = Fares.findFares(id);
        obj.remove();
        obj.flush();
        Assert.assertNull("Failed to remove 'Fares' with identifier '" + id + "'", Fares.findFares(id));
    }
    
}
