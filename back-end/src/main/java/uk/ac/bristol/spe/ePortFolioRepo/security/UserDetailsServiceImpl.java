package uk.ac.bristol.spe.ePortFolioRepo.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import uk.ac.bristol.spe.ePortFolioRepo.database.PasswordModelRepository;
import uk.ac.bristol.spe.ePortFolioRepo.database.UserModelRepository;
import uk.ac.bristol.spe.ePortFolioRepo.model.PasswordModel;
import uk.ac.bristol.spe.ePortFolioRepo.model.UserModel;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  private final UserModelRepository userRepository;
  private final PasswordModelRepository passwordModelRepository;

  public UserDetailsServiceImpl(
      UserModelRepository userRepository, PasswordModelRepository passwordModelRepository) {
    this.userRepository = userRepository;
    this.passwordModelRepository = passwordModelRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    UserModel user = userRepository.findByUsername(username);
    PasswordModel password = passwordModelRepository.findByUserModel(user);
    if (user == null || password == null) {
      throw new UsernameNotFoundException(username);
    }

    return new User(user.getUsername(), password.getPassword(), Collections.emptyList());
  }
}
