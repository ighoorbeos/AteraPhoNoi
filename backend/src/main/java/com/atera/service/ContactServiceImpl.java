package com.atera.service;

import com.atera.dto.contact.ContactRequest;
import com.atera.dto.contact.ContactResponse;
import com.atera.dto.contact.UpdateContactStatusRequest;
import com.atera.entity.Contact;
import com.atera.entity.User;
import com.atera.repository.ContactRepository;
import com.atera.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactServiceImpl {
    
    private final ContactRepository contactRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public ContactResponse createContact(ContactRequest request, String ipAddress, String userAgent) {
        // Rate limiting: check if same email submitted within last 5 minutes
        if (contactRepository.existsByEmailAndCreatedAtAfter(
                request.getEmail(), 
                LocalDateTime.now().minusMinutes(5))) {
            throw new RuntimeException("Bạn đã gửi yêu cầu trước đó. Vui lòng đợi 5 phút.");
        }
        
        Contact contact = Contact.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .message(request.getMessage())
                .interestType(request.getInterestType())
                .status(Contact.ContactStatus.NEW)
                .ipAddress(ipAddress)
                .userAgent(userAgent)
                .build();
        
        Contact saved = contactRepository.save(contact);
        log.info("New contact created: {} - {}", saved.getId(), saved.getEmail());
        
        // TODO: Send notification email to sales team
        
        return ContactResponse.fromEntity(saved);
    }
    
    @Transactional(readOnly = true)
    public Page<ContactResponse> getAllContacts(Pageable pageable) {
        return contactRepository.findAll(pageable)
                .map(ContactResponse::fromEntity);
    }
    
    @Transactional(readOnly = true)
    public Page<ContactResponse> getContactsByStatus(Contact.ContactStatus status, Pageable pageable) {
        return contactRepository.findByStatus(status, pageable)
                .map(ContactResponse::fromEntity);
    }
    
    @Transactional(readOnly = true)
    public ContactResponse getContactById(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));
        return ContactResponse.fromEntity(contact);
    }
    
    @Transactional
    public ContactResponse updateContactStatus(Long id, UpdateContactStatusRequest request) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));
        
        contact.setStatus(request.getStatus());
        
        if (request.getNotes() != null) {
            contact.setNotes(request.getNotes());
        }
        
        if (request.getAssignedToId() != null) {
            User assignee = userRepository.findById(request.getAssignedToId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            contact.setAssignedTo(assignee);
        }
        
        Contact updated = contactRepository.save(contact);
        log.info("Contact {} status updated to {}", id, request.getStatus());
        
        return ContactResponse.fromEntity(updated);
    }
    
    @Transactional(readOnly = true)
    public Map<String, Long> getContactStatistics() {
        Map<String, Long> stats = new HashMap<>();
        
        List<Object[]> statusCounts = contactRepository.countGroupByStatus();
        for (Object[] row : statusCounts) {
            Contact.ContactStatus status = (Contact.ContactStatus) row[0];
            Long count = (Long) row[1];
            stats.put(status.name(), count);
        }
        
        stats.put("TOTAL", contactRepository.count());
        
        return stats;
    }
    
    @Transactional
    public void deleteContact(Long id) {
        if (!contactRepository.existsById(id)) {
            throw new RuntimeException("Contact not found");
        }
        contactRepository.deleteById(id);
        log.info("Contact {} deleted", id);
    }
}
