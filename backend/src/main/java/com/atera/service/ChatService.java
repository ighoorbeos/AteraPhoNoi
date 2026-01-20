package com.atera.service;

import com.atera.dto.ChatConversationDTO;
import com.atera.dto.ChatMessageDTO;
import com.atera.dto.SendMessageRequest;
import com.atera.entity.ChatConversation;
import com.atera.entity.ChatMessage;
import com.atera.repository.ChatConversationRepository;
import com.atera.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {
    
    private final ChatConversationRepository conversationRepository;
    private final ChatMessageRepository messageRepository;
    
    // Get or create conversation for visitor
    // Priority: 1. Find by phone (to restore conversation), 2. Find by visitorId, 3. Create new
    @Transactional
    public ChatConversationDTO getOrCreateConversation(String visitorId, String visitorName, String visitorPhone, String visitorEmail) {
        if (visitorId == null || visitorId.isEmpty()) {
            visitorId = UUID.randomUUID().toString();
        }
        
        final String finalVisitorId = visitorId;
        
        // First, try to find by phone number (for conversation recovery)
        ChatConversation conversation = null;
        if (visitorPhone != null && !visitorPhone.isEmpty()) {
            conversation = conversationRepository.findFirstByVisitorPhoneOrderByLastMessageAtDesc(visitorPhone)
                    .orElse(null);
        }
        
        // If not found by phone, try by visitorId
        if (conversation == null) {
            conversation = conversationRepository.findByVisitorId(finalVisitorId).orElse(null);
        }
        
        // If still not found, create new conversation
        if (conversation == null) {
            conversation = ChatConversation.builder()
                    .visitorId(finalVisitorId)
                    .visitorName(visitorName)
                    .visitorPhone(visitorPhone)
                    .visitorEmail(visitorEmail)
                    .status(ChatConversation.ConversationStatus.OPEN)
                    .build();
            conversation = conversationRepository.save(conversation);
        } else {
            // Update visitorId to new one (link old conversation to new browser session)
            conversation.setVisitorId(finalVisitorId);
        }
        
        // Update visitor info if provided
        if (visitorName != null && !visitorName.isEmpty()) {
            conversation.setVisitorName(visitorName);
        }
        if (visitorPhone != null && !visitorPhone.isEmpty()) {
            conversation.setVisitorPhone(visitorPhone);
        }
        if (visitorEmail != null && !visitorEmail.isEmpty()) {
            conversation.setVisitorEmail(visitorEmail);
        }
        conversationRepository.save(conversation);
        
        return convertToDTO(conversation);
    }
    
    // Send message from visitor
    // Priority: 1. Find by phone (to restore conversation), 2. Find by visitorId, 3. Create new
    @Transactional
    public ChatMessageDTO sendVisitorMessage(SendMessageRequest request) {
        String visitorId = request.getVisitorId();
        if (visitorId == null || visitorId.isEmpty()) {
            visitorId = UUID.randomUUID().toString();
        }
        
        final String finalVisitorId = visitorId;
        
        // First, try to find by phone number (for conversation recovery)
        ChatConversation conversation = null;
        String phone = request.getVisitorPhone();
        if (phone != null && !phone.isEmpty()) {
            conversation = conversationRepository.findFirstByVisitorPhoneOrderByLastMessageAtDesc(phone)
                    .orElse(null);
            if (conversation != null) {
                // Link old conversation to new browser session
                conversation.setVisitorId(finalVisitorId);
            }
        }
        
        // If not found by phone, try by visitorId
        if (conversation == null) {
            conversation = conversationRepository.findByVisitorId(finalVisitorId).orElse(null);
        }
        
        // If still not found, create new conversation
        if (conversation == null) {
            conversation = ChatConversation.builder()
                    .visitorId(finalVisitorId)
                    .visitorName(request.getVisitorName())
                    .visitorPhone(request.getVisitorPhone())
                    .status(ChatConversation.ConversationStatus.OPEN)
                    .build();
            conversation = conversationRepository.save(conversation);
        }
        
        ChatMessage message = ChatMessage.builder()
                .conversation(conversation)
                .content(request.getContent())
                .senderType(ChatMessage.SenderType.VISITOR)
                .senderName(request.getVisitorName() != null ? request.getVisitorName() : "Khách")
                .isRead(false)
                .build();
        
        message = messageRepository.save(message);
        
        // Update conversation
        conversation.setLastMessageAt(LocalDateTime.now());
        conversation.setUnreadCount(conversation.getUnreadCount() + 1);
        conversation.setStatus(ChatConversation.ConversationStatus.OPEN);
        conversationRepository.save(conversation);
        
        return convertToMessageDTO(message);
    }
    
    // Send message from admin
    @Transactional
    public ChatMessageDTO sendAdminMessage(Long conversationId, String content, String adminName) {
        ChatConversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy cuộc trò chuyện"));
        
        ChatMessage message = ChatMessage.builder()
                .conversation(conversation)
                .content(content)
                .senderType(ChatMessage.SenderType.ADMIN)
                .senderName(adminName != null ? adminName : "Admin")
                .isRead(true)
                .build();
        
        message = messageRepository.save(message);
        
        // Update conversation
        conversation.setLastMessageAt(LocalDateTime.now());
        conversationRepository.save(conversation);
        
        return convertToMessageDTO(message);
    }
    
    // Get all conversations for admin
    public List<ChatConversationDTO> getAllConversations() {
        return conversationRepository.findAllByOrderByLastMessageAtDesc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Get conversation by ID with messages
    @Transactional
    public ChatConversationDTO getConversationWithMessages(Long conversationId) {
        ChatConversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy cuộc trò chuyện"));
        
        // Mark messages as read
        messageRepository.markMessagesAsRead(conversationId);
        conversation.setUnreadCount(0);
        conversationRepository.save(conversation);
        
        List<ChatMessage> messages = messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);
        
        ChatConversationDTO dto = convertToDTO(conversation);
        dto.setMessages(messages.stream().map(this::convertToMessageDTO).collect(Collectors.toList()));
        
        return dto;
    }
    
    // Get messages for visitor
    public ChatConversationDTO getConversationByVisitorId(String visitorId) {
        ChatConversation conversation = conversationRepository.findByVisitorId(visitorId)
                .orElse(null);
        
        if (conversation == null) {
            return null;
        }
        
        List<ChatMessage> messages = messageRepository.findByConversationIdOrderByCreatedAtAsc(conversation.getId());
        
        ChatConversationDTO dto = convertToDTO(conversation);
        dto.setMessages(messages.stream().map(this::convertToMessageDTO).collect(Collectors.toList()));
        
        return dto;
    }
    
    // Get total unread count for admin
    public Long getTotalUnreadCount() {
        Long count = conversationRepository.getTotalUnreadCount();
        return count != null ? count : 0L;
    }
    
    // Close conversation
    @Transactional
    public void closeConversation(Long conversationId) {
        ChatConversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy cuộc trò chuyện"));
        conversation.setStatus(ChatConversation.ConversationStatus.CLOSED);
        conversationRepository.save(conversation);
    }
    
    // Convert entities to DTOs
    private ChatConversationDTO convertToDTO(ChatConversation conversation) {
        String lastMessage = "";
        if (conversation.getMessages() != null && !conversation.getMessages().isEmpty()) {
            lastMessage = conversation.getMessages().get(conversation.getMessages().size() - 1).getContent();
        }
        
        return ChatConversationDTO.builder()
                .id(conversation.getId())
                .visitorId(conversation.getVisitorId())
                .visitorName(conversation.getVisitorName())
                .visitorPhone(conversation.getVisitorPhone())
                .visitorEmail(conversation.getVisitorEmail())
                .status(conversation.getStatus().name())
                .unreadCount(conversation.getUnreadCount())
                .lastMessage(lastMessage)
                .lastMessageAt(conversation.getLastMessageAt())
                .createdAt(conversation.getCreatedAt())
                .build();
    }
    
    private ChatMessageDTO convertToMessageDTO(ChatMessage message) {
        return ChatMessageDTO.builder()
                .id(message.getId())
                .conversationId(message.getConversation().getId())
                .content(message.getContent())
                .senderType(message.getSenderType().name())
                .senderName(message.getSenderName())
                .isRead(message.getIsRead())
                .createdAt(message.getCreatedAt())
                .build();
    }
}
