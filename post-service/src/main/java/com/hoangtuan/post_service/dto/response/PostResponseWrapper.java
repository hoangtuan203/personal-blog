package com.hoangtuan.post_service.dto.response;

import com.hoangtuan.post_service.entities.Post;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostResponseWrapper {
    long totalPages;
    long totalElements;
    List<Post> posts;
}
