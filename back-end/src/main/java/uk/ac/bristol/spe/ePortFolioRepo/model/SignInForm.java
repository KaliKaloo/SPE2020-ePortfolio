package uk.ac.bristol.spe.ePortFolioRepo.model;

public class SignInForm {
  private String username;
  private String password;

  protected SignInForm() {}

  public SignInForm(String username, String password) {
    this.username = username;
    this.password = password;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  @Override
  public String toString() {
    return "SignInForm{" + "username='" + username + '\'' + ", password='" + password + '\'' + '}';
  }
}
