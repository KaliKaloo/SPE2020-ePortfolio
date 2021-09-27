package uk.ac.bristol.spe.ePortFolioRepo.model;

import javax.persistence.*;
import java.net.URI;
import java.util.Objects;

@Entity(name = "asset_model")
public class AssetModel {
  private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
  private URI s3Link;
  private @ManyToOne Post post;

  public AssetModel() {}

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public URI gets3Link() {
    return s3Link;
  }

  public void setS3Link(URI s3Link) {
    this.s3Link = s3Link;
  }

  public Post getPost() {
    return post;
  }

  public void setPost(Post post) {
    this.post = post;
  }

  @Override
  public String toString() {
    return "AssetModel{" + "id=" + id + ", s3Link=" + s3Link + ", post=" + post + '}';
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    AssetModel that = (AssetModel) o;
    return Objects.equals(id, that.id)
        && Objects.equals(s3Link, that.s3Link)
        && Objects.equals(post, that.post);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, s3Link, post);
  }
}
