package uk.raidcomp.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import uk.raidcomp.api.config.MapstructConfig;
import uk.raidcomp.api.controller.dto.PlayerDto;
import uk.raidcomp.api.data.entity.PlayerEntity;
import uk.raidcomp.api.model.Player;

@Mapper(config = MapstructConfig.class)
public interface PlayerMapper {
  @Mapping(target = "groupId", source = "group")
  Player toDomain(PlayerDto dto);

  PlayerEntity toModel(Player player);

  Player toDomain(PlayerEntity player);

  @Mapping(target = "group", source = "groupId")
  PlayerDto toDto(Player dto);
}
