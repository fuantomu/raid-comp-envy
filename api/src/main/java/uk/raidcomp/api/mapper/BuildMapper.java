package uk.raidcomp.api.mapper;

import java.util.Objects;
import java.util.Optional;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import uk.raidcomp.api.config.MapstructConfig;
import uk.raidcomp.api.controller.dto.BuildMetaResponseDto;
import uk.raidcomp.api.controller.dto.BuildResponseDto;
import uk.raidcomp.api.controller.dto.CreateBuildResponseDto;
import uk.raidcomp.api.controller.dto.imports.ImportBuildResponseDto;
import uk.raidcomp.api.data.entity.BuildEntity;
import uk.raidcomp.api.model.Build;
import uk.raidcomp.api.model.Player;
import uk.raidcomp.game.WarcraftPlayerSpec;
import uk.raidcomp.game.WarcraftRole;
import uk.raidcomp.game.version.GameVersion;

import static uk.raidcomp.game.WarcraftRole.HEALER;
import static uk.raidcomp.game.WarcraftRole.MELEE_DPS;
import static uk.raidcomp.game.WarcraftRole.RANGED_DPS;
import static uk.raidcomp.game.WarcraftRole.TANK;
import static uk.raidcomp.game.WarcraftRole.UNKNOWN;

@Mapper(config = MapstructConfig.class, uses = PlayerMapper.class)
public abstract class BuildMapper {

  @Mapping(target = "gameVersion", source = "gameVersion", qualifiedByName = "mapGameVersion")
  public abstract Build toDomain(BuildEntity entity);

  @Mapping(target = "buildId", source = "id")
  public abstract BuildResponseDto toDto(Build build);

  @Mapping(target = "buildId", source = "id")
  public abstract CreateBuildResponseDto toCreated(Build build);

  @Mapping(target = "buildId", source = "id")
  @Mapping(target = "buildName", source = "name")
  @Mapping(target = "team", ignore = true)
  public abstract ImportBuildResponseDto toImportDto(Build build);

  @Mapping(target = "tanks", source = ".", qualifiedByName = "mapTanks")
  @Mapping(target = "healers", source = ".", qualifiedByName = "mapHealers")
  @Mapping(target = "dps", source = ".", qualifiedByName = "mapDps")
  @Mapping(target = "unknown", source = ".", qualifiedByName = "mapUnknown")
  @Mapping(target = "total", expression = "java(build.players().size())")
  public abstract BuildMetaResponseDto toMeta(Build build);

  private Integer count(final Build build, final WarcraftRole role) {
    return (int)
        build.players().stream()
            .map(Player::spec)
            .map(spec -> Objects.isNull(spec) ? WarcraftPlayerSpec.UNKNOWN : spec)
            .map(WarcraftPlayerSpec::getRole)
            .filter(role::equals)
            .count();
  }

  @Deprecated(forRemoval = true)
  @Named("mapGameVersion")
  protected GameVersion mapGameVersion(final String gameVersion) {
    return Optional.ofNullable(gameVersion).map(GameVersion::of).orElse(GameVersion.LIVE);
  }

  @Named("mapDps")
  protected Integer mapDps(final Build build) {
    return count(build, RANGED_DPS) + count(build, MELEE_DPS);
  }

  @Named("mapTanks")
  protected Integer mapTanks(final Build build) {
    return count(build, TANK);
  }

  @Named("mapHealers")
  protected Integer mapHealers(final Build build) {
    return count(build, HEALER);
  }

  @Named("mapUnknown")
  protected Integer mapUnknown(final Build build) {
    return count(build, UNKNOWN);
  }
}
