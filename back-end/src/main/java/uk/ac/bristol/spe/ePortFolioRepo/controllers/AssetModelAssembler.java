package uk.ac.bristol.spe.ePortFolioRepo.controllers;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;
import uk.ac.bristol.spe.ePortFolioRepo.model.AssetModel;

@Component
public class AssetModelAssembler
    implements RepresentationModelAssembler<AssetModel, EntityModel<AssetModel>> {
  @Override
  public EntityModel<AssetModel> toModel(AssetModel assetModel) {
    return EntityModel.of(
        assetModel,
        WebMvcLinkBuilder.linkTo(
                WebMvcLinkBuilder.methodOn(PostController.class)
                    .getPost(assetModel.getPost().getId()))
            .withRel("post"),
        WebMvcLinkBuilder.linkTo(
                WebMvcLinkBuilder.methodOn(UserController.class)
                    .one(assetModel.getPost().getUser().getId()))
            .withRel("user"));
  }
}
