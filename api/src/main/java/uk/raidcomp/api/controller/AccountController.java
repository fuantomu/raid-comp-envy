package uk.raidcomp.api.controller;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Optional;

import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.QueryValue;
import jakarta.validation.Valid;
import uk.raidcomp.api.controller.dto.save.SaveAccountDto;
import uk.raidcomp.api.data.entity.AccountEntity;
import uk.raidcomp.api.data.repository.AccountRepository;

@Controller("/account/")
public class AccountController {

  protected final AccountRepository accountRepository;

  public AccountController(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  public boolean VerifyHash(String checkHash, String passwordHash) {
    try {
      MessageDigest md = MessageDigest.getInstance("SHA-512");
      String hashWithSalt = new String(Base64.getDecoder().decode(checkHash), StandardCharsets.UTF_8);
      int hashSize = md.getDigestLength();

      if (hashWithSalt.length() < hashSize) {
        return false;
      }

      String hash = hashWithSalt.substring(0, hashSize * 2);
      String passwordWithSalt = new String(Base64.getDecoder().decode(passwordHash), StandardCharsets.UTF_8);
      String password = passwordWithSalt.substring(0, hashSize * 2);

      return hash.equals(password);

    } catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
    }
    return false;
  }

  @Get("/{user}")
  public Integer checkAccount(String user, @QueryValue String hash) {
    Optional<AccountEntity> userAccount = accountRepository.findById(user);
    if (!userAccount.isEmpty()) {
      if (VerifyHash(hash, userAccount.get().getPassword())) {
        return userAccount.get().getRole();
      }
    }
    return -1;
  }

  @Post("/{user}")
  public Integer saveAccount(String user, @Valid @Body SaveAccountDto body) {
    Optional<AccountEntity> userAccount = accountRepository.findById(user);
    if (userAccount.isEmpty()) {
      AccountEntity newAccount = new AccountEntity();
      newAccount.setUsername(user);
      newAccount.setPassword(body.hash());
      newAccount.setRole(2);
      accountRepository.save(newAccount);
      return 1;
    }
    return -1;
  }
}
