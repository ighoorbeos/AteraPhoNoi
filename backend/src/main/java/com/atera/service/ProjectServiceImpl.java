package com.atera.service;

import com.atera.dto.project.ProjectResponse;
import com.atera.entity.*;
import com.atera.repository.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectServiceImpl {
    
    private final ProjectRepository projectRepository;
    private final ProductTypeRepository productTypeRepository;
    private final AmenityRepository amenityRepository;
    private final GalleryImageRepository galleryImageRepository;
    private final ObjectMapper objectMapper;
    
    @Transactional(readOnly = true)
    public ProjectResponse getActiveProject() {
        Project project = projectRepository.findFirstByIsActiveTrue()
                .orElseThrow(() -> new RuntimeException("No active project found"));
        
        return buildProjectResponse(project);
    }
    
    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        return buildProjectResponse(project);
    }
    
    private ProjectResponse buildProjectResponse(Project project) {
        ProjectResponse response = ProjectResponse.fromEntity(project);
        
        // Load product types
        List<ProductType> productTypes = productTypeRepository
                .findByProjectIdAndIsActiveTrueOrderBySortOrderAsc(project.getId());
        response.setProductTypes(productTypes.stream()
                .map(this::toProductTypeDto)
                .collect(Collectors.toList()));
        
        // Load amenities
        List<Amenity> amenities = amenityRepository
                .findByProjectIdAndIsActiveTrueOrderBySortOrderAsc(project.getId());
        response.setAmenities(amenities.stream()
                .map(this::toAmenityDto)
                .collect(Collectors.toList()));
        
        // Load gallery images
        List<GalleryImage> images = galleryImageRepository
                .findByProjectIdAndIsActiveTrueOrderBySortOrderAsc(project.getId());
        response.setGalleryImages(images.stream()
                .map(this::toGalleryImageDto)
                .collect(Collectors.toList()));
        
        return response;
    }
    
    private ProjectResponse.ProductTypeDto toProductTypeDto(ProductType pt) {
        List<String> features = Collections.emptyList();
        if (pt.getFeatures() != null) {
            try {
                features = objectMapper.readValue(pt.getFeatures(), 
                        new TypeReference<List<String>>() {});
            } catch (Exception e) {
                log.warn("Failed to parse features for product type {}", pt.getId());
            }
        }
        
        return ProjectResponse.ProductTypeDto.builder()
                .id(pt.getId())
                .name(pt.getName())
                .areaMin(pt.getAreaMin())
                .areaMax(pt.getAreaMax())
                .bedroomsMin(pt.getBedroomsMin())
                .bedroomsMax(pt.getBedroomsMax())
                .startPrice(pt.getStartPrice())
                .imageUrl(pt.getImageUrl())
                .features(features)
                .description(pt.getDescription())
                .build();
    }
    
    private ProjectResponse.AmenityDto toAmenityDto(Amenity amenity) {
        return ProjectResponse.AmenityDto.builder()
                .id(amenity.getId())
                .name(amenity.getName())
                .description(amenity.getDescription())
                .iconName(amenity.getIconName())
                .imageUrl(amenity.getImageUrl())
                .build();
    }
    
    private ProjectResponse.GalleryImageDto toGalleryImageDto(GalleryImage image) {
        return ProjectResponse.GalleryImageDto.builder()
                .id(image.getId())
                .imageUrl(image.getImageUrl())
                .thumbnailUrl(image.getThumbnailUrl())
                .title(image.getTitle())
                .description(image.getDescription())
                .category(image.getCategory() != null ? image.getCategory().name() : null)
                .build();
    }
}
