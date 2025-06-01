package com.hoangtuan.auth_service.mapper;

import com.hoangtuan.auth_service.dto.response.UserResponse;
import com.hoangtuan.auth_service.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "id", target = "userId")
    UserResponse toUserResponse(User user);
}
