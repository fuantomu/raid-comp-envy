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

export enum PlayerRole {
  Unknown,
  Tank,
  Healer,
  RangedDPS,
  MeleeDPS,
}

export enum InviteStatus {
  Invited,
  Tentative,
  Accepted,
  Confirmed,
  Declined,
  Unknown,
}

export enum WarcraftPlayerSpec {
  DeathKnightBlood,
  DeathKnightFrost,
  DeathKnightUnholy,
  DemonHunterHavoc,
  DemonHunterVengeance,
  DruidBalance,
  DruidFeral,
  DruidGuardian,
  DruidRestoration,
  HunterBeast,
  HunterMarksmanship,
  HunterSurvival,
  MageArcane,
  MageFire,
  MageFrost,
  MonkBrewmaster,
  MonkMistweaver,
  MonkWindwalker,
  PaladinDiscipline,
  PaladinHoly,
  PaladinShadow,
  PriestHoly,
  PriestProtection,
  PriestRetribution,
  RogueAssassination,
  RogueOutlaw,
  RogueSubtlety,
  ShamanAffliction,
  ShamanDemonology,
  ShamanDestruction,
  WarlockElemental,
  WarlockEnhancement,
  WarlockRestoration,
  WarriorArms,
  WarriorFury,
  WarriorProtection,
}

interface WarcraftClassConfig {
  icon: string;
  colour: string;
}

interface WarcraftSpecConfig {
  icon: string;
  role: PlayerRole;
}

type WarcraftConfig = {
  [className in WarcraftPlayerClass]: {
    default: WarcraftClassConfig;
    [spec: number]: WarcraftSpecConfig;
  };
};

// export const WarcraftConfig: WarcraftConfig = {
//   [WarcraftPlayerClass.DeathKnight]: {
//     default: {
//       icon: WarcraftIcon[WarcraftPlayerClass.DeathKnight],
//       colour: WarcraftClassColour[WarcraftPlayerClass.DeathKnight]
//     }
//   }
// }