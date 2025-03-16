import { WarcraftPlayerClass, WarcraftPlayerRace, WarcraftPlayerSpec } from "../../../consts";

export enum WarcraftRaidBuff {
  AttackPower10 = "AttackPower10",
  AttackSpeed10 = "AttackSpeed10",
  SpellPower10 = "SpellPower10",
  SpellHaste5 = "SpellHaste5",
  CritChance5 = "CritChance5",
  MasteryRating3000 = "MasteryRating3000",
  AllStats5 = "AllStats5",
  Stamina10 = "Stamina10"
}

export const WarcraftClassRaidBuffs: {
  [class_name in WarcraftPlayerClass]: WarcraftRaidBuff[];
} = {
  [WarcraftPlayerClass.Deathknight]: [WarcraftRaidBuff.AttackPower10],
  [WarcraftPlayerClass.Druid]: [WarcraftRaidBuff.AllStats5],
  [WarcraftPlayerClass.Hunter]: [WarcraftRaidBuff.AttackPower10,WarcraftRaidBuff.AttackSpeed10,WarcraftRaidBuff.SpellHaste5,WarcraftRaidBuff.MasteryRating3000],
  [WarcraftPlayerClass.Mage]: [WarcraftRaidBuff.SpellPower10,WarcraftRaidBuff.CritChance5],
  [WarcraftPlayerClass.Priest]: [WarcraftRaidBuff.Stamina10],
  [WarcraftPlayerClass.Paladin]: [WarcraftRaidBuff.MasteryRating3000,WarcraftRaidBuff.AllStats5],
  [WarcraftPlayerClass.Rogue]: [WarcraftRaidBuff.AttackSpeed10],
  [WarcraftPlayerClass.Warlock]: [WarcraftRaidBuff.SpellPower10,WarcraftRaidBuff.Stamina10],
  [WarcraftPlayerClass.Shaman]: [WarcraftRaidBuff.SpellPower10,WarcraftRaidBuff.MasteryRating3000],
  [WarcraftPlayerClass.Warrior]: [WarcraftRaidBuff.AttackPower10,WarcraftRaidBuff.Stamina10],
  [WarcraftPlayerClass.Monk]: [WarcraftRaidBuff.AllStats5]
};

