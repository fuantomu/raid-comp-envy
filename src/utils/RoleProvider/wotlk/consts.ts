import { WarcraftPlayerClass, WarcraftPlayerRace, WarcraftPlayerSpec } from "../../../consts";

export enum WarcraftRaidBuff {
  SpellHaste = "SpellHaste",
  Kings = "Kings",
  SpellPower = "SpellPower",
  Haste3 = "Haste3",
  SpellCrit = "SpellCrit",
  AttackPower = "AttackPower",
  MarkOfTheWild = "MarkOfTheWild",
  PhysicalCrit = "PhysicalCrit",
  MP5 = "MP5",
  MeleeHaste20 = "MeleeHaste20",
  MaxHealth = "MaxHealth",
  StrengthAgility = "StrengthAgility",
  AttackPower10 = "AttackPower10",
  IncDamage = "IncDamage",
  Spirit = "Spirit",
  HealingReceived = "HealingReceived",
  Intellect = "Intellect",
  Stamina = "Stamina",
  Replenishment = "Replenishment"
}

export const WarcraftClassRaidBuffs: {
  [class_name in WarcraftPlayerClass]: WarcraftRaidBuff[];
} = {
  [WarcraftPlayerClass.Deathknight]: [WarcraftRaidBuff.StrengthAgility],
  [WarcraftPlayerClass.Druid]: [WarcraftRaidBuff.MarkOfTheWild],
  [WarcraftPlayerClass.Hunter]: [],
  [WarcraftPlayerClass.Mage]: [WarcraftRaidBuff.Intellect],
  [WarcraftPlayerClass.Priest]: [WarcraftRaidBuff.Spirit, WarcraftRaidBuff.Stamina],
  [WarcraftPlayerClass.Paladin]: [
    WarcraftRaidBuff.Kings,
    WarcraftRaidBuff.AttackPower,
    WarcraftRaidBuff.MP5
  ],
  [WarcraftPlayerClass.Rogue]: [],
  [WarcraftPlayerClass.Warlock]: [],
  [WarcraftPlayerClass.Shaman]: [
    WarcraftRaidBuff.StrengthAgility,
    WarcraftRaidBuff.MP5,
    WarcraftRaidBuff.MeleeHaste20,
    WarcraftRaidBuff.SpellHaste,
    WarcraftRaidBuff.SpellPower
  ],
  [WarcraftPlayerClass.Warrior]: [WarcraftRaidBuff.AttackPower, WarcraftRaidBuff.MaxHealth]
};

