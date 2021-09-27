package uk.ac.bristol.spe.ePortFolioRepo.controllers;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;
import uk.ac.bristol.spe.ePortFolioRepo.model.UserModel;

@Component
public class UserModelAssembler
    implements RepresentationModelAssembler<UserModel, EntityModel<UserModel>> {
  @Override
  public EntityModel<UserModel> toModel(UserModel userModel) {
    return EntityModel.of(
        userModel,
        WebMvcLinkBuilder.linkTo(
                WebMvcLinkBuilder.methodOn(UserController.class).one(userModel.getId()))
            .withSelfRel());
  }
}
