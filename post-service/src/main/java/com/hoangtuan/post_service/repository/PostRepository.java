package com.hoangtuan.post_service.repository;

import com.hoangtuan.post_service.entities.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("select p from Post p ")
    Page<Post> findAllByPageable(Pageable pageable);
}