export const WarcraftSpecRaidBuffs: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidBuff[];
} = {
  [WarcraftPlayerSpec.DeathknightBlood]: [
    ...WarcraftClassRaidBuffs.Deathknight,
    WarcraftRaidBuff.AttackPower10,
    WarcraftRaidBuff.MeleeHaste20
  ],
  [WarcraftPlayerSpec.DeathknightFrost]: [
    ...WarcraftClassRaidBuffs.Deathknight,
    WarcraftRaidBuff.MeleeHaste20
  ],
  [WarcraftPlayerSpec.DeathknightUnholy]: [...WarcraftClassRaidBuffs.Deathknight],
  [WarcraftPlayerSpec.DruidBalance]: [
    ...WarcraftClassRaidBuffs.Druid,
    WarcraftRaidBuff.Haste3,
    WarcraftRaidBuff.SpellCrit
  ],
  [WarcraftPlayerSpec.DruidFeral]: [...WarcraftClassRaidBuffs.Druid, WarcraftRaidBuff.PhysicalCrit],
  [WarcraftPlayerSpec.DruidGuardian]: [
    ...WarcraftClassRaidBuffs.Druid,
    WarcraftRaidBuff.PhysicalCrit
  ],
  [WarcraftPlayerSpec.DruidRestoration]: [
    ...WarcraftClassRaidBuffs.Druid,
    WarcraftRaidBuff.HealingReceived
  ],
  [WarcraftPlayerSpec.HunterBeastmastery]: [
    ...WarcraftClassRaidBuffs.Hunter,
    WarcraftRaidBuff.IncDamage
  ],
  [WarcraftPlayerSpec.HunterMarksmanship]: [
    ...WarcraftClassRaidBuffs.Hunter,
    WarcraftRaidBuff.AttackPower10
  ],
  [WarcraftPlayerSpec.HunterSurvival]: [
    ...WarcraftClassRaidBuffs.Hunter,
    WarcraftRaidBuff.Replenishment
  ],
  [WarcraftPlayerSpec.MageArcane]: [...WarcraftClassRaidBuffs.Mage, WarcraftRaidBuff.IncDamage],
  [WarcraftPlayerSpec.MageFire]: [...WarcraftClassRaidBuffs.Mage],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassRaidBuffs.Mage, WarcraftRaidBuff.Replenishment],
  [WarcraftPlayerSpec.PriestDiscipline]: [...WarcraftClassRaidBuffs.Priest],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassRaidBuffs.Priest],
  [WarcraftPlayerSpec.PriestShadow]: [
    ...WarcraftClassRaidBuffs.Priest,
    WarcraftRaidBuff.Replenishment
  ],
  [WarcraftPlayerSpec.PaladinHoly]: [
    ...WarcraftClassRaidBuffs.Paladin,
    WarcraftRaidBuff.HealingReceived
  ],
  [WarcraftPlayerSpec.PaladinProtection]: [...WarcraftClassRaidBuffs.Paladin],
  [WarcraftPlayerSpec.PaladinRetribution]: [
    ...WarcraftClassRaidBuffs.Paladin,
    WarcraftRaidBuff.IncDamage,
    WarcraftRaidBuff.Haste3,
    WarcraftRaidBuff.Replenishment
  ],
  [WarcraftPlayerSpec.RogueAssassination]: [...WarcraftClassRaidBuffs.Rogue],
  [WarcraftPlayerSpec.RogueCombat]: [...WarcraftClassRaidBuffs.Rogue],
  [WarcraftPlayerSpec.RogueSubtlety]: [...WarcraftClassRaidBuffs.Rogue],
  [WarcraftPlayerSpec.WarlockAffliction]: [
    ...WarcraftClassRaidBuffs.Warlock,
    WarcraftRaidBuff.Intellect,
    WarcraftRaidBuff.Spirit
  ],
  [WarcraftPlayerSpec.WarlockDemonology]: [
    ...WarcraftClassRaidBuffs.Warlock,
    WarcraftRaidBuff.SpellPower
  ],
  [WarcraftPlayerSpec.WarlockDestruction]: [
    ...WarcraftClassRaidBuffs.Warlock,
    WarcraftRaidBuff.MaxHealth,
    WarcraftRaidBuff.Replenishment
  ],
  [WarcraftPlayerSpec.ShamanElemental]: [
    ...WarcraftClassRaidBuffs.Shaman,
    WarcraftRaidBuff.SpellCrit
  ],
  [WarcraftPlayerSpec.ShamanEnhancement]: [
    ...WarcraftClassRaidBuffs.Shaman,
    WarcraftRaidBuff.AttackPower10
  ],
  [WarcraftPlayerSpec.ShamanRestoration]: [...WarcraftClassRaidBuffs.Shaman],
  [WarcraftPlayerSpec.WarriorArms]: [...WarcraftClassRaidBuffs.Warrior],
  [WarcraftPlayerSpec.WarriorFury]: [
    ...WarcraftClassRaidBuffs.Warrior,
    WarcraftRaidBuff.PhysicalCrit
  ],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassRaidBuffs.Warrior]
};

export enum WarcraftRaidDebuff {
  ArmorDown5 = "ArmorDown5",
  ArmorDown20 = "ArmorDown20",
  BleedDamageReceived = "BleedDamageReceived",
  SpellCritReceived = "SpellCritReceived",
  CritChanceReceived = "CritChanceReceived",
  MeleeHaste = "MeleeHaste",
  CastSpeed30 = "CastSpeed30",
  PhysicalDamageReceived = "PhysicalDamageReceived",
  SpellDamageReceived13 = "SpellDamageReceived13",
  HealingReceived = "HealingReceived",
  AttackPowerDown = "AttackPowerDown",
  PhysicalHitDown = "PhysicalHitDown",
  SpellHit = "SpellHit"
}

