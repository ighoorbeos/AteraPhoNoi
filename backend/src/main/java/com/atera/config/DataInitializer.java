package com.atera.config;

import com.atera.entity.*;
import com.atera.repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ProductTypeRepository productTypeRepository;
    private final AmenityRepository amenityRepository;
    private final GalleryImageRepository galleryImageRepository;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;
    
    @Override
    public void run(String... args) throws Exception {
        // Create default admin user if not exists
        if (!userRepository.existsByUsername("admin")) {
            User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .email("admin@atera.vn")
                    .fullName("Administrator")
                    .phone("0901234567")
                    .role(User.Role.ADMIN)
                    .isActive(true)
                    .build();
            userRepository.save(admin);
            log.info("Default admin user created: admin / admin123");
        }
        
        // Create default project if not exists
        if (projectRepository.count() == 0) {
            Project project = Project.builder()
                    .name("ATERA PHỐ NỐI")
                    .slogan("Điểm đến lý tưởng cho cuộc sống hiện đại và thịnh vượng")
                    .description("ATERA PHỐ NỐI là khu đô thị sinh thái cao cấp được phát triển bởi những chủ đầu tư uy tín hàng đầu Việt Nam. Với quy mô 15.2 hecta và mật độ xây dựng chỉ 35%, dự án mang đến không gian sống xanh mát, hiện đại và đẳng cấp ngay tại trung tâm thị trấn Phố Nối, Hưng Yên.")
                    .address("Thị trấn Phố Nối, Huyện Văn Lâm, Tỉnh Hưng Yên")
                    .totalArea(15.2)
                    .totalUnits(500)
                    .buildingDensity(35.0)
                    .developer("Công ty CP Đầu tư & Phát triển ATERA")
                    .startPrice(new BigDecimal("2800000000"))
                    .priceUnit("VND")
                    .status("Đang mở bán")
                    .salesPhone("0901234567")
                    .salesEmail("sales@atera-phonoi.vn")
                    .facebookUrl("https://facebook.com/ateraphinoi")
                    .zaloUrl("https://zalo.me/0901234567")
                    .latitude(20.9456)
                    .longitude(106.0567)
                    .isActive(true)
                    .build();
            
            project = projectRepository.save(project);
            log.info("Default project created: {}", project.getName());
            
            // Create product types
            createProductTypes(project);
            
            // Create amenities
            createAmenities(project);
            
            // Create gallery images
            createGalleryImages(project);
        }
    }
    
    private void createProductTypes(Project project) throws Exception {
        List<ProductType> productTypes = Arrays.asList(
            ProductType.builder()
                    .project(project)
                    .name("Shophouse")
                    .areaMin(80.0)
                    .areaMax(120.0)
                    .bedroomsMin(3)
                    .bedroomsMax(4)
                    .startPrice(new BigDecimal("3500000000"))
                    .imageUrl("/images/floorplans/floorplan-1.png")
                    .features(objectMapper.writeValueAsString(Arrays.asList(
                            "Mặt tiền kinh doanh", "2 mặt thoáng", "Thiết kế linh hoạt")))
                    .sortOrder(1)
                    .isActive(true)
                    .build(),
            ProductType.builder()
                    .project(project)
                    .name("Chung cư cao cấp")
                    .imageUrl("/images/floorplans/floorplan-2.png")
                    .features(objectMapper.writeValueAsString(Arrays.asList(
                            "View đẹp", "Tiện ích đầy đủ", "An ninh 24/7")))
                    .sortOrder(2)
                    .isActive(true)
                    .build(),
            ProductType.builder()
                    .project(project)
                    .name("Liền kề")
                    .areaMin(75.0)
                    .areaMax(90.0)
                    .bedroomsMin(3)
                    .bedroomsMax(3)
                    .startPrice(new BigDecimal("2800000000"))
                    .imageUrl("/images/floorplans/floorplan-3.png")
                    .features(objectMapper.writeValueAsString(Arrays.asList(
                            "Thiết kế thông minh", "Không gian tối ưu", "Giá tốt nhất")))
                    .sortOrder(3)
                    .isActive(true)
                    .build()
        );
        
        productTypeRepository.saveAll(productTypes);
        log.info("Created {} product types", productTypes.size());
    }
    
    private void createAmenities(Project project) {
        List<Amenity> amenities = Arrays.asList(
            Amenity.builder().project(project).name("Hồ bơi 4 mùa")
                    .description("Bể bơi hiện đại với hệ thống lọc nước tiên tiến")
                    .iconName("FaSwimmingPool").imageUrl("/images/amenities/amenities-1.png")
                    .sortOrder(1).isActive(true).build(),
            Amenity.builder().project(project).name("Gym & Spa")
                    .description("Trung tâm thể thao đa năng và spa thư giãn")
                    .iconName("FaRunning").imageUrl("/images/amenities/amenities-2.png")
                    .sortOrder(2).isActive(true).build(),
            Amenity.builder().project(project).name("Công viên cây xanh")
                    .description("Không gian xanh mát rộng 2ha")
                    .iconName("FaTree").imageUrl("/images/amenities/amenities-3.png")
                    .sortOrder(3).isActive(true).build(),
            Amenity.builder().project(project).name("Trường liên cấp")
                    .description("Hệ thống giáo dục chất lượng cao")
                    .iconName("HiAcademicCap").imageUrl("/images/amenities/amenities-4.png")
                    .sortOrder(4).isActive(true).build(),
            Amenity.builder().project(project).name("TTTM nội khu")
                    .description("Mua sắm, ẩm thực và giải trí")
                    .iconName("HiShoppingBag").imageUrl("/images/amenities/amenities-5.png")
                    .sortOrder(5).isActive(true).build(),
            Amenity.builder().project(project).name("Khu vui chơi")
                    .description("Sân chơi an toàn cho trẻ em")
                    .iconName("FaChild").imageUrl("/images/amenities/amenities-6.png")
                    .sortOrder(6).isActive(true).build()
        );
        
        amenityRepository.saveAll(amenities);
        log.info("Created {} amenities", amenities.size());
    }
    
    private void createGalleryImages(Project project) {
        List<GalleryImage> images = Arrays.asList(
            GalleryImage.builder().project(project)
                    .imageUrl("/images/gallery/gallery-23.jpg").title("Tổng quan dự án")
                    .category(GalleryImage.ImageCategory.EXTERIOR).sortOrder(1).isActive(true).build(),
            GalleryImage.builder().project(project)
                    .imageUrl("/images/gallery/gallery-24.jpg").title("Phối cảnh dự án")
                    .category(GalleryImage.ImageCategory.EXTERIOR).sortOrder(2).isActive(true).build(),
            GalleryImage.builder().project(project)
                    .imageUrl("/images/gallery/gallery-25.jpg").title("Khu biệt thự")
                    .category(GalleryImage.ImageCategory.EXTERIOR).sortOrder(3).isActive(true).build(),
            GalleryImage.builder().project(project)
                    .imageUrl("/images/overview/overview-5.jpg").title("Nội thất cao cấp")
                    .category(GalleryImage.ImageCategory.INTERIOR).sortOrder(4).isActive(true).build(),
            GalleryImage.builder().project(project)
                    .imageUrl("/images/design/design-1.png").title("Thiết kế căn hộ")
                    .category(GalleryImage.ImageCategory.DESIGN).sortOrder(5).isActive(true).build(),
            GalleryImage.builder().project(project)
                    .imageUrl("/images/amenities/amenities-1.png").title("Tiện ích nội khu")
                    .category(GalleryImage.ImageCategory.AMENITY).sortOrder(6).isActive(true).build()
        );
        
        galleryImageRepository.saveAll(images);
        log.info("Created {} gallery images", images.size());
    }
}
