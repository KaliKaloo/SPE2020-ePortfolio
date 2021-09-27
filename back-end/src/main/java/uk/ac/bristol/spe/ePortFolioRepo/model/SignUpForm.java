package uk.ac.bristol.spe.ePortFolioRepo.model;

import java.util.Objects;

public class SignUpForm {
  private String firstName;
  private String lastName;
  private String username;
  private String email;
  private String password;
  private String description;

  public SignUpForm(
      String firstName,
      String lastName,
      String username,
      String email,
      String password,
      String description) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.description = description;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    SignUpForm that = (SignUpForm) o;
    return firstName.equals(that.firstName)
        && lastName.equals(that.lastName)
        && username.equals(that.username)
        && email.equals(that.email)
        && password.equals(that.password)
        && description.equals(that.description);
  }

  @Override
  public int hashCode() {
    return Objects.hash(firstName, lastName, username, email, password, description);
  }

  @Override
  public String toString() {
    return "SignUpForm{"
        + "firstName='"
        + firstName
        + '\''
        + ", lastName='"
        + lastName
        + '\''
        + ", username='"
        + username
        + '\''
        + ", email='"
        + email
        + '\''
        + ", password='"
        + password
        + '\''
        + ", description='"
        + description
        + '\''
        + '}';
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

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