export const WarcraftClassRaidDebuffs: {
  [class_name in WarcraftPlayerClass]: WarcraftRaidDebuff[];
} = {
  [WarcraftPlayerClass.Deathknight]: [WarcraftRaidDebuff.MeleeHaste],
  [WarcraftPlayerClass.Druid]: [WarcraftRaidDebuff.ArmorDown5],
  [WarcraftPlayerClass.Hunter]: [
    WarcraftRaidDebuff.ArmorDown5,
    WarcraftRaidDebuff.PhysicalHitDown,
    WarcraftRaidDebuff.HealingReceived
  ],
  [WarcraftPlayerClass.Mage]: [],
  [WarcraftPlayerClass.Priest]: [],
  [WarcraftPlayerClass.Paladin]: [],
  [WarcraftPlayerClass.Rogue]: [
    WarcraftRaidDebuff.ArmorDown20,
    WarcraftRaidDebuff.CastSpeed30,
    WarcraftRaidDebuff.HealingReceived
  ],
  [WarcraftPlayerClass.Warlock]: [
    WarcraftRaidDebuff.ArmorDown5,
    WarcraftRaidDebuff.AttackPowerDown,
    WarcraftRaidDebuff.CastSpeed30,
    WarcraftRaidDebuff.SpellDamageReceived13
  ],
  [WarcraftPlayerClass.Shaman]: [],
  [WarcraftPlayerClass.Warrior]: [
    WarcraftRaidDebuff.ArmorDown20,
    WarcraftRaidDebuff.AttackPowerDown,
    WarcraftRaidDebuff.MeleeHaste
  ]
};