export const WarcraftSpecRaidBuffs: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidBuff[];
} = {
  [WarcraftPlayerSpec.DeathknightBlood]: [
    ...WarcraftClassRaidBuffs.Deathknight
  ],
  [WarcraftPlayerSpec.DeathknightFrost]: [
    ...WarcraftClassRaidBuffs.Deathknight,
    WarcraftRaidBuff.AttackSpeed10
  ],
  [WarcraftPlayerSpec.DeathknightUnholy]: [...WarcraftClassRaidBuffs.Deathknight,WarcraftRaidBuff.AttackSpeed10],
  [WarcraftPlayerSpec.DruidBalance]: [...WarcraftClassRaidBuffs.Druid,WarcraftRaidBuff.SpellHaste5],
  [WarcraftPlayerSpec.DruidFeral]: [...WarcraftClassRaidBuffs.Druid,WarcraftRaidBuff.CritChance5],
  [WarcraftPlayerSpec.DruidGuardian]: [...WarcraftClassRaidBuffs.Druid,WarcraftRaidBuff.CritChance5],
  [WarcraftPlayerSpec.DruidRestoration]: [
    ...WarcraftClassRaidBuffs.Druid
  ],
  [WarcraftPlayerSpec.HunterBeastmastery]: [
    ...WarcraftClassRaidBuffs.Hunter,
    WarcraftRaidBuff.AllStats5,
    WarcraftRaidBuff.CritChance5,
    WarcraftRaidBuff.SpellPower10,
    WarcraftRaidBuff.Stamina10
  ],
  [WarcraftPlayerSpec.HunterMarksmanship]: [
    ...WarcraftClassRaidBuffs.Hunter
  ],
  [WarcraftPlayerSpec.HunterSurvival]: [
    ...WarcraftClassRaidBuffs.Hunter
  ],
  [WarcraftPlayerSpec.MageArcane]: [...WarcraftClassRaidBuffs.Mage],
  [WarcraftPlayerSpec.MageFire]: [...WarcraftClassRaidBuffs.Mage],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassRaidBuffs.Mage],
  [WarcraftPlayerSpec.PriestDiscipline]: [...WarcraftClassRaidBuffs.Priest],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassRaidBuffs.Priest],
  [WarcraftPlayerSpec.PriestShadow]: [
    ...WarcraftClassRaidBuffs.Priest,
    WarcraftRaidBuff.SpellHaste5
  ],
  [WarcraftPlayerSpec.PaladinHoly]: [...WarcraftClassRaidBuffs.Paladin],
  [WarcraftPlayerSpec.PaladinProtection]: [...WarcraftClassRaidBuffs.Paladin],
  [WarcraftPlayerSpec.PaladinRetribution]: [
    ...WarcraftClassRaidBuffs.Paladin
  ],
  [WarcraftPlayerSpec.RogueAssassination]: [...WarcraftClassRaidBuffs.Rogue],
  [WarcraftPlayerSpec.RogueCombat]: [...WarcraftClassRaidBuffs.Rogue],
  [WarcraftPlayerSpec.RogueSubtlety]: [...WarcraftClassRaidBuffs.Rogue],
  [WarcraftPlayerSpec.WarlockAffliction]: [
    ...WarcraftClassRaidBuffs.Warlock
  ],
  [WarcraftPlayerSpec.WarlockDemonology]: [
    ...WarcraftClassRaidBuffs.Warlock
  ],
  [WarcraftPlayerSpec.WarlockDestruction]: [
    ...WarcraftClassRaidBuffs.Warlock
  ],
  [WarcraftPlayerSpec.ShamanElemental]: [
    ...WarcraftClassRaidBuffs.Shaman,
    WarcraftRaidBuff.SpellHaste5
  ],
  [WarcraftPlayerSpec.ShamanEnhancement]: [
    ...WarcraftClassRaidBuffs.Shaman,
    WarcraftRaidBuff.AttackSpeed10
  ],
  [WarcraftPlayerSpec.ShamanRestoration]: [...WarcraftClassRaidBuffs.Shaman],
  [WarcraftPlayerSpec.WarriorArms]: [...WarcraftClassRaidBuffs.Warrior],
  [WarcraftPlayerSpec.WarriorFury]: [...WarcraftClassRaidBuffs.Warrior],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassRaidBuffs.Warrior],
  [WarcraftPlayerSpec.MonkBrewmaster]: [...WarcraftClassRaidBuffs.Monk],
  [WarcraftPlayerSpec.MonkWindwalker]: [...WarcraftClassRaidBuffs.Monk,WarcraftRaidBuff.CritChance5],
  [WarcraftPlayerSpec.MonkMistweaver]: [...WarcraftClassRaidBuffs.Monk]
};

export enum WarcraftRaidDebuff {
  PhysicalDamageDealtDown10 = "PhysicalDamageDealtDown10",
  PhysicalDamageTakenUp4 = "PhysicalDamageTakenUp4",
  ArmorDown12 = "ArmorDown12",
  SpellDamageTaken5 = "SpellDamageTaken5",
  HealingReduction25 = "HealingReduction25",
  CastSpeedReduction30 = "CastSpeedReduction30"
}

export const WarcraftClassRaidDebuffs: {
  [class_name in WarcraftPlayerClass]: WarcraftRaidDebuff[];
} = {
  [WarcraftPlayerClass.Deathknight]: [WarcraftRaidDebuff.CastSpeedReduction30],
  [WarcraftPlayerClass.Druid]: [WarcraftRaidDebuff.ArmorDown12],
  [WarcraftPlayerClass.Hunter]: [
    WarcraftRaidDebuff.PhysicalDamageDealtDown10,
    WarcraftRaidDebuff.PhysicalDamageTakenUp4,
    WarcraftRaidDebuff.ArmorDown12,
    WarcraftRaidDebuff.SpellDamageTaken5,
    WarcraftRaidDebuff.HealingReduction25,
    WarcraftRaidDebuff.CastSpeedReduction30
  ],
  [WarcraftPlayerClass.Mage]: [],
  [WarcraftPlayerClass.Priest]: [],
  [WarcraftPlayerClass.Paladin]: [],
  [WarcraftPlayerClass.Rogue]: [
    WarcraftRaidDebuff.ArmorDown12,
    WarcraftRaidDebuff.SpellDamageTaken5,
    WarcraftRaidDebuff.HealingReduction25,
    WarcraftRaidDebuff.CastSpeedReduction30
  ],
  [WarcraftPlayerClass.Warlock]: [
    WarcraftRaidDebuff.PhysicalDamageDealtDown10,
    WarcraftRaidDebuff.SpellDamageTaken5,
    WarcraftRaidDebuff.CastSpeedReduction30
  ],
  [WarcraftPlayerClass.Shaman]: [],
  [WarcraftPlayerClass.Warrior]: [
    WarcraftRaidDebuff.PhysicalDamageDealtDown10,
    WarcraftRaidDebuff.ArmorDown12
  ],
  [WarcraftPlayerClass.Monk]: []
};

