package com.atera.repository;

import com.atera.entity.ChatConversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatConversationRepository extends JpaRepository<ChatConversation, Long> {
    
    Optional<ChatConversation> findByVisitorId(String visitorId);
    
    // Find by phone number for conversation recovery
    Optional<ChatConversation> findByVisitorPhone(String visitorPhone);
    
    // Find by phone, prioritize most recent
    Optional<ChatConversation> findFirstByVisitorPhoneOrderByLastMessageAtDesc(String visitorPhone);
    
    List<ChatConversation> findAllByOrderByLastMessageAtDesc();
    
    List<ChatConversation> findByStatusOrderByLastMessageAtDesc(ChatConversation.ConversationStatus status);
    
    @Query("SELECT c FROM ChatConversation c WHERE c.unreadCount > 0 ORDER BY c.lastMessageAt DESC")
    List<ChatConversation> findConversationsWithUnreadMessages();
    
    @Query("SELECT SUM(c.unreadCount) FROM ChatConversation c")
    Long getTotalUnreadCount();
    
    @Modifying
    @Query("UPDATE ChatConversation c SET c.unreadCount = 0 WHERE c.id = :conversationId")
    void markAsRead(@Param("conversationId") Long conversationId);
}
