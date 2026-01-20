package com.atera.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatConversationDTO {
    private Long id;
    private String visitorId;
    private String visitorName;
    private String visitorPhone;
    private String visitorEmail;
    private String status;
    private Integer unreadCount;
    private String lastMessage;
    private LocalDateTime lastMessageAt;
    private LocalDateTime createdAt;
    private List<ChatMessageDTO> messages;
}
