import { WarcraftPlayerClass, WarcraftPlayerSpec } from "../../consts";

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

export enum WarcraftRaidBuff {
  Intellect = "Intellect",
  AttackPower = "AttackPower",
  Stamina = "Stamina",
  MovementSpeed = "MovementSpeed",
  PhysicalDamage = "PhysicalDamage",
  MagicDamage = "MagicDamage",
  DamageReduction = "DamageReduction",
}

export const WarcraftClassRaidBuffs: {
  [className in WarcraftPlayerClass]: WarcraftRaidBuff[];
} = {
  [WarcraftPlayerClass.DeathKnight]: [],
  [WarcraftPlayerClass.DemonHunter]: [WarcraftRaidBuff.MagicDamage],
  [WarcraftPlayerClass.Druid]: [],
  [WarcraftPlayerClass.Evoker]: [],
  [WarcraftPlayerClass.Hunter]: [],
  [WarcraftPlayerClass.Mage]: [WarcraftRaidBuff.Intellect],
  [WarcraftPlayerClass.Monk]: [WarcraftRaidBuff.PhysicalDamage],
  [WarcraftPlayerClass.Priest]: [WarcraftRaidBuff.Stamina],
  [WarcraftPlayerClass.Paladin]: [WarcraftRaidBuff.DamageReduction],
  [WarcraftPlayerClass.Rogue]: [],
  [WarcraftPlayerClass.Warlock]: [],
  [WarcraftPlayerClass.Shaman]: [],
  [WarcraftPlayerClass.Warrior]: [WarcraftRaidBuff.AttackPower],
  [WarcraftPlayerClass.Unknown]: [],
};

export const WarcraftSpecRaidBuffs: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidBuff[];
} = {
  [WarcraftPlayerSpec.DeathKnightBlood]: [...WarcraftClassRaidBuffs.DeathKnight],
  [WarcraftPlayerSpec.DeathKnightFrost]: [...WarcraftClassRaidBuffs.DeathKnight],
  [WarcraftPlayerSpec.DeathKnightUnholy]: [...WarcraftClassRaidBuffs.DeathKnight],
  [WarcraftPlayerSpec.DemonHunterHavoc]: [...WarcraftClassRaidBuffs.DemonHunter],
  [WarcraftPlayerSpec.DemonHunterVengeance]: [...WarcraftClassRaidBuffs.DemonHunter],
  [WarcraftPlayerSpec.DruidBalance]: [...WarcraftClassRaidBuffs.Druid],
  [WarcraftPlayerSpec.DruidFeral]: [...WarcraftClassRaidBuffs.Druid],
  [WarcraftPlayerSpec.DruidGuardian]: [...WarcraftClassRaidBuffs.Druid],
  [WarcraftPlayerSpec.DruidRestoration]: [...WarcraftClassRaidBuffs.Druid],
  [WarcraftPlayerSpec.EvokerDevastation]: [...WarcraftClassRaidBuffs.Evoker],
  [WarcraftPlayerSpec.EvokerPreservation]: [...WarcraftClassRaidBuffs.Evoker],
  [WarcraftPlayerSpec.HunterBeastmastery]: [...WarcraftClassRaidBuffs.Hunter],
  [WarcraftPlayerSpec.HunterMarksmanship]: [...WarcraftClassRaidBuffs.Hunter],
  [WarcraftPlayerSpec.HunterSurvival]: [...WarcraftClassRaidBuffs.Hunter],
  [WarcraftPlayerSpec.MageArcane]: [...WarcraftClassRaidBuffs.Mage],
  [WarcraftPlayerSpec.MageFire]: [...WarcraftClassRaidBuffs.Mage],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassRaidBuffs.Mage],
  [WarcraftPlayerSpec.MonkBrewmaster]: [...WarcraftClassRaidBuffs.Monk],
  [WarcraftPlayerSpec.MonkMistweaver]: [...WarcraftClassRaidBuffs.Monk],
  [WarcraftPlayerSpec.MonkWindwalker]: [
    ...WarcraftClassRaidBuffs.Monk,
    WarcraftRaidBuff.MovementSpeed,
  ],
  [WarcraftPlayerSpec.PriestDiscipline]: [...WarcraftClassRaidBuffs.Priest],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassRaidBuffs.Priest],
  [WarcraftPlayerSpec.PriestShadow]: [...WarcraftClassRaidBuffs.Priest],
  [WarcraftPlayerSpec.PaladinHoly]: [...WarcraftClassRaidBuffs.Paladin],
  [WarcraftPlayerSpec.PaladinProtection]: [...WarcraftClassRaidBuffs.Paladin],
  [WarcraftPlayerSpec.PaladinRetribution]: [...WarcraftClassRaidBuffs.Paladin],
  [WarcraftPlayerSpec.RogueAssassination]: [...WarcraftClassRaidBuffs.Rogue],
  [WarcraftPlayerSpec.RogueOutlaw]: [...WarcraftClassRaidBuffs.Rogue],
  [WarcraftPlayerSpec.RogueSubtlety]: [...WarcraftClassRaidBuffs.Rogue],
  [WarcraftPlayerSpec.WarlockAffliction]: [...WarcraftClassRaidBuffs.Warlock],
  [WarcraftPlayerSpec.WarlockDemonology]: [...WarcraftClassRaidBuffs.Warlock],
  [WarcraftPlayerSpec.WarlockDestruction]: [...WarcraftClassRaidBuffs.Warlock],
  [WarcraftPlayerSpec.ShamanElemental]: [...WarcraftClassRaidBuffs.Shaman],
  [WarcraftPlayerSpec.ShamanEnhancement]: [...WarcraftClassRaidBuffs.Shaman],
  [WarcraftPlayerSpec.ShamanRestoration]: [...WarcraftClassRaidBuffs.Shaman],
  [WarcraftPlayerSpec.WarriorArms]: [...WarcraftClassRaidBuffs.Warrior],
  [WarcraftPlayerSpec.WarriorFury]: [...WarcraftClassRaidBuffs.Warrior],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassRaidBuffs.Warrior],
  [WarcraftPlayerSpec.Unknown]: [],
};

