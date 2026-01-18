package com.atera.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "gallery_images")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GalleryImage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
    
    @Column(name = "image_url", nullable = false, length = 255)
    private String imageUrl;
    
    @Column(name = "thumbnail_url", length = 255)
    private String thumbnailUrl;
    
    @Column(length = 200)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private ImageCategory category;
    
    @Column(name = "is_active")
    private boolean isActive = true;
    
    @Column(name = "sort_order")
    private Integer sortOrder = 0;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    public enum ImageCategory {
        EXTERIOR,
        INTERIOR,
        AMENITY,
        FLOORPLAN,
        LOCATION,
        DESIGN
    }
}
