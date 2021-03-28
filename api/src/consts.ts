export enum InviteStatus {
  Invited = "invited",
  Tentative = "tentative",
  Accepted = "accepted",
  Declined = "declined",
  Unknown = "unknown",
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
  Unknown = "Unknown"
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
  Unknown = "Unknown",
}

export enum GroupId {
  NONE = "none",
  GROUP1 = 1,
  GROUP2 = 2,
  GROUP3 = 3,
  GROUP4 = 4,
  GROUP5 = 5,
  GROUP6 = 6,
  GROUP7 = 7,
  GROUP8 = 8,
}

export enum RaidHelperClass {
  DK = "DK",
  DH = "DH",
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

export enum RaidHelperSpec {
  Blood = "Blood",
  Frost1 = "Frost1",
  Unholy = "Unholy",
  Havoc = "Havoc",
  Vengeance = "Vengeance",
  Balance = "Balance",
  Feral = "Feral",
  Guardian = "Guardian",
  Restoration = "Restoration",
  Beastmastery = "Beastmastery",
  Marksman = "Marksman",
  Survival = "Survival",
  Arcane = "Arcane",
  Fire = "Fire",
  Frost = "Frost",
  Brewmaster = "Brewmaster",
  Mistweaver = "Mistweaver",
  Windwalker = "Windwalker",
  Discipline = "Discipline",
  Holy = "Holy",
  Shadow = "Shadow",
  Holy1 = "Holy1",
  Protection1 = "Protection1",
  Retribution = "Retribution",
  Assassination = "Assassination",
  Outlaw = "Outlaw",
  Combat = "Combat",
  Subtlety = "Subtlety",
  Affliction = "Affliction",
  Demonology = "Demonology",
  Destruction = "Destruction",
  Elemental = "Elemental",
  Enhancement = "Enhancement",
  Restoration1 = "Restoration1",
  Arms = "Arms",
  Fury = "Fury",
  Protection = "Protection",
}

export enum RaidHelperStatus {
  Tentative = "Tentative",
  Bench = "Bench",
  Late = "Late",
  Absence = "Absence",
}

export const WarcraftPlayerClassSpecs: {
  [className in WarcraftPlayerClass]: WarcraftPlayerSpec[];
} = {
  [WarcraftPlayerClass.DeathKnight]: [
    WarcraftPlayerSpec.DeathKnightBlood,
    WarcraftPlayerSpec.DeathKnightFrost,
    WarcraftPlayerSpec.DeathKnightUnholy,
  ],
  [WarcraftPlayerClass.DemonHunter]: [
    WarcraftPlayerSpec.DemonHunterHavoc,
    WarcraftPlayerSpec.DemonHunterVengeance,
  ],
  [WarcraftPlayerClass.Druid]: [
    WarcraftPlayerSpec.DruidBalance,
    WarcraftPlayerSpec.DruidFeral,
    WarcraftPlayerSpec.DruidGuardian,
    WarcraftPlayerSpec.DruidRestoration,
  ],
  [WarcraftPlayerClass.Hunter]: [
    WarcraftPlayerSpec.HunterBeastmastery,
    WarcraftPlayerSpec.HunterMarksmanship,
    WarcraftPlayerSpec.HunterSurvival,
  ],
  [WarcraftPlayerClass.Mage]: [
    WarcraftPlayerSpec.MageArcane,
    WarcraftPlayerSpec.MageFire,
    WarcraftPlayerSpec.MageFrost,
  ],
  [WarcraftPlayerClass.Monk]: [
    WarcraftPlayerSpec.MonkBrewmaster,
    WarcraftPlayerSpec.MonkMistweaver,
    WarcraftPlayerSpec.MonkWindwalker,
  ],
  [WarcraftPlayerClass.Priest]: [
    WarcraftPlayerSpec.PriestDiscipline,
    WarcraftPlayerSpec.PriestHoly,
    WarcraftPlayerSpec.PriestShadow,
  ],
  [WarcraftPlayerClass.Paladin]: [
    WarcraftPlayerSpec.PaladinHoly,
    WarcraftPlayerSpec.PaladinProtection,
    WarcraftPlayerSpec.PaladinRetribution,
  ],
  [WarcraftPlayerClass.Rogue]: [
    WarcraftPlayerSpec.RogueAssassination,
    WarcraftPlayerSpec.RogueOutlaw,
    WarcraftPlayerSpec.RogueSubtlety,
  ],
  [WarcraftPlayerClass.Warlock]: [
    WarcraftPlayerSpec.WarlockAffliction,
    WarcraftPlayerSpec.WarlockDemonology,
    WarcraftPlayerSpec.WarlockDestruction,
  ],
  [WarcraftPlayerClass.Shaman]: [
    WarcraftPlayerSpec.ShamanElemental,
    WarcraftPlayerSpec.ShamanEnhancement,
    WarcraftPlayerSpec.ShamanRestoration,
  ],
  [WarcraftPlayerClass.Warrior]: [
    WarcraftPlayerSpec.WarriorArms,
    WarcraftPlayerSpec.WarriorFury,
    WarcraftPlayerSpec.WarriorProtection,
  ],
  [WarcraftPlayerClass.Unknown]: [
    WarcraftPlayerSpec.Unknown
  ]
};