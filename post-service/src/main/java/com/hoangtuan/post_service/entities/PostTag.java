package com.hoangtuan.post_service.entities;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "post_tags", schema = "blog_post_db")
public class PostTag {
    @EmbeddedId
    private PostTagId id;

    //TODO [Reverse Engineering] generate columns from DB
}