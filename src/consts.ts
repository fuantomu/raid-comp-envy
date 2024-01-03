import { WarcraftRole } from "./utils/RoleProvider/consts";

export enum AppErrorId {
  Unspecific = "unspecific",
  App404 = "notFound",
  ApiCancelled = "apiCancelled",
  Api403 = "api403",
  Api404 = "api404",
}

export enum WarcraftPlayerClass {
  Deathknight = "Deathknight",
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

export enum WarcraftPlayerRace {
  Human = "Human",
  Dwarf = "Dwarf",
  Gnome = "Gnome",
  Nightelf = "Nightelf",
  Draenei = "Draenei",
  Worgen = "Worgen",
  Orc = "Orc",
  Troll = "Troll",
  Undead = "Undead",
  Tauren = "Tauren",
  Bloodelf = "Bloodelf",
  Goblin = "Goblin",
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
  DeathknightBlood = "DeathknightBlood",
  DeathknightFrost = "DeathknightFrost",
  DeathknightUnholy = "DeathknightUnholy",
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
  Deathknight: "#C41F3B",
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

export const RoleWeight: {
  [role in WarcraftRole]: number;
} = {
  Unknown: 9,
  Healer: 2,
  Tank: 1,
  MeleeDPS: 3,
  RangedDPS: 4
}

export const Instance = {
  "Wotlk": [
    {
      "name": "Icecrown Citadel",
      "abbreviation": "ICC"
    },
    {
      "name": "Ruby Sanctum",
      "abbreviation": "RS"
    }
  ],
  "Cataclysm": [
    {
      "name": "Blackwing Descent",
      "abbreviation": "BWD"
    },
    {
      "name": "The Bastion of Twilight",
      "abbreviation": "BoT"
    },
    {
      "name": "Throne of the Four Winds",
      "abbreviation": "4Winds"
    },
    {
      "name": "Firelands",
      "abbreviation": "FL"
    },
    {
      "name": "Dragon Soul",
      "abbreviation": "DS"
    }
  ]
}