export enum WarcraftRaidUtility {
  Bloodlust = "Bloodlust",
  CombatResurrection = "CombatResurrection",
  MovementSpeed = "MovementSpeed",
  Healthstone = "Healthstone",
  Gateway = "Gateway",
  Innervate = "Innervate",
  AntiMagicZone = "AntiMagicZone",
  BlessingOfProtection = "BlessingOfProtection",
  RallyingCry = "RallyingCry",
  Darkness = "Darkness",
}

export const WarcraftClassUtilities: {
  [className in WarcraftPlayerClass]: WarcraftRaidUtility[];
} = {
  [WarcraftPlayerClass.DeathKnight]: [
    WarcraftRaidUtility.AntiMagicZone,
    WarcraftRaidUtility.CombatResurrection,
  ],
  [WarcraftPlayerClass.DemonHunter]: [],
  [WarcraftPlayerClass.Druid]: [
    WarcraftRaidUtility.CombatResurrection,
    WarcraftRaidUtility.MovementSpeed,
  ],
  [WarcraftPlayerClass.Evoker]: [WarcraftRaidUtility.Bloodlust, WarcraftRaidUtility.MovementSpeed],
  [WarcraftPlayerClass.Hunter]: [WarcraftRaidUtility.Bloodlust],
  [WarcraftPlayerClass.Mage]: [WarcraftRaidUtility.Bloodlust],
  [WarcraftPlayerClass.Monk]: [],
  [WarcraftPlayerClass.Priest]: [],
  [WarcraftPlayerClass.Paladin]: [WarcraftRaidUtility.BlessingOfProtection],
  [WarcraftPlayerClass.Rogue]: [],
  [WarcraftPlayerClass.Warlock]: [
    WarcraftRaidUtility.CombatResurrection,
    WarcraftRaidUtility.Healthstone,
    WarcraftRaidUtility.Gateway,
  ],
  [WarcraftPlayerClass.Shaman]: [WarcraftRaidUtility.Bloodlust, WarcraftRaidUtility.MovementSpeed],
  [WarcraftPlayerClass.Warrior]: [WarcraftRaidUtility.RallyingCry],
  [WarcraftPlayerClass.Unknown]: [],
};

