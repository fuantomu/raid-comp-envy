import {
  InviteStatus,
  RaidHelperClass,
  RaidHelperSpec,
  RaidHelperStatus,
  WarcraftPlayerClass,
  WarcraftPlayerSpec
} from "../consts";

export const RHClassMap: {
  [rhClass in RaidHelperClass]: WarcraftPlayerClass;
} = {
  DK: WarcraftPlayerClass.DeathKnight,
  DH: WarcraftPlayerClass.DemonHunter,
  Druid: WarcraftPlayerClass.Druid,
  Hunter: WarcraftPlayerClass.Hunter,
  Mage: WarcraftPlayerClass.Mage,
  Monk: WarcraftPlayerClass.Monk,
  Paladin: WarcraftPlayerClass.Paladin,
  Priest: WarcraftPlayerClass.Priest,
  Rogue: WarcraftPlayerClass.Rogue,
  Shaman: WarcraftPlayerClass.Shaman,
  Warlock: WarcraftPlayerClass.Warlock,
  Warrior: WarcraftPlayerClass.Warrior,
};

export const RHSpecMap: {
  [rhSpec in RaidHelperSpec]: WarcraftPlayerSpec;
} = {
  Blood: WarcraftPlayerSpec.DeathKnightBlood,
  Frost1: WarcraftPlayerSpec.DeathKnightFrost,
  Unholy: WarcraftPlayerSpec.DeathKnightUnholy,
  Havoc: WarcraftPlayerSpec.DemonHunterHavoc,
  Vengeance: WarcraftPlayerSpec.DemonHunterVengeance,
  Balance: WarcraftPlayerSpec.DruidBalance,
  Feral: WarcraftPlayerSpec.DruidFeral,
  Guardian: WarcraftPlayerSpec.DruidGuardian,
  Restoration: WarcraftPlayerSpec.DruidRestoration,
  Beastmastery: WarcraftPlayerSpec.HunterBeastmastery,
  Marksman: WarcraftPlayerSpec.HunterMarksmanship,
  Survival: WarcraftPlayerSpec.HunterSurvival,
  Arcane: WarcraftPlayerSpec.MageArcane,
  Fire: WarcraftPlayerSpec.MageFire,
  Frost: WarcraftPlayerSpec.MageFrost,
  Brewmaster: WarcraftPlayerSpec.MonkBrewmaster,
  Mistweaver: WarcraftPlayerSpec.MonkMistweaver,
  Windwalker: WarcraftPlayerSpec.MonkWindwalker,
  Discipline: WarcraftPlayerSpec.PriestDiscipline,
  Holy: WarcraftPlayerSpec.PriestHoly,
  Shadow: WarcraftPlayerSpec.PriestShadow,
  Holy1: WarcraftPlayerSpec.PaladinHoly,
  Protection1: WarcraftPlayerSpec.PaladinProtection,
  Retribution: WarcraftPlayerSpec.PaladinRetribution,
  Assassination: WarcraftPlayerSpec.RogueAssassination,
  Outlaw: WarcraftPlayerSpec.RogueOutlaw,
  Subtlety: WarcraftPlayerSpec.RogueSubtlety,
  Affliction: WarcraftPlayerSpec.WarlockAffliction,
  Demonology: WarcraftPlayerSpec.WarlockDemonology,
  Destruction: WarcraftPlayerSpec.WarlockDestruction,
  Elemental: WarcraftPlayerSpec.ShamanElemental,
  Enhancement: WarcraftPlayerSpec.ShamanEnhancement,
  Restoration1: WarcraftPlayerSpec.ShamanRestoration,
  Arms: WarcraftPlayerSpec.WarriorArms,
  Fury: WarcraftPlayerSpec.WarriorFury,
  Protection: WarcraftPlayerSpec.WarriorProtection,
};

export const RHSpecClassMap: {
  [rhSpec: string]: WarcraftPlayerClass;
} = {
  Blood: WarcraftPlayerClass.DeathKnight,
  Frost1: WarcraftPlayerClass.DeathKnight,
  Unholy: WarcraftPlayerClass.DeathKnight,
  Havoc: WarcraftPlayerClass.DemonHunter,
  Vengeance: WarcraftPlayerClass.DemonHunter,
  Balance: WarcraftPlayerClass.Druid,
  Feral: WarcraftPlayerClass.Druid,
  Guardian: WarcraftPlayerClass.Druid,
  Restoration: WarcraftPlayerClass.Druid,
  Beastmastery: WarcraftPlayerClass.Hunter,
  Marksman: WarcraftPlayerClass.Hunter,
  Survival: WarcraftPlayerClass.Hunter,
  Arcane: WarcraftPlayerClass.Mage,
  Fire: WarcraftPlayerClass.Mage,
  Frost: WarcraftPlayerClass.Mage,
  Brewmaster: WarcraftPlayerClass.Monk,
  Mistweaver: WarcraftPlayerClass.Monk,
  Windwalker: WarcraftPlayerClass.Monk,
  Discipline: WarcraftPlayerClass.Priest,
  Holy: WarcraftPlayerClass.Priest,
  Shadow: WarcraftPlayerClass.Priest,
  Holy1: WarcraftPlayerClass.Paladin,
  Protection1: WarcraftPlayerClass.Paladin,
  Retribution: WarcraftPlayerClass.Paladin,
  Assassination: WarcraftPlayerClass.Rogue,
  Combat: WarcraftPlayerClass.Rogue,
  Subtlety: WarcraftPlayerClass.Rogue,
  Affliction: WarcraftPlayerClass.Warlock,
  Demonology: WarcraftPlayerClass.Warlock,
  Destruction: WarcraftPlayerClass.Warlock,
  Elemental: WarcraftPlayerClass.Shaman,
  Enhancement: WarcraftPlayerClass.Shaman,
  Restoration1: WarcraftPlayerClass.Shaman,
  Arms: WarcraftPlayerClass.Warrior,
  Fury: WarcraftPlayerClass.Warrior,
  Protection: WarcraftPlayerClass.Warrior,
};

export const RHStatusMap: {
  [rhClass in RaidHelperStatus]: InviteStatus;
} = {
  Tentative: InviteStatus.Tentative,
  Bench: InviteStatus.Declined,
  Late: InviteStatus.Tentative,
  Absence: InviteStatus.Declined,
};
