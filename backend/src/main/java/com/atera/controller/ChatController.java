package com.atera.controller;

import com.atera.dto.ChatConversationDTO;
import com.atera.dto.ChatMessageDTO;
import com.atera.dto.SendMessageRequest;
import com.atera.service.ChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
public class ChatController {
    
    private final ChatService chatService;
    
    // ==================== VISITOR ENDPOINTS ====================
    
    /**
     * Get or create conversation for visitor
     */
    @PostMapping("/visitor/conversation")
    public ResponseEntity<Map<String, Object>> getOrCreateConversation(
            @RequestParam(required = false) String visitorId,
            @RequestParam(required = false) String visitorName,
            @RequestParam(required = false) String visitorPhone,
            @RequestParam(required = false) String visitorEmail) {
        
        ChatConversationDTO conversation = chatService.getOrCreateConversation(
                visitorId, visitorName, visitorPhone, visitorEmail);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", conversation);
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Send message from visitor
     */
    @PostMapping("/visitor/send")
    public ResponseEntity<Map<String, Object>> sendVisitorMessage(
            @Valid @RequestBody SendMessageRequest request) {
        
        ChatMessageDTO message = chatService.sendVisitorMessage(request);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", message);
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Get conversation messages for visitor
     */
    @GetMapping("/visitor/messages")
    public ResponseEntity<Map<String, Object>> getVisitorMessages(
            @RequestParam String visitorId) {
        
        ChatConversationDTO conversation = chatService.getConversationByVisitorId(visitorId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", conversation);
        
        return ResponseEntity.ok(response);
    }
    
    // ==================== ADMIN ENDPOINTS ====================
    
    /**
     * Get all conversations for admin
     */
    @GetMapping("/admin/conversations")
    public ResponseEntity<Map<String, Object>> getAllConversations() {
        List<ChatConversationDTO> conversations = chatService.getAllConversations();
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", conversations);
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Get conversation with messages for admin
     */
    @GetMapping("/admin/conversations/{id}")
    public ResponseEntity<Map<String, Object>> getConversation(@PathVariable Long id) {
        ChatConversationDTO conversation = chatService.getConversationWithMessages(id);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", conversation);
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Send message from admin
     */
    @PostMapping("/admin/send/{conversationId}")
    public ResponseEntity<Map<String, Object>> sendAdminMessage(
            @PathVariable Long conversationId,
            @RequestBody Map<String, String> request) {
        
        String content = request.get("content");
        String adminName = request.getOrDefault("adminName", "Admin");
        
        ChatMessageDTO message = chatService.sendAdminMessage(conversationId, content, adminName);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", message);
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Get unread count for admin
     */
    @GetMapping("/admin/unread-count")
    public ResponseEntity<Map<String, Object>> getUnreadCount() {
        Long count = chatService.getTotalUnreadCount();
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("count", count);
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Close conversation
     */
    @PostMapping("/admin/conversations/{id}/close")
    public ResponseEntity<Map<String, Object>> closeConversation(@PathVariable Long id) {
        chatService.closeConversation(id);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Đã đóng cuộc trò chuyện");
        
        return ResponseEntity.ok(response);
    }
}