export const WarcraftSpecUtilities: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidUtility[];
} = {
  [WarcraftPlayerSpec.DeathKnightBlood]: [...WarcraftClassUtilities.DeathKnight],
  [WarcraftPlayerSpec.DeathKnightFrost]: [...WarcraftClassUtilities.DeathKnight],
  [WarcraftPlayerSpec.DeathKnightUnholy]: [...WarcraftClassUtilities.DeathKnight],

  [WarcraftPlayerSpec.DemonHunterHavoc]: [
    ...WarcraftClassUtilities.DemonHunter,
    WarcraftRaidUtility.Darkness,
  ],
  [WarcraftPlayerSpec.DemonHunterVengeance]: [...WarcraftClassUtilities.DemonHunter],

  [WarcraftPlayerSpec.DruidBalance]: [...WarcraftClassUtilities.Druid],
  [WarcraftPlayerSpec.DruidFeral]: [...WarcraftClassUtilities.Druid],
  [WarcraftPlayerSpec.DruidGuardian]: [
    ...WarcraftClassUtilities.Druid,
    WarcraftRaidUtility.Innervate,
  ],
  [WarcraftPlayerSpec.DruidRestoration]: [
    ...WarcraftClassUtilities.Druid,
    WarcraftRaidUtility.Innervate,
  ],

  [WarcraftPlayerSpec.EvokerDevastation]: [...WarcraftClassUtilities.Evoker],
  [WarcraftPlayerSpec.EvokerPreservation]: [...WarcraftClassUtilities.Evoker],

  [WarcraftPlayerSpec.HunterBeastmastery]: [...WarcraftClassUtilities.Hunter],
  [WarcraftPlayerSpec.HunterMarksmanship]: [...WarcraftClassUtilities.Hunter],
  [WarcraftPlayerSpec.HunterSurvival]: [...WarcraftClassUtilities.Hunter],

  [WarcraftPlayerSpec.MageArcane]: [...WarcraftClassUtilities.Mage],
  [WarcraftPlayerSpec.MageFire]: [...WarcraftClassUtilities.Mage],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassUtilities.Mage],

  [WarcraftPlayerSpec.MonkBrewmaster]: [...WarcraftClassUtilities.Monk],
  [WarcraftPlayerSpec.MonkMistweaver]: [...WarcraftClassUtilities.Monk],
  [WarcraftPlayerSpec.MonkWindwalker]: [...WarcraftClassUtilities.Monk],

  [WarcraftPlayerSpec.PriestDiscipline]: [...WarcraftClassUtilities.Priest],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassUtilities.Priest],
  [WarcraftPlayerSpec.PriestShadow]: [...WarcraftClassUtilities.Priest],

  [WarcraftPlayerSpec.PaladinHoly]: [...WarcraftClassUtilities.Paladin],
  [WarcraftPlayerSpec.PaladinProtection]: [...WarcraftClassUtilities.Paladin],
  [WarcraftPlayerSpec.PaladinRetribution]: [...WarcraftClassUtilities.Paladin],

  [WarcraftPlayerSpec.RogueAssassination]: [...WarcraftClassUtilities.Rogue],
  [WarcraftPlayerSpec.RogueOutlaw]: [...WarcraftClassUtilities.Rogue],
  [WarcraftPlayerSpec.RogueSubtlety]: [...WarcraftClassUtilities.Rogue],

  [WarcraftPlayerSpec.WarlockAffliction]: [...WarcraftClassUtilities.Warlock],
  [WarcraftPlayerSpec.WarlockDemonology]: [...WarcraftClassUtilities.Warlock],
  [WarcraftPlayerSpec.WarlockDestruction]: [...WarcraftClassUtilities.Warlock],

  [WarcraftPlayerSpec.ShamanElemental]: [...WarcraftClassUtilities.Shaman],
  [WarcraftPlayerSpec.ShamanEnhancement]: [...WarcraftClassUtilities.Shaman],
  [WarcraftPlayerSpec.ShamanRestoration]: [...WarcraftClassUtilities.Shaman],

  [WarcraftPlayerSpec.WarriorArms]: [...WarcraftClassUtilities.Warrior],
  [WarcraftPlayerSpec.WarriorFury]: [...WarcraftClassUtilities.Warrior],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassUtilities.Warrior],
  [WarcraftPlayerSpec.Unknown]: [],
};

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
  [WarcraftPlayerClass.Evoker]: [
    WarcraftPlayerSpec.EvokerDevastation,
    WarcraftPlayerSpec.EvokerPreservation,
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
  [WarcraftPlayerClass.Unknown]: [WarcraftPlayerSpec.Unknown],
};
