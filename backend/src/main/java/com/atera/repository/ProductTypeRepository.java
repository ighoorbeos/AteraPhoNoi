package com.atera.repository;

import com.atera.entity.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {
    List<ProductType> findByProjectIdAndIsActiveTrueOrderBySortOrderAsc(Long projectId);
}
