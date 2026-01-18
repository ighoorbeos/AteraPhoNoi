package com.atera.dto.contact;

import com.atera.entity.Contact;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateContactStatusRequest {
    
    @NotNull(message = "Status is required")
    private Contact.ContactStatus status;
    
    private String notes;
    
    private Long assignedToId;
}
