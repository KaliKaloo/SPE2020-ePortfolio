package uk.ac.bristol.spe.ePortFolioRepo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import uk.ac.bristol.spe.ePortFolioRepo.database.AssetModelRepository;
import uk.ac.bristol.spe.ePortFolioRepo.database.PostRepository;
import uk.ac.bristol.spe.ePortFolioRepo.database.UserModelRepository;
import uk.ac.bristol.spe.ePortFolioRepo.model.AssetModel;
import uk.ac.bristol.spe.ePortFolioRepo.model.Post;
import uk.ac.bristol.spe.ePortFolioRepo.model.UserModel;
import uk.ac.bristol.spe.ePortFolioRepo.utils.S3Utils;

import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;

@RestController
public class AssetModelController {

  AssetModelRepository assetModelRepository;
  UserModelRepository userModelRepository;
  PostRepository postRepository;

  public AssetModelController(
      AssetModelRepository assetModelRepository,
      UserModelRepository userModelRepository,
      PostRepository postRepository) {
    this.assetModelRepository = assetModelRepository;
    this.userModelRepository = userModelRepository;
    this.postRepository = postRepository;
  }

  @CrossOrigin
  @PostMapping("profilepic")
  public ResponseEntity<?> getProfilePictureUploadLink(Principal user) throws URISyntaxException {
    UserModel u = userModelRepository.findByUsername(user.getName());
    URI uri = S3Utils.GetUploadLink("profile-pic-" + u.getId()).toURI();
    return ResponseEntity.created(uri).body(uri);
  }

  @CrossOrigin
  @PostMapping("uploadlink")
  public ResponseEntity<?> getUploadLink(@RequestParam Long postid, Principal user)
      throws URISyntaxException {
    try {
      UserModel u = userModelRepository.findByUsername(user.getName());
      Post p = postRepository.findById(postid).orElseThrow(Error::new);
      if (p.getUser().equals(u)) {
        AssetModel newAssetModel = new AssetModel();
        newAssetModel.setPost(p);
        assetModelRepository.save(newAssetModel);
        System.out.println(newAssetModel.getId().toString());
        URI uri = S3Utils.GetUploadLink("asset-" + newAssetModel.getId()).toURI();
        newAssetModel.setS3Link(
            new URI(uri.getScheme(), uri.getAuthority(), uri.getPath(), null, uri.getFragment()));
        assetModelRepository.save(newAssetModel);
        p.getAssetModels().add(newAssetModel);
        postRepository.save(p);
        return ResponseEntity.created(uri).body(uri);
      } else {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Post belongs to different author");
      }
    } catch (Error e) {
      return ResponseEntity.badRequest().body(e);
    }
  }
}
