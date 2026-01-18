package com.atera.dto.project;

import com.atera.entity.Project;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponse {
    private Long id;
    private String name;
    private String slogan;
    private String description;
    private String address;
    private Double totalArea;
    private Integer totalUnits;
    private Double buildingDensity;
    private String developer;
    private BigDecimal startPrice;
    private String priceUnit;
    private String status;
    private String salesPhone;
    private String salesEmail;
    private String facebookUrl;
    private String zaloUrl;
    private String youtubeVideoUrl;
    private String googleMapsEmbed;
    private Double latitude;
    private Double longitude;
    
    private List<ProductTypeDto> productTypes;
    private List<AmenityDto> amenities;
    private List<GalleryImageDto> galleryImages;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductTypeDto {
        private Long id;
        private String name;
        private Double areaMin;
        private Double areaMax;
        private Integer bedroomsMin;
        private Integer bedroomsMax;
        private BigDecimal startPrice;
        private String imageUrl;
        private List<String> features;
        private String description;
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AmenityDto {
        private Long id;
        private String name;
        private String description;
        private String iconName;
        private String imageUrl;
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GalleryImageDto {
        private Long id;
        private String imageUrl;
        private String thumbnailUrl;
        private String title;
        private String description;
        private String category;
    }
    
    public static ProjectResponse fromEntity(Project project) {
        return ProjectResponse.builder()
                .id(project.getId())
                .name(project.getName())
                .slogan(project.getSlogan())
                .description(project.getDescription())
                .address(project.getAddress())
                .totalArea(project.getTotalArea())
                .totalUnits(project.getTotalUnits())
                .buildingDensity(project.getBuildingDensity())
                .developer(project.getDeveloper())
                .startPrice(project.getStartPrice())
                .priceUnit(project.getPriceUnit())
                .status(project.getStatus())
                .salesPhone(project.getSalesPhone())
                .salesEmail(project.getSalesEmail())
                .facebookUrl(project.getFacebookUrl())
                .zaloUrl(project.getZaloUrl())
                .youtubeVideoUrl(project.getYoutubeVideoUrl())
                .googleMapsEmbed(project.getGoogleMapsEmbed())
                .latitude(project.getLatitude())
                .longitude(project.getLongitude())
                .build();
    }
}
