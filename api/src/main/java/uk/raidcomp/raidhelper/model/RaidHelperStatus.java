package uk.raidcomp.raidhelper.model;

import java.util.Arrays;
import java.util.Optional;
import lombok.Getter;
import uk.raidcomp.api.model.InviteStatus;

public enum RaidHelperStatus {
  TENTATIVE("Tentative", InviteStatus.TENTATIVE),
  BENCH("Bench", InviteStatus.DECLINED),
  LATE("Late", InviteStatus.TENTATIVE),
  ABSENCE("Absence", InviteStatus.DECLINED);

  private final String value;
  @Getter private final InviteStatus inviteStatus;

  RaidHelperStatus(final String value, final InviteStatus inviteStatus) {
    this.value = value;
    this.inviteStatus = inviteStatus;
  }

  public static Optional<RaidHelperStatus> findByValue(final String value) {
    return Arrays.stream(values()).filter(e -> e.value.equalsIgnoreCase(value)).findFirst();
  }
}
