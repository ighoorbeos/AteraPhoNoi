package com.atera.controller;

import com.atera.dto.ApiResponse;
import com.atera.dto.project.ProjectResponse;
import com.atera.service.ProjectServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ProjectControllerV1 {
    
    private final ProjectServiceImpl projectService;
    
    /**
     * GET /api/v1/public/project
     * Public endpoint - Get active project info for landing page
     */
    @GetMapping("/public/project")
    public ResponseEntity<ApiResponse<ProjectResponse>> getActiveProject() {
        ProjectResponse response = projectService.getActiveProject();
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    /**
     * GET /api/v1/projects/{id}
     * Public endpoint - Get project by ID
     */
    @GetMapping("/projects/{id}")
    public ResponseEntity<ApiResponse<ProjectResponse>> getProjectById(@PathVariable Long id) {
        ProjectResponse response = projectService.getProjectById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