export const WarcraftSpecRaidDebuffs: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidDebuff[];
} = {
  [WarcraftPlayerSpec.DeathknightBlood]: [...WarcraftClassRaidDebuffs.Deathknight],
  [WarcraftPlayerSpec.DeathknightFrost]: [...WarcraftClassRaidDebuffs.Deathknight],
  [WarcraftPlayerSpec.DeathknightUnholy]: [
    ...WarcraftClassRaidDebuffs.Deathknight,
    WarcraftRaidDebuff.SpellDamageReceived13
  ],
  [WarcraftPlayerSpec.DruidBalance]: [
    ...WarcraftClassRaidDebuffs.Druid,
    WarcraftRaidDebuff.PhysicalHitDown,
    WarcraftRaidDebuff.SpellDamageReceived13,
    WarcraftRaidDebuff.SpellHit
  ],
  [WarcraftPlayerSpec.DruidFeral]: [
    ...WarcraftClassRaidDebuffs.Druid,
    WarcraftRaidDebuff.AttackPowerDown,
    WarcraftRaidDebuff.MeleeHaste,
    WarcraftRaidDebuff.BleedDamageReceived
  ],
  [WarcraftPlayerSpec.DruidGuardian]: [
    ...WarcraftClassRaidDebuffs.Druid,
    WarcraftRaidDebuff.AttackPowerDown,
    WarcraftRaidDebuff.BleedDamageReceived
  ],
  [WarcraftPlayerSpec.DruidRestoration]: [...WarcraftClassRaidDebuffs.Druid],
  [WarcraftPlayerSpec.HunterBeastmastery]: [
    ...WarcraftClassRaidDebuffs.Hunter,
    WarcraftRaidDebuff.ArmorDown20,
    WarcraftRaidDebuff.BleedDamageReceived,
    WarcraftRaidDebuff.CastSpeed30
  ],
  [WarcraftPlayerSpec.HunterMarksmanship]: [...WarcraftClassRaidDebuffs.Hunter],
  [WarcraftPlayerSpec.HunterSurvival]: [...WarcraftClassRaidDebuffs.Hunter],
  [WarcraftPlayerSpec.MageArcane]: [
    ...WarcraftClassRaidDebuffs.Mage,
    WarcraftRaidDebuff.CastSpeed30
  ],
  [WarcraftPlayerSpec.MageFire]: [
    ...WarcraftClassRaidDebuffs.Mage,
    WarcraftRaidDebuff.SpellCritReceived
  ],
  [WarcraftPlayerSpec.MageFrost]: [
    ...WarcraftClassRaidDebuffs.Mage,
    WarcraftRaidDebuff.SpellCritReceived
  ],
  [WarcraftPlayerSpec.PriestDiscipline]: [...WarcraftClassRaidDebuffs.Priest],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassRaidDebuffs.Priest],
  [WarcraftPlayerSpec.PriestShadow]: [
    ...WarcraftClassRaidDebuffs.Priest,
    WarcraftRaidDebuff.SpellHit
  ],
  [WarcraftPlayerSpec.PaladinHoly]: [...WarcraftClassRaidDebuffs.Paladin],
  [WarcraftPlayerSpec.PaladinProtection]: [
    ...WarcraftClassRaidDebuffs.Paladin,
    WarcraftRaidDebuff.AttackPowerDown,
    WarcraftRaidDebuff.MeleeHaste
  ],
  [WarcraftPlayerSpec.PaladinRetribution]: [
    ...WarcraftClassRaidDebuffs.Paladin,
    WarcraftRaidDebuff.AttackPowerDown,
    WarcraftRaidDebuff.CritChanceReceived
  ],
  [WarcraftPlayerSpec.RogueAssassination]: [
    ...WarcraftClassRaidDebuffs.Rogue,
    WarcraftRaidDebuff.CritChanceReceived
  ],
  [WarcraftPlayerSpec.RogueCombat]: [
    ...WarcraftClassRaidDebuffs.Rogue,
    WarcraftRaidDebuff.PhysicalDamageReceived
  ],
  [WarcraftPlayerSpec.RogueSubtlety]: [...WarcraftClassRaidDebuffs.Rogue],
  [WarcraftPlayerSpec.WarlockAffliction]: [
    ...WarcraftClassRaidDebuffs.Warlock,
    WarcraftRaidDebuff.SpellCritReceived
  ],
  [WarcraftPlayerSpec.WarlockDemonology]: [
    ...WarcraftClassRaidDebuffs.Warlock,
    WarcraftRaidDebuff.SpellCritReceived
  ],
  [WarcraftPlayerSpec.WarlockDestruction]: [...WarcraftClassRaidDebuffs.Warlock],
  [WarcraftPlayerSpec.ShamanElemental]: [
    ...WarcraftClassRaidDebuffs.Shaman,
    WarcraftRaidDebuff.CritChanceReceived
  ],
  [WarcraftPlayerSpec.ShamanEnhancement]: [...WarcraftClassRaidDebuffs.Shaman],
  [WarcraftPlayerSpec.ShamanRestoration]: [...WarcraftClassRaidDebuffs.Shaman],
  [WarcraftPlayerSpec.WarriorArms]: [
    ...WarcraftClassRaidDebuffs.Warrior,
    WarcraftRaidDebuff.BleedDamageReceived,
    WarcraftRaidDebuff.HealingReceived,
    WarcraftRaidDebuff.PhysicalDamageReceived
  ],
  [WarcraftPlayerSpec.WarriorFury]: [...WarcraftClassRaidDebuffs.Warrior],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassRaidDebuffs.Warrior]
};

export enum WarcraftRaidUtility {
  Bloodlust = "Bloodlust",
  CombatResurrection = "CombatResurrection",
  Healthstone = "Healthstone",
  Innervate = "Innervate",
  BlessingOfProtection = "BlessingOfProtection",
  ManaTide = "ManaTide",
  DraeneiHit = "DraeneiHit",
  TricksOfTheTrade = "TricksOfTheTrade",
  PowerInfusion = "PowerInfusion",
  UnholyFrenzy = "UnholyFrenzy",
  FocusMagic = "FocusMagic",
  DivineGuardian = "DivineGuardian",
  DamageReduction10 = "DamageReduction10",
  DamageReduction3 = "DamageReduction3"
}

