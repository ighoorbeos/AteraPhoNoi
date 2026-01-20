package com.atera.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageDTO {
    private Long id;
    private Long conversationId;
    private String content;
    private String senderType;
    private String senderName;
    private Boolean isRead;
    private LocalDateTime createdAt;
}
