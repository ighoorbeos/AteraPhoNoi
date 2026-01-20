package com.atera.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SendMessageRequest {
    
    private String visitorId;
    
    @NotBlank(message = "Nội dung tin nhắn không được để trống")
    private String content;
    
    private String visitorName;
    private String visitorPhone;
    private String visitorEmail;
}
