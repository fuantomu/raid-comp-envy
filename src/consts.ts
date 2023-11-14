export enum AppErrorId {
  Unspecific = "unspecific",
  App404 = "notFound",
  ApiCancelled = "apiCancelled",
  Api403 = "api403",
  Api404 = "api404",
}

export enum WarcraftPlayerClass {
  DeathKnight = "DeathKnight",
  Druid = "Druid",
  Hunter = "Hunter",
  Mage = "Mage",
  Paladin = "Paladin",
  Priest = "Priest",
  Rogue = "Rogue",
  Shaman = "Shaman",
  Warlock = "Warlock",
  Warrior = "Warrior",
  Unknown = "Unknown",
}

export enum InviteStatus {
  Invited = "invited",
  Tentative = "tentative",
  Accepted = "accepted",
  Backup = "backup",
  Declined = "declined",
  Benched = "benched",
  Unknown = "unknown",
}

export enum WarcraftPlayerSpec {
  DeathKnightBlood = "DeathKnightBlood",
  DeathKnightFrost = "DeathKnightFrost",
  DeathKnightUnholy = "DeathKnightUnholy",
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
  PriestDiscipline = "PriestDiscipline",
  PriestHoly = "PriestHoly",
  PriestShadow = "PriestShadow",
  PaladinHoly = "PaladinHoly",
  PaladinProtection = "PaladinProtection",
  PaladinRetribution = "PaladinRetribution",
  RogueAssassination = "RogueAssassination",
  RogueCombat = "RogueCombat",
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

export const WarcraftClassColour: {
  [className in WarcraftPlayerClass]: string;
} = {
  DeathKnight: "#C41F3B",
  Druid: "#FF7D0A",
  Hunter: "#A9D271",
  Mage: "#40C7EB",
  Paladin: "#F58CBA",
  Priest: "#FFFFFF",
  Rogue: "#FFF569",
  Shaman: "#0070DE",
  Warlock: "#8787ED",
  Warrior: "#C79C6E",
  Unknown: "#FFFFFF",
};

export const DragItemTypes = {
  PLAYER: "player",
};