export const WarcraftSpecRaidDebuffs: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidDebuff[];
} = {
  [WarcraftPlayerSpec.DeathknightBlood]: [
    ...WarcraftClassRaidDebuffs.Deathknight,
    WarcraftRaidDebuff.PhysicalDamageDealtDown10
  ],
  [WarcraftPlayerSpec.DeathknightFrost]: [
    ...WarcraftClassRaidDebuffs.Deathknight,
    WarcraftRaidDebuff.PhysicalDamageTakenUp4
  ],
  [WarcraftPlayerSpec.DeathknightUnholy]: [
    ...WarcraftClassRaidDebuffs.Deathknight,
    WarcraftRaidDebuff.PhysicalDamageTakenUp4
  ],
  [WarcraftPlayerSpec.DruidBalance]: [
    ...WarcraftClassRaidDebuffs.Druid
  ],
  [WarcraftPlayerSpec.DruidFeral]: [
    ...WarcraftClassRaidDebuffs.Druid,
    WarcraftRaidDebuff.PhysicalDamageDealtDown10
  ],
  [WarcraftPlayerSpec.DruidGuardian]: [
    ...WarcraftClassRaidDebuffs.Druid,
    WarcraftRaidDebuff.PhysicalDamageDealtDown10
  ],
  [WarcraftPlayerSpec.DruidRestoration]: [...WarcraftClassRaidDebuffs.Druid],
  [WarcraftPlayerSpec.HunterBeastmastery]: [...WarcraftClassRaidDebuffs.Hunter],
  [WarcraftPlayerSpec.HunterMarksmanship]: [...WarcraftClassRaidDebuffs.Hunter],
  [WarcraftPlayerSpec.HunterSurvival]: [...WarcraftClassRaidDebuffs.Hunter],
  [WarcraftPlayerSpec.MageArcane]: [
    ...WarcraftClassRaidDebuffs.Mage,
    WarcraftRaidDebuff.CastSpeedReduction30
  ],
  [WarcraftPlayerSpec.MageFire]: [
    ...WarcraftClassRaidDebuffs.Mage
  ],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassRaidDebuffs.Mage],
  [WarcraftPlayerSpec.PriestDiscipline]: [...WarcraftClassRaidDebuffs.Priest],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassRaidDebuffs.Priest],
  [WarcraftPlayerSpec.PriestShadow]: [
    ...WarcraftClassRaidDebuffs.Priest
  ],
  [WarcraftPlayerSpec.PaladinHoly]: [...WarcraftClassRaidDebuffs.Paladin],
  [WarcraftPlayerSpec.PaladinProtection]: [
    ...WarcraftClassRaidDebuffs.Paladin,
    WarcraftRaidDebuff.PhysicalDamageDealtDown10
  ],
  [WarcraftPlayerSpec.PaladinRetribution]: [
    ...WarcraftClassRaidDebuffs.Paladin,
    WarcraftRaidDebuff.PhysicalDamageDealtDown10,
    WarcraftRaidDebuff.PhysicalDamageTakenUp4
  ],
  [WarcraftPlayerSpec.RogueAssassination]: [
    ...WarcraftClassRaidDebuffs.Rogue
  ],
  [WarcraftPlayerSpec.RogueCombat]: [
    ...WarcraftClassRaidDebuffs.Rogue
  ],
  [WarcraftPlayerSpec.RogueSubtlety]: [
    ...WarcraftClassRaidDebuffs.Rogue
  ],
  [WarcraftPlayerSpec.WarlockAffliction]: [...WarcraftClassRaidDebuffs.Warlock],
  [WarcraftPlayerSpec.WarlockDemonology]: [
    ...WarcraftClassRaidDebuffs.Warlock
  ],
  [WarcraftPlayerSpec.WarlockDestruction]: [
    ...WarcraftClassRaidDebuffs.Warlock
  ],
  [WarcraftPlayerSpec.ShamanElemental]: [
    ...WarcraftClassRaidDebuffs.Shaman,
    WarcraftRaidDebuff.PhysicalDamageDealtDown10
  ],
  [WarcraftPlayerSpec.ShamanEnhancement]: [
    ...WarcraftClassRaidDebuffs.Shaman,
    WarcraftRaidDebuff.PhysicalDamageDealtDown10
  ],
  [WarcraftPlayerSpec.ShamanRestoration]: [...WarcraftClassRaidDebuffs.Shaman],
  [WarcraftPlayerSpec.WarriorArms]: [
    ...WarcraftClassRaidDebuffs.Warrior,
    WarcraftRaidDebuff.PhysicalDamageTakenUp4,
    WarcraftRaidDebuff.HealingReduction25
  ],
  [WarcraftPlayerSpec.WarriorFury]: [
    ...WarcraftClassRaidDebuffs.Warrior,
    WarcraftRaidDebuff.PhysicalDamageTakenUp4,
    WarcraftRaidDebuff.HealingReduction25
  ],
  [WarcraftPlayerSpec.WarriorProtection]: [
    ...WarcraftClassRaidDebuffs.Warrior
  ],
  [WarcraftPlayerSpec.MonkBrewmaster]: [
    ...WarcraftClassRaidDebuffs.Monk,
    WarcraftRaidDebuff.PhysicalDamageDealtDown10
  ],
  [WarcraftPlayerSpec.MonkWindwalker]: [
    ...WarcraftClassRaidDebuffs.Monk,
    WarcraftRaidDebuff.HealingReduction25
  ],
  [WarcraftPlayerSpec.MonkMistweaver]: [
    ...WarcraftClassRaidDebuffs.Monk
  ]
};

