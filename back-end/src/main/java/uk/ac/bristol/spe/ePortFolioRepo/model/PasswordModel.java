package uk.ac.bristol.spe.ePortFolioRepo.model;

import javax.persistence.*;

@Entity(name = "password_model")
public class PasswordModel {
  private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
  private String password;

  @OneToOne private UserModel userModel;

  protected PasswordModel() {}

  public PasswordModel(String password) {
    this.password = password;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getPassword() {
    return this.password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public UserModel getUserModel() {
    return this.userModel;
  }

  public void setUserModel(UserModel userModel) {
    this.userModel = userModel;
  }
}
