
export enum TestEnum {
  X = 1,
}

export enum AppErrorId {
  Unspecific = "unspecific",
  App404 = "notFound",
  ApiCancelled = "apiCancelled",
  Api403 = "api403",
  Api404 = "api404",
}

export enum WarcraftPlayerClass {
  DeathKnight = "DeathKnight",
  DemonHunter = "DemonHunter",
  Druid = "Druid",
  Hunter = "Hunter",
  Mage = "Mage",
  Monk = "Monk",
  Paladin = "Paladin",
  Priest = "Priest",
  Rogue = "Rogue",
  Shaman = "Shaman",
  Warlock = "Warlock",
  Warrior = "Warrior",
}

export enum InviteStatus {
  Invited = "invited",
  Tentative = "tentative",
  Accepted = "accepted",
  Confirmed = "confirmed",
  Declined = "declined",
  Unknown = "unknown",
}

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
}

export const WarcraftClassColour: {
  [className in WarcraftPlayerClass]: string
} = {
  DeathKnight: "#C41F3B",
  DemonHunter: "#A330C9",
  Druid: "#FF7D0A",
  Hunter: "#A9D271",
  Mage: "#40C7EB",
  Monk: "#00FF96",
  Paladin: "#F58CBA",
  Priest: "#FFFFFF",
  Rogue: "#FFF569",
  Shaman: "#0070DE",
  Warlock: "#8787ED",
  Warrior: "#C79C6E",
};;