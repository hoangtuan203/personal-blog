package com.hoangtuan.post_service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.security.Timestamp;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostRequest {
    Long userId;
    String title;
    String slug;
    String content;
    String thumbnail_url;
    Long categoryId;
    Long isPublic;
    Timestamp created_at;
    Timestamp updated_at;
}
