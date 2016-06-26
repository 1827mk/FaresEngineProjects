package com.nbu.fares.repository;

import com.nbu.fares.domain.Fares;
import org.omg.PortableInterceptor.LOCATION_FORWARD;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by tanaphatdev on 20/5/2559.
 */
@Repository
public interface FaresRepository extends JpaSpecificationExecutor<Fares>, JpaRepository<Fares,Long>,PagingAndSortingRepository<Fares,Long>,CrudRepository<Fares,Long> {
}
