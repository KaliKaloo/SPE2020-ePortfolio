package uk.ac.bristol.spe.ePortFolioRepo.database;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uk.ac.bristol.spe.ePortFolioRepo.model.UserModel;

@Repository
public interface UserModelRepository extends JpaRepository<UserModel, Long> {
  UserModel findByUsername(String username);
}