export enum WarcraftRaidUtility {
  Bloodlust = "Bloodlust",
  CombatResurrection = "CombatResurrection",
  Stun = "Stun",
  Incapacitate = "Incapacitate",
  Fear = "Fear",
  Slow = "Slow",
  Root = "Root",
  RootAoE = "RootAoE",
  Knockback = "Knockback",
  Pull = "Pull",
  DamageReduction = "DamageReduction",
  Disorient = "Disorient",
  Silence = "Silence",
  Disarm = "Disarm",
  SlowImmunity = "SlowImmunity",
  Interrupt = "Interrupt",
  Taunt = "Taunt",
  Horror = "Horror",
  HealingReduction = "HealingReduction",
  IncreasedDamageTaken = "IncreasedDamageTaken",
  Immunity = "Immunity",
  SpellReflect = "SpellReflect",
  CritDamageUp20 = "CritDamageUp20",
  EnemyDamageDealtDown10 = "EnemyDamageDealtDown10",

  EnemyArmorDown20 = "EnemyArmorDown20",
  AdditionalDamageDealt = "AdditionalDamageDealt",
  ReducedMagicDamageTaken20 = "ReducedMagicDamageTaken20",
  ReducedMagicDamageTaken40 = "ReducedMagicDamageTaken40",
  ReducedDamageTaken25 = "ReducedDamageTaken25",
  ReducedDamageTaken20 = "ReducedDamageTaken20",
  ReducedDamageTaken10 = "ReducedDamageTaken10",
  IncreasedMaximumHealth20 = "IncreasedMaximumHealth20",
  IncreasedPhysicalHaste20 = "IncreasedPhysicalHaste20",
  IncreasedDamageDealt15 = "IncreasedDamageDealt15",

  Symbiosis = "Symbiosis"
}

