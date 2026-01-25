package com.atera.service;

import com.atera.entity.Contact;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:noreply@atera.com}")
    private String fromEmail;

    @Value("${app.admin.email:admin@atera.com}")
    private String adminEmail;

    /**
     * Gửi email thông báo cho admin khi có contact mới
     */
    public void sendNewContactNotification(Contact contact) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(adminEmail);
            helper.setSubject("[ATERA PHỐ NỐI] Yêu cầu tư vấn mới từ " + contact.getFullName());

            String emailContent = buildContactNotificationEmail(contact);
            helper.setText(emailContent, true);

            mailSender.send(message);
            log.info("Sent contact notification email for: {}", contact.getFullName());
        } catch (MessagingException e) {
            log.error("Failed to send contact notification email", e);
        }
    }

    /**
     * Gửi email cảm ơn cho khách hàng
     */
    public void sendThankYouEmail(Contact contact) {
        if (contact.getEmail() == null || contact.getEmail().isEmpty()) {
            log.info("No email provided for contact: {}", contact.getFullName());
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(contact.getEmail());
            helper.setSubject("Cảm ơn bạn đã quan tâm đến ATERA PHỐ NỐI");

            String emailContent = buildThankYouEmail(contact);
            helper.setText(emailContent, true);

            mailSender.send(message);
            log.info("Sent thank you email to: {}", contact.getEmail());
        } catch (MessagingException e) {
            log.error("Failed to send thank you email", e);
        }
    }

    private String buildContactNotificationEmail(Contact contact) {
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                        .info-row { margin: 15px 0; padding: 10px; background: white; border-radius: 5px; }
                        .label { font-weight: bold; color: #d4af37; }
                        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1 style="margin: 0; font-size: 24px;">🏢 ATERA PHỐ NỐI</h1>
                            <p style="margin: 10px 0 0 0;">Yêu cầu tư vấn mới</p>
                        </div>
                        <div class="content">
                            <h2 style="color: #1a1a2e; margin-top: 0;">Thông tin khách hàng:</h2>
                            
                            <div class="info-row">
                                <span class="label">Họ tên:</span> %s
                            </div>
                            
                            <div class="info-row">
                                <span class="label">Số điện thoại:</span> %s
                            </div>
                            
                            <div class="info-row">
                                <span class="label">Email:</span> %s
                            </div>
                            
                            <div class="info-row">
                                <span class="label">Sản phẩm quan tâm:</span> %s
                            </div>
                            
                            <div class="info-row">
                                <span class="label">Tin nhắn:</span><br/>
                                <p style="margin: 10px 0; white-space: pre-wrap;">%s</p>
                            </div>
                            
                            <div class="info-row">
                                <span class="label">Thời gian:</span> %s
                            </div>
                        </div>
                        <div class="footer">
                            <p>Email tự động từ hệ thống ATERA PHỐ NỐI</p>
                            <p>Hotline: 0909 888 999</p>
                        </div>
                    </div>
                </body>
                </html>
                """.formatted(
                contact.getFullName(),
                contact.getPhone(),
                contact.getEmail() != null ? contact.getEmail() : "Không cung cấp",
                contact.getInterestType() != null ? contact.getInterestType().toString() : "Chưa chọn",
                contact.getMessage() != null ? contact.getMessage() : "Không có tin nhắn",
                contact.getCreatedAt().toString()
        );
    }

    private String buildThankYouEmail(Contact contact) {
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                        .highlight { color: #d4af37; font-weight: bold; }
                        .contact-box { background: white; padding: 20px; margin: 20px 0; border-radius: 10px; text-align: center; }
                        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1 style="margin: 0; font-size: 28px;">🏢 ATERA PHỐ NỐI</h1>
                            <p style="margin: 10px 0 0 0; font-size: 16px;">Khu đô thị sinh thái cao cấp</p>
                        </div>
                        <div class="content">
                            <h2 style="color: #1a1a2e;">Xin chào <span class="highlight">%s</span>,</h2>
                            
                            <p>Cảm ơn bạn đã quan tâm đến dự án <strong>ATERA PHỐ NỐI</strong>!</p>
                            
                            <p>Chúng tôi đã nhận được thông tin đăng ký của bạn và sẽ liên hệ lại trong thời gian sớm nhất để tư vấn chi tiết về:</p>
                            
                            <ul style="padding-left: 20px;">
                                <li>Thông tin dự án và vị trí</li>
                                <li>Các loại sản phẩm: Shophouse, Chung cư cao cấp, Liền kề</li>
                                <li>Chính sách bán hàng và ưu đãi đặc biệt</li>
                                <li>Tiến độ xây dựng và bàn giao</li>
                            </ul>
                            
                            <div class="contact-box">
                                <h3 style="color: #1a1a2e; margin-top: 0;">📞 Liên hệ ngay</h3>
                                <p style="margin: 10px 0;">
                                    <strong>Hotline:</strong> <span class="highlight">0909 888 999</span>
                                </p>
                                <p style="margin: 10px 0;">
                                    <strong>Email:</strong> contact@atera-phonoi.vn
                                </p>
                                <p style="margin: 10px 0;">
                                    <strong>Giờ làm việc:</strong> 8:00 - 21:00 (Tất cả các ngày)
                                </p>
                            </div>
                            
                            <p style="text-align: center; margin-top: 30px;">
                                <strong>Hãy đến trải nghiệm nhà mẫu tại showroom của chúng tôi!</strong>
                            </p>
                        </div>
                        <div class="footer">
                            <p>Trân trọng,</p>
                            <p><strong>Đội ngũ tư vấn ATERA PHỐ NỐI</strong></p>
                        </div>
                    </div>
                </body>
                </html>
                """.formatted(contact.getFullName());
    }
}
