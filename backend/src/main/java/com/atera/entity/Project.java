package com.atera.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 200)
    private String name;
    
    @Column(length = 500)
    private String slogan;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(length = 500)
    private String address;
    
    @Column(name = "total_area")
    private Double totalArea; // hecta
    
    @Column(name = "total_units")
    private Integer totalUnits;
    
    @Column(name = "building_density")
    private Double buildingDensity; // %
    
    @Column(length = 200)
    private String developer;
    
    @Column(name = "start_price", precision = 15, scale = 2)
    private BigDecimal startPrice;
    
    @Column(name = "price_unit", length = 20)
    private String priceUnit = "VND";
    
    @Column(length = 100)
    private String status;
    
    @Column(name = "sales_phone", length = 20)
    private String salesPhone;
    
    @Column(name = "sales_email", length = 100)
    private String salesEmail;
    
    @Column(name = "facebook_url", length = 255)
    private String facebookUrl;
    
    @Column(name = "zalo_url", length = 255)
    private String zaloUrl;
    
    @Column(name = "youtube_video_url", length = 255)
    private String youtubeVideoUrl;
    
    @Column(name = "google_maps_embed", columnDefinition = "TEXT")
    private String googleMapsEmbed;
    
    @Column(name = "latitude")
    private Double latitude;
    
    @Column(name = "longitude")
    private Double longitude;
    
    @Column(name = "is_active")
    private boolean isActive = true;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
