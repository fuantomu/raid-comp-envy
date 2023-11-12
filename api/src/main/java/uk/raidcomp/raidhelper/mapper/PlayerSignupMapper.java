package uk.raidcomp.raidhelper.mapper;

import java.util.Optional;
import java.util.stream.Stream;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import uk.raidcomp.api.config.MapstructConfig;
import uk.raidcomp.api.model.InviteStatus;
import uk.raidcomp.api.model.WarcraftPlayerClass;
import uk.raidcomp.api.model.WarcraftPlayerSpec;
import uk.raidcomp.api.model.imported.ImportedBuild;
import uk.raidcomp.api.model.imported.PlayerSignup;
import uk.raidcomp.raidhelper.model.RaidHelperClass;
import uk.raidcomp.raidhelper.model.RaidHelperEvent;
import uk.raidcomp.raidhelper.model.RaidHelperSignup;
import uk.raidcomp.raidhelper.model.RaidHelperSpec;
import uk.raidcomp.raidhelper.model.RaidHelperStatus;

@Mapper(config = MapstructConfig.class)
public abstract class PlayerSignupMapper {

  public abstract ImportedBuild toDomain(RaidHelperEvent event);

  @Mapping(target = "realm", ignore = true)
  @Mapping(target = "groupId", ignore = true)
  @Mapping(target = "discordId", source = "id")
  @Mapping(target = "spec", source = ".", qualifiedByName = "mapSpec")
  @Mapping(target = "className", source = ".", qualifiedByName = "mapClass")
  @Mapping(target = "status", source = "status", qualifiedByName = "mapStatus")
  public abstract PlayerSignup toDomain(RaidHelperSignup signup);

  @Named("mapStatus")
  protected InviteStatus mapStatus(String status) {
    return RaidHelperStatus.findByValue(status)
        .map(RaidHelperStatus::getInviteStatus)
        .orElse(InviteStatus.ACCEPTED);
  }

  @Named("mapSpec")
  protected WarcraftPlayerSpec mapSpec(RaidHelperSignup signup) {
    return RaidHelperSpec.findByValue(signup.classOrSpec())
        .map(RaidHelperSpec::getWowSpec)
        .orElse(WarcraftPlayerSpec.UNKNOWN);
  }

  @Named("mapClass")
  protected WarcraftPlayerClass mapClass(RaidHelperSignup signup) {
    return Stream.of(
            RaidHelperClass.findByValue(signup.statusOrClass()).map(RaidHelperClass::getWowClass),
            RaidHelperClass.findByValue(signup.classOrSpec()).map(RaidHelperClass::getWowClass),
            RaidHelperSpec.findByValue(signup.classOrSpec()).map(RaidHelperSpec::getWowClass))
        .filter(Optional::isPresent)
        .map(Optional::get)
        .findFirst()
        .orElse(WarcraftPlayerClass.UNKNOWN);
  }
}
