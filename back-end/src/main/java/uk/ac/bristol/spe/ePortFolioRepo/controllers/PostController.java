package uk.ac.bristol.spe.ePortFolioRepo.controllers;

import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.ac.bristol.spe.ePortFolioRepo.database.AssetModelRepository;
import uk.ac.bristol.spe.ePortFolioRepo.database.PostRepository;
import uk.ac.bristol.spe.ePortFolioRepo.database.UserModelRepository;
import uk.ac.bristol.spe.ePortFolioRepo.model.AssetModel;
import uk.ac.bristol.spe.ePortFolioRepo.model.Post;
import uk.ac.bristol.spe.ePortFolioRepo.model.UserModel;

import java.security.Principal;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestController
public class PostController {

  private final UserModelRepository userRepository;
  private final PostRepository postRepository;
  private final AssetModelRepository assetRepository;

  private final PostModelAssembler assembler;
  private final AssetModelAssembler assetModelAssembler;

  PostController(
      UserModelRepository repository,
      PostRepository postRepository,
      AssetModelRepository assetRepository,
      PostModelAssembler assembler,
      AssetModelAssembler assetModelAssembler) {

    this.userRepository = repository;
    this.assetRepository = assetRepository;
    this.postRepository = postRepository;
    this.assembler = assembler;
    this.assetModelAssembler = assetModelAssembler;
  }

  @CrossOrigin
  @GetMapping("/")
  ResponseEntity<?> base() {
    return new ResponseEntity<>("api reference", HttpStatus.OK);
  }

  @CrossOrigin
  @GetMapping("post")
  ResponseEntity<CollectionModel<EntityModel<Post>>> getUserPosts(@RequestParam Long userid) {
    List<EntityModel<Post>> posts =
        postRepository.findByUserId(userid, Pageable.unpaged()).stream()
            .map(assembler::toModel)
            .collect(Collectors.toList());

    return ResponseEntity.ok(
        CollectionModel.of(
            posts,
            WebMvcLinkBuilder.linkTo(
                    WebMvcLinkBuilder.methodOn(PostController.class).getUserPosts(userid))
                .withSelfRel()));
  }

  @CrossOrigin
  @GetMapping("attachments")
  ResponseEntity<CollectionModel<EntityModel<AssetModel>>> getPostAssets(
      @RequestParam Long postid) {
    try {
      Post p = postRepository.findById(postid).orElseThrow(NoSuchElementException::new);
      return ResponseEntity.ok(
          CollectionModel.of(
              assetRepository.findByPostId(postid, Pageable.unpaged()).getContent().stream()
                  .map(assetModelAssembler::toModel)
                  .collect(Collectors.toList()),
              WebMvcLinkBuilder.linkTo(
                      WebMvcLinkBuilder.methodOn(UserController.class).one(p.getUser().getId()))
                  .withRel("user"),
              WebMvcLinkBuilder.linkTo(
                      WebMvcLinkBuilder.methodOn(PostController.class).getPost(postid))
                  .withRel("post")));
    } catch (NoSuchElementException e) {
      return ResponseEntity.notFound().build();
    }
  }

  @CrossOrigin
  @GetMapping("allposts")
  ResponseEntity<CollectionModel<EntityModel<Post>>> getAllPosts() {
    List<EntityModel<Post>> posts =
        postRepository.findAll().stream().map(assembler::toModel).collect(Collectors.toList());

    return ResponseEntity.ok(
        CollectionModel.of(
            posts,
            WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(PostController.class).getAllPosts())
                .withSelfRel()));
  }

  // Upload a post to your account
  @CrossOrigin
  @PostMapping("post")
  ResponseEntity<EntityModel<Post>> addPost(Principal user, @RequestBody Post newPost) {
    UserModel applicationUser = userRepository.findByUsername(user.getName());
    newPost.setUser(applicationUser);
    Post p = postRepository.save(newPost);
    EntityModel<Post> entityModel = assembler.toModel(p);
    return ResponseEntity.created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
        .body(entityModel);
  }

  // Get a public post
  @CrossOrigin
  @GetMapping("post/{postid}")
  ResponseEntity<EntityModel<Post>> getPost(@PathVariable Long postid) {
    Post post = postRepository.findById(postid).orElseThrow(ResourceNotFoundException::new);
    return ResponseEntity.ok(assembler.toModel(post));
  }

  @CrossOrigin
  @PutMapping("post/{postid}")
  ResponseEntity<?> editPost(Principal user, @PathVariable Long postid, @RequestBody Post newPost) {
    UserModel userModel = userRepository.findByUsername(user.getName());
    Post updatedPost = postRepository.findById(postid).orElseThrow(Error::new);
    if (updatedPost.getUser().equals(userModel)) {
      updatedPost.setTitle(newPost.getTitle());
      updatedPost.setContent(newPost.getContent());
      updatedPost.setCategory(newPost.getCategory());
      updatedPost.setDraft(newPost.isDraft());

      postRepository.save(updatedPost);

      EntityModel<Post> entityModel = assembler.toModel(updatedPost);

      return ResponseEntity.created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
          .body(entityModel);
    } else {
      return ResponseEntity.badRequest().build();
    }
  }

  @CrossOrigin
  @DeleteMapping("post/{postid}")
  ResponseEntity<?> deletePost(Principal user, @PathVariable Long postid) {
    UserModel userModel = userRepository.findByUsername(user.getName());

    System.out.println(user);

    System.out.println(postid);

    if (!userRepository.existsById(userModel.getId())) {
      throw new ResourceNotFoundException("User " + userModel.getId() + " not found");
    }

    try {
      Post p = postRepository.findById(postid).orElseThrow(Error::new);

      userModel.getPosts().remove(p);

      p.setUser(null);

      p.getAssetModels().forEach(assetModel -> assetModel.setPost(null));

      userRepository.save(userModel);

      postRepository.delete(p);

      return ResponseEntity.noContent().build();
    } catch (Error e) {
      return ResponseEntity.notFound().build();
    }
  }
}
