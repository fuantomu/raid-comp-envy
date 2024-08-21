import { WarcraftRole } from "./utils/RoleProvider/consts";

export enum AppErrorId {
  Unspecific = "unspecific",
  App404 = "notFound",
  ApiCancelled = "apiCancelled",
  Api403 = "api403",
  Api404 = "api404"
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
  Warrior = "Warrior"
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
  Goblin = "Goblin"
}

export enum InviteStatus {
  Invited = "invited",
  Tentative = "tentative",
  Accepted = "accepted",
  Backup = "backup",
  Declined = "declined",
  Benched = "benched",
  Unknown = "unknown"
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
  WarriorProtection = "WarriorProtection"
}

export enum WarcraftPlayerRole {
  MainTank = "MainTank",
  OffTank = "OffTank",
  SpecSwap = "SpecSwap",
  None = "None"
}

export const WarcraftClassColour: {
  [class_name in WarcraftPlayerClass]: string;
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
  Warrior: "#C79C6E"
};

export const DragItemTypes = {
  PLAYER: "player",
  NONE: "None"
};

export const RoleWeight: {
  [role in WarcraftRole]: number;
} = {
  Unknown: 9,
  Healer: 2,
  Tank: 1,
  MeleeDPS: 3,
  RangedDPS: 4
};

export const ClassWeight: { [class_name in WarcraftPlayerClass]: number } = {
  Priest: 10,
  Rogue: 9,
  Shaman: 8,
  Mage: 7,
  Hunter: 6,
  Druid: 5,
  Deathknight: 4,
  Warlock: 3,
  Warrior: 2,
  Paladin: 1
};

export const Instance = {
  Wotlk: [
    {
      name: "Icecrown Citadel",
      abbreviation: "ICC"
    },
    {
      name: "Ruby Sanctum",
      abbreviation: "RS"
    }
  ],
  Cataclysm: [
    {
      name: "Blackwing Descent",
      abbreviation: "BWD"
    },
    {
      name: "The Bastion of Twilight",
      abbreviation: "BOT"
    },
    {
      name: "Throne of the Four Winds",
      abbreviation: "FOURWINDS"
    },
    {
      name: "Firelands",
      abbreviation: "FL"
    },
    {
      name: "Dragon Soul",
      abbreviation: "DS"
    }
  ]
};

export const AccountRole = {
  Admin: 1,
  Guest: 2
};

export const FunctionAccountRole = {
  AddPlayer: [AccountRole.Admin],
  EditPlayer: [AccountRole.Admin],
  ClickPlayer: [AccountRole.Admin],
  MovePlayer: [AccountRole.Admin],
  PostDiscord: [AccountRole.Admin],
  ResetBuild: [AccountRole.Admin],
  DeleteBuild: [AccountRole.Admin],
  CreateBuild: [AccountRole.Admin],
  ChangeBuild: [AccountRole.Admin, AccountRole.Guest],
  ChangeDate: [AccountRole.Admin],
  ChangeInstance: [AccountRole.Admin]
};

export const accountRoleTimeouts = {
  1: process.env.REACT_APP_TOKEN_LENGTH_ADMIN,
  2: process.env.REACT_APP_TOKEN_LENGTH_GUEST
};

export const MessageType = {
  updateplayer: "Player updated",
  moveplayer: "Player moved",
  removeplayer: "Player removed",
  addplayer: "Player added",
  updateroster: "Roster updated",
  updatebuild: "Build updated",
  removeroster: "Roster updated",
  addbuild: "Build added",
  resetbuild: "Build resetted",
  removebuild: "Build deleted",
  absence: "Absence received",
  swapplayer: "Player swapped"
};

export const RegisteredMessages = {
  roster: ["updateroster", "removeroster"],
  build: [
    "addplayer",
    "updateplayer",
    "removeplayer",
    "moveplayer",
    "addbuild",
    "removebuild",
    "resetbuild",
    "updatebuild",
    "swapplayer"
  ],
  absence: ["absence"]
};