export const WarcraftClassUtilities: {
  [class_name in WarcraftPlayerClass]: WarcraftRaidUtility[];
} = {
  [WarcraftPlayerClass.Deathknight]: [
    WarcraftRaidUtility.CombatResurrection,
    WarcraftRaidUtility.Immunity,
    WarcraftRaidUtility.Slow,
    WarcraftRaidUtility.Root,
    WarcraftRaidUtility.Stun,
    WarcraftRaidUtility.Silence,
    WarcraftRaidUtility.Pull,
    WarcraftRaidUtility.ReducedMagicDamageTaken40
  ],
  [WarcraftPlayerClass.Druid]: [
    WarcraftRaidUtility.CombatResurrection,
    WarcraftRaidUtility.Stun,
    WarcraftRaidUtility.Root,
    WarcraftRaidUtility.RootAoE,
    WarcraftRaidUtility.Knockback,
    WarcraftRaidUtility.Disorient,
    WarcraftRaidUtility.Slow,
    WarcraftRaidUtility.Pull,
    WarcraftRaidUtility.Symbiosis
  ],
  [WarcraftPlayerClass.Hunter]: [
    WarcraftRaidUtility.CombatResurrection,
    WarcraftRaidUtility.RootAoE,
    WarcraftRaidUtility.Stun,
    WarcraftRaidUtility.Incapacitate
  ],
  [WarcraftPlayerClass.Mage]: [
    WarcraftRaidUtility.Bloodlust,
    WarcraftRaidUtility.Incapacitate,
    WarcraftRaidUtility.Root,
    WarcraftRaidUtility.Silence,
    WarcraftRaidUtility.Immunity,
    WarcraftRaidUtility.Slow
  ],
  [WarcraftPlayerClass.Priest]: [
    WarcraftRaidUtility.Root,
    WarcraftRaidUtility.Fear
  ],
  [WarcraftPlayerClass.Paladin]: [
    WarcraftRaidUtility.Stun,
    WarcraftRaidUtility.Incapacitate,
    WarcraftRaidUtility.Fear,
    WarcraftRaidUtility.DamageReduction,
    WarcraftRaidUtility.Slow,
    WarcraftRaidUtility.ReducedMagicDamageTaken20
  ],
  [WarcraftPlayerClass.Rogue]: [
    WarcraftRaidUtility.Slow,
    WarcraftRaidUtility.Interrupt,
    WarcraftRaidUtility.DamageReduction,
    WarcraftRaidUtility.HealingReduction,
    WarcraftRaidUtility.Immunity,
    WarcraftRaidUtility.Stun,
    WarcraftRaidUtility.Root,
    WarcraftRaidUtility.IncreasedDamageTaken,
    WarcraftRaidUtility.ReducedDamageTaken20,
    WarcraftRaidUtility.IncreasedDamageDealt15,
    WarcraftRaidUtility.Taunt
  ],
  [WarcraftPlayerClass.Warlock]: [
    WarcraftRaidUtility.CombatResurrection,
    WarcraftRaidUtility.Slow,
    WarcraftRaidUtility.Horror,
    WarcraftRaidUtility.Stun,
    WarcraftRaidUtility.Taunt,
    WarcraftRaidUtility.Incapacitate,
    WarcraftRaidUtility.Interrupt
  ],
  [WarcraftPlayerClass.Shaman]: [
    WarcraftRaidUtility.Bloodlust,
    WarcraftRaidUtility.Root,
    WarcraftRaidUtility.RootAoE,
    WarcraftRaidUtility.SlowImmunity,
    WarcraftRaidUtility.AdditionalDamageDealt
  ],
  [WarcraftPlayerClass.Warrior]: [
    WarcraftRaidUtility.Root,
    WarcraftRaidUtility.Slow,
    WarcraftRaidUtility.Interrupt,
    WarcraftRaidUtility.Stun,
    WarcraftRaidUtility.Knockback,
    WarcraftRaidUtility.SpellReflect,
    WarcraftRaidUtility.DamageReduction,
    WarcraftRaidUtility.CritDamageUp20,
    WarcraftRaidUtility.EnemyDamageDealtDown10,
    WarcraftRaidUtility.Taunt,
    WarcraftRaidUtility.EnemyArmorDown20,
    WarcraftRaidUtility.IncreasedMaximumHealth20
  ],
  [WarcraftPlayerClass.Monk]: [
    WarcraftRaidUtility.Silence,
    WarcraftRaidUtility.Disarm,
    WarcraftRaidUtility.Stun
  ]
};

export const WarcraftRaceUtilities: {
  [class_name in WarcraftPlayerRace]: WarcraftRaidUtility[];
} = {
  [WarcraftPlayerRace.Human]: [],
  [WarcraftPlayerRace.Dwarf]: [],
  [WarcraftPlayerRace.Gnome]: [],
  [WarcraftPlayerRace.Nightelf]: [],
  [WarcraftPlayerRace.Draenei]: [],
  [WarcraftPlayerRace.Worgen]: [],
  [WarcraftPlayerRace.Orc]: [],
  [WarcraftPlayerRace.Troll]: [],
  [WarcraftPlayerRace.Undead]: [],
  [WarcraftPlayerRace.Tauren]: [],
  [WarcraftPlayerRace.Bloodelf]: [],
  [WarcraftPlayerRace.Goblin]: [],
  [WarcraftPlayerRace.Pandaren]: []
};

