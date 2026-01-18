package com.atera.dto.contact;

import com.atera.entity.Contact;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactResponse {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String message;
    private String interestType;
    private String status;
    private String notes;
    private Long assignedToId;
    private String assignedToName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public static ContactResponse fromEntity(Contact contact) {
        return ContactResponse.builder()
                .id(contact.getId())
                .fullName(contact.getFullName())
                .email(contact.getEmail())
                .phone(contact.getPhone())
                .message(contact.getMessage())
                .interestType(contact.getInterestType() != null ? contact.getInterestType().name() : null)
                .status(contact.getStatus().name())
                .notes(contact.getNotes())
                .assignedToId(contact.getAssignedTo() != null ? contact.getAssignedTo().getId() : null)
                .assignedToName(contact.getAssignedTo() != null ? contact.getAssignedTo().getFullName() : null)
                .createdAt(contact.getCreatedAt())
                .updatedAt(contact.getUpdatedAt())
                .build();
    }
}
