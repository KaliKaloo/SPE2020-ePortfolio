package uk.ac.bristol.spe.ePortFolioRepo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.Instant;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity(name = "post")
public class Post {
  private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
  private final Date date = Date.from(Instant.now());
  private @Column(name = "content", columnDefinition = "LONGTEXT") String content;
  private String title;
  private String category;
  private boolean draft;

  @ManyToOne private UserModel user;

  @JsonIgnore
  @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<AssetModel> assetModels = new HashSet<>();

  protected Post() {}

  public Post(String content, String title, String category, boolean draft) {
    this.content = content;
    this.title = title;
    this.category = category;
    this.draft = draft;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Set<AssetModel> getAssetModels() {
    return assetModels;
  }

  public void setAssets(Set<AssetModel> a) {
    this.assetModels = a;
  }

  private void removeAssets() {
    assetModels.forEach(asset -> asset.setPost(null));
    this.setAssets(null);
  }

  public String getCategory() {
    return category;
  }

  public String getContent() {
    return content;
  }

  public String getTitle() {
    return title;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public UserModel getUser() {
    return user;
  }

  public void setUser(UserModel user) {
    this.user = user;
  }

  public Date getDate() {
    return this.date;
  }

  public boolean isDraft() {
    return draft;
  }

  public void setDraft(boolean draft) {
    this.draft = draft;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Post post = (Post) o;
    return draft == post.draft
        && Objects.equals(id, post.id)
        && Objects.equals(date, post.date)
        && Objects.equals(content, post.content)
        && Objects.equals(title, post.title)
        && Objects.equals(category, post.category)
        && Objects.equals(user, post.user);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, date, content, title, category, draft, user);
  }

  @Override
  public String toString() {
    return "Post{"
        + "id="
        + id
        + ", date="
        + date
        + ", content='"
        + content
        + '\''
        + ", title='"
        + title
        + '\''
        + ", category='"
        + category
        + '\''
        + ", draft="
        + draft
        + ", user="
        + user
        + '}';
  }
}
