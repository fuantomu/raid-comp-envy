package uk.raidcomp.api.controller;

import java.util.Optional;

import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.QueryValue;
import uk.raidcomp.api.data.entity.AccountEntity;
import uk.raidcomp.api.data.repository.AccountRepository;

@Controller("/account/")
public class AccountController {

  protected final AccountRepository accountRepository;

  public AccountController(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  @Get("/{user}")
  public Integer checkAccount(String user, @QueryValue String hash) {
    Optional<AccountEntity> userAccount = accountRepository.findById(user);
    if (!userAccount.isEmpty()) {
      if (userAccount.get().getPassword().equals(hash)) {
        return userAccount.get().getRole();
      }
    }
    return -1;
  }
}
