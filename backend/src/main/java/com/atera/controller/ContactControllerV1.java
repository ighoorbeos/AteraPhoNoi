package com.atera.controller;

import com.atera.dto.ApiResponse;
import com.atera.dto.PageResponse;
import com.atera.dto.contact.ContactRequest;
import com.atera.dto.contact.ContactResponse;
import com.atera.dto.contact.UpdateContactStatusRequest;
import com.atera.entity.Contact;
import com.atera.service.ContactServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ContactControllerV1 {
    
    private final ContactServiceImpl contactService;
    
    /**
     * POST /api/v1/contacts
     * Public endpoint - Submit contact form from landing page
     */
    @PostMapping("/contacts")
    public ResponseEntity<ApiResponse<ContactResponse>> submitContact(
            @Valid @RequestBody ContactRequest request,
            HttpServletRequest httpRequest) {
        
        String ipAddress = getClientIpAddress(httpRequest);
        String userAgent = httpRequest.getHeader("User-Agent");
        
        ContactResponse response = contactService.createContact(request, ipAddress, userAgent);
        return ResponseEntity.ok(ApiResponse.success(
                "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.",
                response
        ));
    }
    
    /**
     * GET /api/v1/contacts
     * Protected endpoint - Get all contacts (Admin/Sales only)
     */
    @GetMapping("/contacts")
    @PreAuthorize("hasAnyRole('ADMIN', 'SALES')")
    public ResponseEntity<ApiResponse<PageResponse<ContactResponse>>> getAllContacts(
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        
        Page<ContactResponse> page = contactService.getAllContacts(pageable);
        return ResponseEntity.ok(ApiResponse.success(PageResponse.from(page)));
    }
    
    /**
     * GET /api/v1/contacts/{id}
     * Protected endpoint - Get contact by ID (Admin/Sales only)
     */
    @GetMapping("/contacts/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SALES')")
    public ResponseEntity<ApiResponse<ContactResponse>> getContactById(@PathVariable Long id) {
        ContactResponse response = contactService.getContactById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    /**
     * GET /api/v1/contacts/status/{status}
     * Protected endpoint - Get contacts by status (Admin/Sales only)
     */
    @GetMapping("/contacts/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SALES')")
    public ResponseEntity<ApiResponse<PageResponse<ContactResponse>>> getContactsByStatus(
            @PathVariable Contact.ContactStatus status,
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        
        Page<ContactResponse> page = contactService.getContactsByStatus(status, pageable);
        return ResponseEntity.ok(ApiResponse.success(PageResponse.from(page)));
    }
    
    /**
     * PATCH /api/v1/contacts/{id}/status
     * Protected endpoint - Update contact status (Admin/Sales only)
     */
    @PatchMapping("/contacts/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'SALES')")
    public ResponseEntity<ApiResponse<ContactResponse>> updateContactStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateContactStatusRequest request) {
        
        ContactResponse response = contactService.updateContactStatus(id, request);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật trạng thái thành công", response));
    }
    
    /**
     * GET /api/v1/contacts/statistics
     * Protected endpoint - Get contact statistics (Admin only)
     */
    @GetMapping("/contacts/statistics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getStatistics() {
        Map<String, Long> stats = contactService.getContactStatistics();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
    
    /**
     * DELETE /api/v1/contacts/{id}
     * Protected endpoint - Delete contact (Admin only)
     */
    @DeleteMapping("/contacts/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa liên hệ thành công", null));
    }
    
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