export const WarcraftClassUtilities: {
  [class_name in WarcraftPlayerClass]: WarcraftRaidUtility[];
} = {
  [WarcraftPlayerClass.Deathknight]: [],
  [WarcraftPlayerClass.Druid]: [WarcraftRaidUtility.CombatResurrection],
  [WarcraftPlayerClass.Hunter]: [],
  [WarcraftPlayerClass.Mage]: [WarcraftRaidUtility.FocusMagic],
  [WarcraftPlayerClass.Priest]: [],
  [WarcraftPlayerClass.Paladin]: [WarcraftRaidUtility.BlessingOfProtection],
  [WarcraftPlayerClass.Rogue]: [WarcraftRaidUtility.TricksOfTheTrade],
  [WarcraftPlayerClass.Warlock]: [
    WarcraftRaidUtility.CombatResurrection,
    WarcraftRaidUtility.Healthstone
  ],
  [WarcraftPlayerClass.Shaman]: [WarcraftRaidUtility.Bloodlust],
  [WarcraftPlayerClass.Warrior]: []
};

export const WarcraftRaceUtilities: {
  [class_name in WarcraftPlayerRace]: WarcraftRaidUtility[];
} = {
  [WarcraftPlayerRace.Human]: [],
  [WarcraftPlayerRace.Dwarf]: [],
  [WarcraftPlayerRace.Gnome]: [],
  [WarcraftPlayerRace.Nightelf]: [],
  [WarcraftPlayerRace.Draenei]: [WarcraftRaidUtility.DraeneiHit],
  [WarcraftPlayerRace.Worgen]: [],
  [WarcraftPlayerRace.Orc]: [],
  [WarcraftPlayerRace.Troll]: [],
  [WarcraftPlayerRace.Undead]: [],
  [WarcraftPlayerRace.Tauren]: [],
  [WarcraftPlayerRace.Bloodelf]: [],
  [WarcraftPlayerRace.Goblin]: []
};

export const WarcraftSpecUtilities: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidUtility[];
} = {
  [WarcraftPlayerSpec.DeathknightBlood]: [
    ...WarcraftClassUtilities.Deathknight,
    WarcraftRaidUtility.UnholyFrenzy
  ],
  [WarcraftPlayerSpec.DeathknightFrost]: [...WarcraftClassUtilities.Deathknight],
  [WarcraftPlayerSpec.DeathknightUnholy]: [...WarcraftClassUtilities.Deathknight],

  [WarcraftPlayerSpec.DruidBalance]: [
    ...WarcraftClassUtilities.Druid,
    WarcraftRaidUtility.Innervate
  ],
  [WarcraftPlayerSpec.DruidFeral]: [...WarcraftClassUtilities.Druid, WarcraftRaidUtility.Innervate],
  [WarcraftPlayerSpec.DruidGuardian]: [
    ...WarcraftClassUtilities.Druid,
    WarcraftRaidUtility.Innervate
  ],
  [WarcraftPlayerSpec.DruidRestoration]: [
    ...WarcraftClassUtilities.Druid,
    WarcraftRaidUtility.Innervate
  ],

  [WarcraftPlayerSpec.HunterBeastmastery]: [...WarcraftClassUtilities.Hunter],
  [WarcraftPlayerSpec.HunterMarksmanship]: [...WarcraftClassUtilities.Hunter],
  [WarcraftPlayerSpec.HunterSurvival]: [...WarcraftClassUtilities.Hunter],

  [WarcraftPlayerSpec.MageArcane]: [...WarcraftClassUtilities.Mage],
  [WarcraftPlayerSpec.MageFire]: [...WarcraftClassUtilities.Mage],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassUtilities.Mage],

  [WarcraftPlayerSpec.PriestDiscipline]: [
    ...WarcraftClassUtilities.Priest,
    WarcraftRaidUtility.PowerInfusion,
    WarcraftRaidUtility.DamageReduction10
  ],
  [WarcraftPlayerSpec.PriestHoly]: [
    ...WarcraftClassUtilities.Priest,
    WarcraftRaidUtility.DamageReduction3,
    WarcraftRaidUtility.DamageReduction10
  ],
  [WarcraftPlayerSpec.PriestShadow]: [...WarcraftClassUtilities.Priest],

  [WarcraftPlayerSpec.PaladinHoly]: [
    ...WarcraftClassUtilities.Paladin,
    WarcraftRaidUtility.DivineGuardian
  ],
  [WarcraftPlayerSpec.PaladinProtection]: [
    ...WarcraftClassUtilities.Paladin,
    WarcraftRaidUtility.DivineGuardian,
    WarcraftRaidUtility.DamageReduction3
  ],
  [WarcraftPlayerSpec.PaladinRetribution]: [...WarcraftClassUtilities.Paladin],

  [WarcraftPlayerSpec.RogueAssassination]: [...WarcraftClassUtilities.Rogue],
  [WarcraftPlayerSpec.RogueCombat]: [...WarcraftClassUtilities.Rogue],
  [WarcraftPlayerSpec.RogueSubtlety]: [...WarcraftClassUtilities.Rogue],

  [WarcraftPlayerSpec.WarlockAffliction]: [...WarcraftClassUtilities.Warlock],
  [WarcraftPlayerSpec.WarlockDemonology]: [...WarcraftClassUtilities.Warlock],
  [WarcraftPlayerSpec.WarlockDestruction]: [...WarcraftClassUtilities.Warlock],

  [WarcraftPlayerSpec.ShamanElemental]: [...WarcraftClassUtilities.Shaman],
  [WarcraftPlayerSpec.ShamanEnhancement]: [...WarcraftClassUtilities.Shaman],
  [WarcraftPlayerSpec.ShamanRestoration]: [
    ...WarcraftClassUtilities.Shaman,
    WarcraftRaidUtility.ManaTide,
    WarcraftRaidUtility.DamageReduction10
  ],

  [WarcraftPlayerSpec.WarriorArms]: [...WarcraftClassUtilities.Warrior],
  [WarcraftPlayerSpec.WarriorFury]: [...WarcraftClassUtilities.Warrior],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassUtilities.Warrior]
};

