package com.atera.repository;

import com.atera.entity.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AmenityRepository extends JpaRepository<Amenity, Long> {
    List<Amenity> findByProjectIdAndIsActiveTrueOrderBySortOrderAsc(Long projectId);
}
