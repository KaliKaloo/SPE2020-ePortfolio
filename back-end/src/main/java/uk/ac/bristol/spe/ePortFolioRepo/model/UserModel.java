package uk.ac.bristol.spe.ePortFolioRepo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity(name = "user_model")
public class UserModel {
  private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
  private String firstName;
  private String lastName;
  private String username;
  private String email;
  private String description;

  @JsonIgnore
  @OneToMany(
      fetch = FetchType.EAGER,
      cascade = CascadeType.ALL,
      orphanRemoval = true,
      mappedBy = "user")
  private final Set<Post> posts = new HashSet<>();

  @JsonIgnore
  @OneToOne(
      fetch = FetchType.EAGER,
      cascade = CascadeType.ALL,
      orphanRemoval = true,
      mappedBy = "userModel")
  private PasswordModel password;

  protected UserModel() {}

  public UserModel(
      String firstName, String lastName, String email, String username, String description) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.description = description;
  }

  public UserModel(SignUpForm signUpForm) {
    this.firstName = signUpForm.getFirstName();
    this.lastName = signUpForm.getLastName();
    this.email = signUpForm.getEmail();
    this.username = signUpForm.getUsername();
    this.description = signUpForm.getDescription();
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    UserModel userModel = (UserModel) o;
    return Objects.equals(id, userModel.id)
        && Objects.equals(firstName, userModel.firstName)
        && Objects.equals(lastName, userModel.lastName)
        && Objects.equals(username, userModel.username)
        && Objects.equals(email, userModel.email)
        && Objects.equals(description, userModel.description);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, firstName, lastName, email, description);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public PasswordModel getPassword() {
    return password;
  }

  public void removePassword() {
    this.password.setUserModel(null);
    setPassword(null);
  }

  public void setPassword(PasswordModel password) {
    this.password = password;
  }

  public Set<Post> getPosts() {
    return posts;
  }

  public void addPost(Post p) {
    posts.add(p);
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  @Override
  public String toString() {
    return "User{"
        + "id="
        + id
        + ", firstName='"
        + firstName
        + '\''
        + ", lastName='"
        + lastName
        + '\''
        + ", email='"
        + email
        + '\''
        + ", description='"
        + description
        + '\''
        + '}';
  }
}
