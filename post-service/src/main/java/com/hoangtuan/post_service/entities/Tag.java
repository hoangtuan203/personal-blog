package com.hoangtuan.post_service.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tags", schema = "blog_post_db")
public class Tag {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;


    @Column(name = "name", nullable = false, length = 100)
    private String name;


    @Column(name = "slug", nullable = false, length = 100)
    private String slug;

}