package com.hoangtuan.post_service.service;

import com.hoangtuan.post_service.dto.response.PostResponse;
import com.hoangtuan.post_service.dto.response.PostResponseWrapper;
import com.hoangtuan.post_service.entities.Post;
import com.hoangtuan.post_service.mapper.PostMapper;
import com.hoangtuan.post_service.repository.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final PostMapper postMapper;
    public PostService(PostRepository postRepository, PostMapper postMapper) {
        this.postRepository = postRepository;
        this.postMapper =  postMapper;
    }

    //get pagination posts
    public PostResponseWrapper getAllPosts(Pageable pageable) {
        Page<Post> posts = postRepository.findAllByPageable(pageable);
        Page<PostResponse> postResponses = posts.map(postMapper::toPostResponse);
        return new PostResponseWrapper(
                posts.getTotalPages(),
                posts.getTotalElements(),
                posts.getContent()
        );
    }
}
