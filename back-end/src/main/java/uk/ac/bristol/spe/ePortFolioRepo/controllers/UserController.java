package uk.ac.bristol.spe.ePortFolioRepo.controllers;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import uk.ac.bristol.spe.ePortFolioRepo.database.PasswordModelRepository;
import uk.ac.bristol.spe.ePortFolioRepo.database.UserModelRepository;
import uk.ac.bristol.spe.ePortFolioRepo.model.PasswordModel;
import uk.ac.bristol.spe.ePortFolioRepo.model.SignUpForm;
import uk.ac.bristol.spe.ePortFolioRepo.model.UserModel;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class UserController {

  private final UserModelRepository userRepository;
  private final PasswordModelRepository passwordRepository;

  private final UserModelAssembler userModelAssembler;

  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  UserController(
      UserModelRepository repository,
      PasswordModelRepository passwordRepository,
      UserModelAssembler userModelAssembler,
      BCryptPasswordEncoder bCryptPasswordEncoder) {
    this.userRepository = repository;
    this.passwordRepository = passwordRepository;
    this.userModelAssembler = userModelAssembler;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
  }

  @CrossOrigin
  @PostMapping("/signup")
  public ResponseEntity<?> signUp(@RequestBody SignUpForm signUpForm) {
    UserModel user = new UserModel(signUpForm);
    if (userRepository.findByUsername(user.getUsername()) != null) {
      return ResponseEntity.status(409).body("username already taken");
    }
    PasswordModel passwordModel =
        new PasswordModel(bCryptPasswordEncoder.encode(signUpForm.getPassword()));
    passwordModel.setUserModel(user);
    userRepository.save(user);
    passwordRepository.save(passwordModel);
    EntityModel<UserModel> e = userModelAssembler.toModel(user);
    return ResponseEntity.created(e.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(e);
  }

  @CrossOrigin
  @GetMapping("/users")
  public ResponseEntity<CollectionModel<EntityModel<UserModel>>> allUsers() {
    List<EntityModel<UserModel>> users =
        userRepository.findAll().stream()
            .map(userModelAssembler::toModel)
            .collect(Collectors.toList());
    return ResponseEntity.ok(CollectionModel.of(users));
  }

  @CrossOrigin
  @GetMapping("/users/{id}")
  public ResponseEntity<EntityModel<UserModel>> one(@PathVariable Long id) {
    try {
      UserModel user = userRepository.findById(id).orElseThrow(Error::new);
      return ResponseEntity.ok(userModelAssembler.toModel(user));
    } catch (Error e) {
      return ResponseEntity.notFound().build();
    }
  }

  @CrossOrigin
  @GetMapping("/u/{username}")
  public ResponseEntity<?> userByUsername(@PathVariable String username) {
    try {
      UserModel user = userRepository.findByUsername(username);
      return ResponseEntity.ok(user);
    } catch (Error e) {
      return ResponseEntity.notFound().build();
    }
  }

  @CrossOrigin
  @GetMapping("/self")
  public ResponseEntity<EntityModel<UserModel>> self(Principal user) {
    return ResponseEntity.ok(
        userModelAssembler.toModel(userRepository.findByUsername(user.getName())));
  }

  @CrossOrigin
  @DeleteMapping("/self")
  public ResponseEntity<?> deleteSelf(Principal principal) {
    UserModel u = userRepository.findByUsername(principal.getName());

    u.getPosts().forEach(post -> post.setUser(null));

    u.getPassword().setUserModel(null);

    userRepository.deleteById(u.getId());
    return ResponseEntity.noContent().build();
  }

  @CrossOrigin
  @PutMapping("/self")
  public ResponseEntity<?> replaceUser(@RequestBody UserModel newUser, Principal principal) {
    UserModel updatedUser = userRepository.findByUsername(principal.getName());
    updatedUser.setUsername(newUser.getUsername());
    updatedUser.setEmail(newUser.getEmail());
    updatedUser.setFirstName(newUser.getFirstName());
    updatedUser.setLastName(newUser.getLastName());
    updatedUser.setDescription(newUser.getDescription());

    userRepository.save(updatedUser);

    EntityModel<UserModel> entityModel = userModelAssembler.toModel(updatedUser);

    return ResponseEntity.created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
        .body(entityModel);
  }
}
