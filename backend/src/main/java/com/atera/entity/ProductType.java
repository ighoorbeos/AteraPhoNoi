package com.atera.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "product_types")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductType {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
    
    @Column(nullable = false, length = 100)
    private String name; // Shophouse, Biệt thự, Liền kề
    
    @Column(name = "area_min")
    private Double areaMin;
    
    @Column(name = "area_max")
    private Double areaMax;
    
    @Column(name = "bedrooms_min")
    private Integer bedroomsMin;
    
    @Column(name = "bedrooms_max")
    private Integer bedroomsMax;
    
    @Column(name = "start_price", precision = 15, scale = 2)
    private BigDecimal startPrice;
    
    @Column(name = "image_url", length = 255)
    private String imageUrl;
    
    @Column(columnDefinition = "TEXT")
    private String features; // JSON array of features
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "is_active")
    private boolean isActive = true;
    
    @Column(name = "sort_order")
    private Integer sortOrder = 0;
    
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
