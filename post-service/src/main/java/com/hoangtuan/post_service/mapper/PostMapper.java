package com.hoangtuan.post_service.mapper;

import com.hoangtuan.post_service.dto.response.PostResponse;
import com.hoangtuan.post_service.entities.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PostMapper {
    @Mapping(source = "user_id", target = "userId")
    @Mapping(source = "category_id", target = "categoryId")
    PostResponse toPostResponse(Post post);
}
