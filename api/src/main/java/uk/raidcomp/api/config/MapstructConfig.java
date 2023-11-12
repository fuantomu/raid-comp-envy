package uk.raidcomp.api.config;

import org.mapstruct.MapperConfig;
import org.mapstruct.ReportingPolicy;

@MapperConfig(unmappedTargetPolicy = ReportingPolicy.ERROR, componentModel = "jsr330")
public interface MapstructConfig {}
