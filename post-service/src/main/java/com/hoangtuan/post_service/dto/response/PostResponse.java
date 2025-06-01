package com.hoangtuan.post_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.security.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostResponse {
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
