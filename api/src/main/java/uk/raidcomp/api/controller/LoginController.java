package uk.raidcomp.api.controller;

import java.util.Optional;

import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import uk.raidcomp.api.data.entity.LoginEntity;
import uk.raidcomp.api.data.repository.LoginRepository;

@Controller("/login/")
public class LoginController {

  protected final LoginRepository loginRepository;

  public LoginController(LoginRepository loginRepository) {
    this.loginRepository = loginRepository;
  }

  @Get("/{host}")
  public Long getLoginAge(String host) {
    Optional<LoginEntity> userLogin = loginRepository.findById(host);
    if (!userLogin.isEmpty()) {
      return userLogin.get().getCreated();
    }

    return (long) 0;
  }

  @Post("/{host}")
  public void createLoginAge(String host) {
    LoginEntity userLogin = new LoginEntity();

    userLogin.setHost(host);
    userLogin.setCreated(System.currentTimeMillis());

    Optional<LoginEntity> existingLogin = loginRepository.findById(host);
    if (existingLogin.isEmpty()) {
      loginRepository.save(userLogin);
    }
    loginRepository.update(userLogin);
  }

  @Post("/delete/{host}")
  public void deleteLoginAge(String host) {
    Optional<LoginEntity> userLogin = loginRepository.findById(host);
    if (!userLogin.isEmpty()) {
      loginRepository.delete(userLogin.get());
    }
  }
}