export const WarcraftPlayerClassSpecs: {
  [class_name in WarcraftPlayerClass]: WarcraftPlayerSpec[];
} = {
  [WarcraftPlayerClass.Deathknight]: [
    WarcraftPlayerSpec.DeathknightBlood,
    WarcraftPlayerSpec.DeathknightFrost,
    WarcraftPlayerSpec.DeathknightUnholy
  ],
  [WarcraftPlayerClass.Druid]: [
    WarcraftPlayerSpec.DruidBalance,
    WarcraftPlayerSpec.DruidFeral,
    WarcraftPlayerSpec.DruidGuardian,
    WarcraftPlayerSpec.DruidRestoration
  ],
  [WarcraftPlayerClass.Hunter]: [
    WarcraftPlayerSpec.HunterBeastmastery,
    WarcraftPlayerSpec.HunterMarksmanship,
    WarcraftPlayerSpec.HunterSurvival
  ],
  [WarcraftPlayerClass.Mage]: [
    WarcraftPlayerSpec.MageArcane,
    WarcraftPlayerSpec.MageFire,
    WarcraftPlayerSpec.MageFrost
  ],
  [WarcraftPlayerClass.Priest]: [
    WarcraftPlayerSpec.PriestDiscipline,
    WarcraftPlayerSpec.PriestHoly,
    WarcraftPlayerSpec.PriestShadow
  ],
  [WarcraftPlayerClass.Paladin]: [
    WarcraftPlayerSpec.PaladinHoly,
    WarcraftPlayerSpec.PaladinProtection,
    WarcraftPlayerSpec.PaladinRetribution
  ],
  [WarcraftPlayerClass.Rogue]: [
    WarcraftPlayerSpec.RogueAssassination,
    WarcraftPlayerSpec.RogueCombat,
    WarcraftPlayerSpec.RogueSubtlety
  ],
  [WarcraftPlayerClass.Warlock]: [
    WarcraftPlayerSpec.WarlockAffliction,
    WarcraftPlayerSpec.WarlockDemonology,
    WarcraftPlayerSpec.WarlockDestruction
  ],
  [WarcraftPlayerClass.Shaman]: [
    WarcraftPlayerSpec.ShamanElemental,
    WarcraftPlayerSpec.ShamanEnhancement,
    WarcraftPlayerSpec.ShamanRestoration
  ],
  [WarcraftPlayerClass.Warrior]: [
    WarcraftPlayerSpec.WarriorArms,
    WarcraftPlayerSpec.WarriorFury,
    WarcraftPlayerSpec.WarriorProtection
  ]
};
