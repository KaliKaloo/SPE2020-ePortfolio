package uk.ac.bristol.spe.ePortFolioRepo.database;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uk.ac.bristol.spe.ePortFolioRepo.model.PasswordModel;
import uk.ac.bristol.spe.ePortFolioRepo.model.UserModel;

@Repository
public interface PasswordModelRepository extends JpaRepository<PasswordModel, Long> {
  PasswordModel findByUserModel(UserModel userModel);
}
