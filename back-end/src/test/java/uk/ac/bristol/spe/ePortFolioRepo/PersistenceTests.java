package uk.ac.bristol.spe.ePortFolioRepo;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import uk.ac.bristol.spe.ePortFolioRepo.database.AssetModelRepository;
import uk.ac.bristol.spe.ePortFolioRepo.database.PasswordModelRepository;
import uk.ac.bristol.spe.ePortFolioRepo.database.PostRepository;
import uk.ac.bristol.spe.ePortFolioRepo.database.UserModelRepository;
import uk.ac.bristol.spe.ePortFolioRepo.model.PasswordModel;
import uk.ac.bristol.spe.ePortFolioRepo.model.UserModel;

@DataJpaTest
public class PersistenceTests {
  @Autowired private UserModelRepository userModelRepository;
  @Autowired private PostRepository postRepository;
  @Autowired private PasswordModelRepository passwordModelRepository;
  @Autowired private AssetModelRepository assetModelRepository;

  @Test
  public void findByName() {
    UserModel userModel =
        new UserModel("Joel", "Tester", "joel.tester@testing.c", "joelgg", "My description");
    PasswordModel passwordModel = new PasswordModel("abcdefg");
    passwordModel.setUserModel(userModel);

    passwordModelRepository.save(passwordModel);
    userModelRepository.save(userModel);

    UserModel found = userModelRepository.findByUsername("joelgg");

    Assertions.assertThat(found).isEqualTo(userModel);
  }
}
