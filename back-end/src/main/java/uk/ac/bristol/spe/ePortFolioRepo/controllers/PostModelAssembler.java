package uk.ac.bristol.spe.ePortFolioRepo.controllers;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;
import uk.ac.bristol.spe.ePortFolioRepo.model.Post;

@Component
public class PostModelAssembler implements RepresentationModelAssembler<Post, EntityModel<Post>> {
  @Override
  public EntityModel<Post> toModel(Post post) {
    return EntityModel.of(post,
        WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostController.class).getPost(post.getId())).withSelfRel(),
        WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostController.class).getPostAssets(post.getId()))
            .withRel("attachments"));
  }
}
