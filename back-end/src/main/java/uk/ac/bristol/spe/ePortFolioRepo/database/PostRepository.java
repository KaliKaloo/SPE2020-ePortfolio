package uk.ac.bristol.spe.ePortFolioRepo.database;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uk.ac.bristol.spe.ePortFolioRepo.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
  Page<Post> findByUserId(Long userId, Pageable pageable);
}
