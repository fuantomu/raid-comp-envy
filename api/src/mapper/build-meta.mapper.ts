import { BuildMeta, BuildType, PlayerType } from "../model/build.model";

export enum WarcraftPlayerSpec {
  DeathKnightBlood = "DeathKnightBlood",
  DeathKnightFrost = "DeathKnightFrost",
  DeathKnightUnholy = "DeathKnightUnholy",
  DemonHunterHavoc = "DemonHunterHavoc",
  DemonHunterVengeance = "DemonHunterVengeance",
  DruidBalance = "DruidBalance",
  DruidFeral = "DruidFeral",
  DruidGuardian = "DruidGuardian",
  DruidRestoration = "DruidRestoration",
  EvokerDevastation = "EvokerDevastation",
  EvokerPreservation = "EvokerPreservation",
  HunterBeastmastery = "HunterBeastmastery",
  HunterMarksmanship = "HunterMarksmanship",
  HunterSurvival = "HunterSurvival",
  MageArcane = "MageArcane",
  MageFire = "MageFire",
  MageFrost = "MageFrost",
  MonkBrewmaster = "MonkBrewmaster",
  MonkMistweaver = "MonkMistweaver",
  MonkWindwalker = "MonkWindwalker",
  PriestDiscipline = "PriestDiscipline",
  PriestHoly = "PriestHoly",
  PriestShadow = "PriestShadow",
  PaladinHoly = "PaladinHoly",
  PaladinProtection = "PaladinProtection",
  PaladinRetribution = "PaladinRetribution",
  RogueAssassination = "RogueAssassination",
  RogueOutlaw = "RogueOutlaw",
  RogueSubtlety = "RogueSubtlety",
  WarlockAffliction = "WarlockAffliction",
  WarlockDemonology = "WarlockDemonology",
  WarlockDestruction = "WarlockDestruction",
  ShamanElemental = "ShamanElemental",
  ShamanEnhancement = "ShamanEnhancement",
  ShamanRestoration = "ShamanRestoration",
  WarriorArms = "WarriorArms",
  WarriorFury = "WarriorFury",
  WarriorProtection = "WarriorProtection",
  Unknown = "Unknown",
}

export enum WarcraftRole {
  Unknown = "Unknown",
  Tank = "Tank",
  Healer = "Healer",
  RangedDPS = "RangedDPS",
  MeleeDPS = "MeleeDPS",
}

export const WarcraftSpecRole: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRole;
} = {
  [WarcraftPlayerSpec.DeathKnightBlood]: WarcraftRole.Tank,
  [WarcraftPlayerSpec.DeathKnightFrost]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.DeathKnightUnholy]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.DemonHunterHavoc]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.DemonHunterVengeance]: WarcraftRole.Tank,
  [WarcraftPlayerSpec.DruidBalance]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.DruidFeral]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.DruidGuardian]: WarcraftRole.Tank,
  [WarcraftPlayerSpec.DruidRestoration]: WarcraftRole.Healer,
  [WarcraftPlayerSpec.HunterBeastmastery]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.HunterMarksmanship]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.HunterSurvival]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.MageArcane]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.MageFire]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.MageFrost]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.MonkBrewmaster]: WarcraftRole.Tank,
  [WarcraftPlayerSpec.MonkMistweaver]: WarcraftRole.Healer,
  [WarcraftPlayerSpec.MonkWindwalker]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.PriestDiscipline]: WarcraftRole.Healer,
  [WarcraftPlayerSpec.PriestHoly]: WarcraftRole.Healer,
  [WarcraftPlayerSpec.PriestShadow]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.PaladinHoly]: WarcraftRole.Healer,
  [WarcraftPlayerSpec.PaladinProtection]: WarcraftRole.Tank,
  [WarcraftPlayerSpec.PaladinRetribution]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.RogueAssassination]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.RogueOutlaw]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.RogueSubtlety]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.WarlockAffliction]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.WarlockDemonology]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.WarlockDestruction]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.ShamanElemental]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.ShamanEnhancement]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.ShamanRestoration]: WarcraftRole.Healer,
  [WarcraftPlayerSpec.WarriorArms]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.WarriorFury]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.WarriorProtection]: WarcraftRole.Tank,
  [WarcraftPlayerSpec.EvokerDevastation]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.EvokerPreservation]: WarcraftRole.Healer,
  [WarcraftPlayerSpec.Unknown]: WarcraftRole.Unknown,
};

const getSpecRole = (spec?: WarcraftPlayerSpec): WarcraftRole => {
  return spec ? WarcraftSpecRole[spec] : WarcraftRole.Unknown;
};

const isRole = (player: PlayerType, role: WarcraftRole): boolean => {
  return getSpecRole(player.spec) === role;
};

export const mapMeta = ({ players, name }: BuildType): BuildMeta => {
  return {
    name,
    total: players.length,
    tanks: players.filter((p) => isRole(p, WarcraftRole.Tank)).length,
    healers: players.filter((p) => isRole(p, WarcraftRole.Healer)).length,
    dps:
      players.filter((p) => isRole(p, WarcraftRole.MeleeDPS)).length +
      players.filter((p) => isRole(p, WarcraftRole.RangedDPS)).length,
    unknown: players.filter((p) => isRole(p, WarcraftRole.Unknown)).length,
  };
};
