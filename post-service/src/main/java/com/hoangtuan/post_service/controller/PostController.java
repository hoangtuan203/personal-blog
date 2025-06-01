package com.hoangtuan.post_service.controller;

import com.hoangtuan.post_service.dto.request.PostRequest;
import com.hoangtuan.post_service.dto.response.ApiResponse;
import com.hoangtuan.post_service.dto.response.PostResponseWrapper;
import com.hoangtuan.post_service.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping("/getAll")
    public ApiResponse<PostResponseWrapper> getAllPosts(@RequestParam(defaultValue = "-1") int page,
                                                        @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return ApiResponse.<PostResponseWrapper>builder()
                .result(postService.getAllPosts(pageable))
                .build();
    }
}