export const WarcraftSpecUtilities: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidUtility[];
} = {
  [WarcraftPlayerSpec.DeathknightBlood]: [...WarcraftClassUtilities.Deathknight],
  [WarcraftPlayerSpec.DeathknightFrost]: [...WarcraftClassUtilities.Deathknight],
  [WarcraftPlayerSpec.DeathknightUnholy]: [
    ...WarcraftClassUtilities.Deathknight,
    WarcraftRaidUtility.IncreasedPhysicalHaste20
  ],

  [WarcraftPlayerSpec.DruidBalance]: [...WarcraftClassUtilities.Druid,WarcraftRaidUtility.Immunity,WarcraftRaidUtility.Disarm,WarcraftRaidUtility.Stun],
  [WarcraftPlayerSpec.DruidFeral]: [...WarcraftClassUtilities.Druid,WarcraftRaidUtility.EnemyArmorDown20,WarcraftRaidUtility.Stun,WarcraftRaidUtility.Immunity],
  [WarcraftPlayerSpec.DruidGuardian]: [...WarcraftClassUtilities.Druid,WarcraftRaidUtility.Slow],
  [WarcraftPlayerSpec.DruidRestoration]: [...WarcraftClassUtilities.Druid,WarcraftRaidUtility.Disorient,WarcraftRaidUtility.Immunity],

  [WarcraftPlayerSpec.HunterBeastmastery]: [...WarcraftClassUtilities.Hunter,WarcraftRaidUtility.Bloodlust],
  [WarcraftPlayerSpec.HunterMarksmanship]: [...WarcraftClassUtilities.Hunter],
  [WarcraftPlayerSpec.HunterSurvival]: [...WarcraftClassUtilities.Hunter],

  [WarcraftPlayerSpec.MageArcane]: [...WarcraftClassUtilities.Mage],
  [WarcraftPlayerSpec.MageFire]: [...WarcraftClassUtilities.Mage],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassUtilities.Mage],

  [WarcraftPlayerSpec.PriestDiscipline]: [
    ...WarcraftClassUtilities.Priest,
    WarcraftRaidUtility.ReducedDamageTaken25
  ],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassUtilities.Priest],
  [WarcraftPlayerSpec.PriestShadow]: [...WarcraftClassUtilities.Priest],

  [WarcraftPlayerSpec.PaladinHoly]: [...WarcraftClassUtilities.Paladin,WarcraftRaidUtility.CombatResurrection],
  [WarcraftPlayerSpec.PaladinProtection]: [...WarcraftClassUtilities.Paladin],
  [WarcraftPlayerSpec.PaladinRetribution]: [...WarcraftClassUtilities.Paladin],

  [WarcraftPlayerSpec.RogueAssassination]: [...WarcraftClassUtilities.Rogue],
  [WarcraftPlayerSpec.RogueCombat]: [...WarcraftClassUtilities.Rogue],
  [WarcraftPlayerSpec.RogueSubtlety]: [...WarcraftClassUtilities.Rogue],

  [WarcraftPlayerSpec.WarlockAffliction]: [...WarcraftClassUtilities.Warlock],
  [WarcraftPlayerSpec.WarlockDemonology]: [...WarcraftClassUtilities.Warlock],
  [WarcraftPlayerSpec.WarlockDestruction]: [...WarcraftClassUtilities.Warlock],

  [WarcraftPlayerSpec.ShamanElemental]: [...WarcraftClassUtilities.Shaman,WarcraftRaidUtility.Silence],
  [WarcraftPlayerSpec.ShamanEnhancement]: [...WarcraftClassUtilities.Shaman,WarcraftRaidUtility.Silence],
  [WarcraftPlayerSpec.ShamanRestoration]: [
    ...WarcraftClassUtilities.Shaman,
    WarcraftRaidUtility.ReducedDamageTaken10
  ],

  [WarcraftPlayerSpec.WarriorArms]: [...WarcraftClassUtilities.Warrior],
  [WarcraftPlayerSpec.WarriorFury]: [...WarcraftClassUtilities.Warrior],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassUtilities.Warrior],
  [WarcraftPlayerSpec.MonkBrewmaster]: [...WarcraftClassUtilities.Monk],
  [WarcraftPlayerSpec.MonkWindwalker]: [...WarcraftClassUtilities.Monk],
  [WarcraftPlayerSpec.MonkMistweaver]: [...WarcraftClassUtilities.Monk,WarcraftRaidUtility.Root]
};
