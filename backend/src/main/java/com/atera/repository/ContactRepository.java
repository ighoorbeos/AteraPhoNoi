package com.atera.repository;

import com.atera.entity.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    
    Page<Contact> findByStatus(Contact.ContactStatus status, Pageable pageable);
    
    Page<Contact> findByAssignedToId(Long userId, Pageable pageable);
    
    @Query("SELECT c FROM Contact c WHERE c.createdAt BETWEEN :startDate AND :endDate")
    List<Contact> findByDateRange(@Param("startDate") LocalDateTime startDate, 
                                   @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT COUNT(c) FROM Contact c WHERE c.status = :status")
    long countByStatus(@Param("status") Contact.ContactStatus status);
    
    @Query("SELECT c.status, COUNT(c) FROM Contact c GROUP BY c.status")
    List<Object[]> countGroupByStatus();
    
    boolean existsByEmailAndCreatedAtAfter(String email, LocalDateTime time);
}
