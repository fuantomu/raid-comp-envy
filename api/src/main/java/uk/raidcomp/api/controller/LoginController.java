package uk.raidcomp.api.controller;

import java.util.Optional;

import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import jakarta.validation.Valid;
import uk.raidcomp.api.controller.dto.LoginDto;
import uk.raidcomp.api.controller.dto.save.SaveLoginDto;
import uk.raidcomp.api.data.entity.LoginEntity;
import uk.raidcomp.api.data.repository.LoginRepository;

@Controller("/login/")
public class LoginController {

  protected final LoginRepository loginRepository;

  public LoginController(LoginRepository loginRepository) {
    this.loginRepository = loginRepository;
  }

  @Get("/{host}")
  public LoginDto getLoginAge(String host) {
    Optional<LoginEntity> userLogin = loginRepository.findById(host);
    if (!userLogin.isEmpty()) {
      return new LoginDto(userLogin.get().getCreated(), userLogin.get().getRole());
    }
    return new LoginDto((long) 0, -1);
  }

  @Post("/{host}")
  public void createLoginAge(String host, @Valid @Body SaveLoginDto body) {
    LoginEntity userLogin = new LoginEntity();

    userLogin.setHost(host);
    userLogin.setCreated(System.currentTimeMillis());
    userLogin.setRole(body.role());

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
