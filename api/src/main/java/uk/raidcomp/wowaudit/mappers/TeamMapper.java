package uk.raidcomp.wowaudit.mappers;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import uk.raidcomp.api.config.MapstructConfig;
import uk.raidcomp.wowaudit.dto.WowAuditCharacter;
import uk.raidcomp.wowaudit.dto.WowAuditTeam;
import uk.raidcomp.wowaudit.model.Team;
import uk.raidcomp.wowaudit.model.TeamCharacter;

@Mapper(config = MapstructConfig.class)
public interface TeamMapper {

  @Mapping(target = "players", source = "characters")
  @Mapping(target = "filter", source = "filter")
  Team toModel(WowAuditTeam team, List<WowAuditCharacter> characters, boolean filter);

  @Mapping(target = "character", source = "name")
  @Mapping(target = "discordId", source = "note")
  TeamCharacter toModel(WowAuditCharacter character);
}
