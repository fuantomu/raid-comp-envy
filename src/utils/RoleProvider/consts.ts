import { WarcraftPlayerClass, WarcraftPlayerRace, WarcraftPlayerSpec } from "../../consts";

export enum WarcraftRole {
  Unknown = "Unknown",
  Tank = "Tank",
  Healer = "Healer",
  RangedDPS = "RangedDPS",
  MeleeDPS = "MeleeDPS"
}

export const WarcraftClassVersion = {
  Mop: ["Warrior","Mage","Druid","Monk","Hunter","Rogue","Paladin","Priest","Deathknight","Warlock","Shaman"],
  Cataclysm: ["Warrior","Mage","Druid","Hunter","Rogue","Paladin","Priest","Deathknight","Warlock","Shaman"],
  Wotlk: ["Warrior","Mage","Druid","Hunter","Rogue","Paladin","Priest","Deathknight","Warlock","Shaman"]
}

export const WarcraftRaceVersion = {
  Mop: ["Human", "Nightelf", "Dwarf", "Gnome", "Draenei", "Orc", "Troll", "Tauren", "Undead", "Bloodelf", "Goblin", "Worgen", "Pandaren"],
  Cataclysm: ["Human", "Nightelf", "Dwarf", "Gnome", "Draenei", "Orc", "Troll", "Tauren", "Undead", "Bloodelf", "Goblin", "Worgen"],
  Wotlk: ["Human", "Nightelf", "Dwarf", "Gnome", "Draenei", "Orc", "Troll", "Tauren", "Undead", "Bloodelf"]
}

export const WarcraftSpecRole: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRole;
} = {
  [WarcraftPlayerSpec.DeathknightBlood]: WarcraftRole.Tank,
  [WarcraftPlayerSpec.DeathknightFrost]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.DeathknightUnholy]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.DruidBalance]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.DruidFeral]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.DruidGuardian]: WarcraftRole.Tank,
  [WarcraftPlayerSpec.DruidRestoration]: WarcraftRole.Healer,
  [WarcraftPlayerSpec.HunterBeastmastery]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.HunterMarksmanship]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.HunterSurvival]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.MageArcane]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.MageFire]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.MageFrost]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.PriestDiscipline]: WarcraftRole.Healer,
  [WarcraftPlayerSpec.PriestHoly]: WarcraftRole.Healer,
  [WarcraftPlayerSpec.PriestShadow]: WarcraftRole.RangedDPS,
  [WarcraftPlayerSpec.PaladinHoly]: WarcraftRole.Healer,
  [WarcraftPlayerSpec.PaladinProtection]: WarcraftRole.Tank,
  [WarcraftPlayerSpec.PaladinRetribution]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.RogueAssassination]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.RogueCombat]: WarcraftRole.MeleeDPS,
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
  [WarcraftPlayerSpec.MonkBrewmaster]: WarcraftRole.Tank,
  [WarcraftPlayerSpec.MonkWindwalker]: WarcraftRole.MeleeDPS,
  [WarcraftPlayerSpec.MonkMistweaver]: WarcraftRole.Healer
};

export enum WarcraftRaidBuff {
  MeleeHasteUp10 = "MeleeHasteUp10",
  MeleeHaste20 = "MeleeHaste20",
  Crit = "Crit",
  AttackPower = "AttackPower",
  SpellHaste = "SpellHaste",
  SpellPower10 = "SpellPower10",
  SpellPower6 = "SpellPower6",
  IncDamage = "IncDamage",
  AllStats = "AllStats",
  StrengthAgility = "StrengthAgility",
  Stamina = "Stamina",
  MaxMana = "MaxMana",
  Armor = "Armor",
  MP5 = "MP5",
  Replenishment = "Replenishment",
  Kings = "Kings",
  SpellPower = "SpellPower",
  Haste3 = "Haste3",
  SpellCrit = "SpellCrit",
  MarkOfTheWild = "MarkOfTheWild",
  PhysicalCrit = "PhysicalCrit",
  MaxHealth = "MaxHealth",
  AttackPower20 = "AttackPower20",
  AttackPower10 = "AttackPower10",
  Spirit = "Spirit",
  HealingReceived6 = "HealingReceived6",
  Intellect = "Intellect",
  AttackSpeed10 = "AttackSpeed10",
  SpellHaste5 = "SpellHaste5",
  CritChance5 = "CritChance5",
  MasteryRating3000 = "MasteryRating3000",
  AllStats5 = "AllStats5",
  Stamina10 = "Stamina10"
}

export const WarcraftClassRaidBuffs: {
  [class_name in WarcraftPlayerClass]: WarcraftRaidBuff[];
} = {
  [WarcraftPlayerClass.Deathknight]: [WarcraftRaidBuff.StrengthAgility],
  [WarcraftPlayerClass.Druid]: [WarcraftRaidBuff.AllStats],
  [WarcraftPlayerClass.Hunter]: [],
  [WarcraftPlayerClass.Mage]: [WarcraftRaidBuff.SpellPower6, WarcraftRaidBuff.MaxMana],
  [WarcraftPlayerClass.Priest]: [WarcraftRaidBuff.Stamina],
  [WarcraftPlayerClass.Paladin]: [
    WarcraftRaidBuff.AttackPower,
    WarcraftRaidBuff.AllStats,
    WarcraftRaidBuff.Armor,
    WarcraftRaidBuff.MP5
  ],
  [WarcraftPlayerClass.Rogue]: [],
  [WarcraftPlayerClass.Warlock]: [],
  [WarcraftPlayerClass.Shaman]: [
    WarcraftRaidBuff.MeleeHasteUp10,
    WarcraftRaidBuff.SpellHaste,
    WarcraftRaidBuff.SpellPower6,
    WarcraftRaidBuff.StrengthAgility,
    WarcraftRaidBuff.Armor,
    WarcraftRaidBuff.MP5
  ],
  [WarcraftPlayerClass.Warrior]: [WarcraftRaidBuff.StrengthAgility, WarcraftRaidBuff.Stamina],
  [WarcraftPlayerClass.Monk]: []
};

export const WarcraftSpecRaidBuffs: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidBuff[];
} = {
  [WarcraftPlayerSpec.DeathknightBlood]: [
    ...WarcraftClassRaidBuffs.Deathknight,
    WarcraftRaidBuff.AttackPower
  ],
  [WarcraftPlayerSpec.DeathknightFrost]: [
    ...WarcraftClassRaidBuffs.Deathknight,
    WarcraftRaidBuff.MeleeHasteUp10
  ],
  [WarcraftPlayerSpec.DeathknightUnholy]: [...WarcraftClassRaidBuffs.Deathknight],
  [WarcraftPlayerSpec.DruidBalance]: [...WarcraftClassRaidBuffs.Druid, WarcraftRaidBuff.SpellHaste],
  [WarcraftPlayerSpec.DruidFeral]: [...WarcraftClassRaidBuffs.Druid, WarcraftRaidBuff.Crit],
  [WarcraftPlayerSpec.DruidGuardian]: [...WarcraftClassRaidBuffs.Druid],
  [WarcraftPlayerSpec.DruidRestoration]: [
    ...WarcraftClassRaidBuffs.Druid,
    WarcraftRaidBuff.Replenishment
  ],
  [WarcraftPlayerSpec.HunterBeastmastery]: [
    ...WarcraftClassRaidBuffs.Hunter,
    WarcraftRaidBuff.IncDamage
  ],
  [WarcraftPlayerSpec.HunterMarksmanship]: [
    ...WarcraftClassRaidBuffs.Hunter,
    WarcraftRaidBuff.AttackPower
  ],
  [WarcraftPlayerSpec.HunterSurvival]: [
    ...WarcraftClassRaidBuffs.Hunter,
    WarcraftRaidBuff.MeleeHasteUp10
  ],
  [WarcraftPlayerSpec.MageArcane]: [...WarcraftClassRaidBuffs.Mage, WarcraftRaidBuff.IncDamage],
  [WarcraftPlayerSpec.MageFire]: [...WarcraftClassRaidBuffs.Mage],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassRaidBuffs.Mage, WarcraftRaidBuff.Replenishment],
  [WarcraftPlayerSpec.PriestDiscipline]: [...WarcraftClassRaidBuffs.Priest],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassRaidBuffs.Priest],
  [WarcraftPlayerSpec.PriestShadow]: [
    ...WarcraftClassRaidBuffs.Priest,
    WarcraftRaidBuff.SpellHaste,
    WarcraftRaidBuff.Replenishment
  ],
  [WarcraftPlayerSpec.PaladinHoly]: [...WarcraftClassRaidBuffs.Paladin],
  [WarcraftPlayerSpec.PaladinProtection]: [...WarcraftClassRaidBuffs.Paladin],
  [WarcraftPlayerSpec.PaladinRetribution]: [
    ...WarcraftClassRaidBuffs.Paladin,
    WarcraftRaidBuff.IncDamage,
    WarcraftRaidBuff.Replenishment
  ],
  [WarcraftPlayerSpec.RogueAssassination]: [...WarcraftClassRaidBuffs.Rogue],
  [WarcraftPlayerSpec.RogueCombat]: [...WarcraftClassRaidBuffs.Rogue],
  [WarcraftPlayerSpec.RogueSubtlety]: [...WarcraftClassRaidBuffs.Rogue, WarcraftRaidBuff.Crit],
  [WarcraftPlayerSpec.WarlockAffliction]: [
    ...WarcraftClassRaidBuffs.Warlock,
    WarcraftRaidBuff.MaxMana,
    WarcraftRaidBuff.MP5
  ],
  [WarcraftPlayerSpec.WarlockDemonology]: [
    ...WarcraftClassRaidBuffs.Warlock,
    WarcraftRaidBuff.SpellPower10
  ],
  [WarcraftPlayerSpec.WarlockDestruction]: [
    ...WarcraftClassRaidBuffs.Warlock,
    WarcraftRaidBuff.Stamina,
    WarcraftRaidBuff.Replenishment
  ],
  [WarcraftPlayerSpec.ShamanElemental]: [
    ...WarcraftClassRaidBuffs.Shaman,
    WarcraftRaidBuff.Crit,
    WarcraftRaidBuff.SpellPower10
  ],
  [WarcraftPlayerSpec.ShamanEnhancement]: [
    ...WarcraftClassRaidBuffs.Shaman,
    WarcraftRaidBuff.AttackPower
  ],
  [WarcraftPlayerSpec.ShamanRestoration]: [...WarcraftClassRaidBuffs.Shaman],
  [WarcraftPlayerSpec.WarriorArms]: [...WarcraftClassRaidBuffs.Warrior],
  [WarcraftPlayerSpec.WarriorFury]: [...WarcraftClassRaidBuffs.Warrior, WarcraftRaidBuff.Crit],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassRaidBuffs.Warrior],
  [WarcraftPlayerSpec.MonkBrewmaster]: [],
  [WarcraftPlayerSpec.MonkWindwalker]: [],
  [WarcraftPlayerSpec.MonkMistweaver]: []
};

export enum WarcraftRaidDebuff {
  ArmorDown = "ArmorDown",
  BleedDamageReceived = "BleedDamageReceived",
  SpellCritReceived = "SpellCritReceived",
  MeleeHasteDown20 = "MeleeHasteDown20",
  SpellDamageReceived = "SpellDamageReceived",
  SpellDamageReceived13 = "SpellDamageReceived13",
  PhysicalDamageReceived = "PhysicalDamageReceived",
  HealingReceivedDown50 = "HealingReceivedDown50",
  HealingReceivedDown25 = "HealingReceivedDown25",
  PhysicalDamageDealt = "PhysicalDamageDealt",
  CastSpeed = "CastSpeed",
  CastSpeed30 = "CastSpeed30",
  AttackPowerDown = "AttackPowerDown",
  ArmorDown5 = "ArmorDown5",
  ArmorDown20 = "ArmorDown20",
  CritChanceReceived = "CritChanceReceived",
  PhysicalHitDown = "PhysicalHitDown",
  SpellHit = "SpellHit",
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
  [WarcraftPlayerClass.Deathknight]: [WarcraftRaidDebuff.MeleeHasteDown20, WarcraftRaidDebuff.CastSpeed],
  [WarcraftPlayerClass.Druid]: [WarcraftRaidDebuff.ArmorDown],
  [WarcraftPlayerClass.Hunter]: [WarcraftRaidDebuff.HealingReceivedDown50],
  [WarcraftPlayerClass.Mage]: [],
  [WarcraftPlayerClass.Priest]: [],
  [WarcraftPlayerClass.Paladin]: [],
  [WarcraftPlayerClass.Rogue]: [
    WarcraftRaidDebuff.ArmorDown,
    WarcraftRaidDebuff.HealingReceivedDown50,
    WarcraftRaidDebuff.CastSpeed
  ],
  [WarcraftPlayerClass.Warlock]: [
    WarcraftRaidDebuff.SpellDamageReceived,
    WarcraftRaidDebuff.PhysicalDamageDealt,
    WarcraftRaidDebuff.CastSpeed
  ],
  [WarcraftPlayerClass.Shaman]: [WarcraftRaidDebuff.MeleeHasteDown20],
  [WarcraftPlayerClass.Warrior]: [
    WarcraftRaidDebuff.ArmorDown,
    WarcraftRaidDebuff.PhysicalDamageDealt
  ],
  [WarcraftPlayerClass.Monk]: []
};

export const WarcraftSpecRaidDebuffs: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidDebuff[];
} = {
  [WarcraftPlayerSpec.DeathknightBlood]: [
    ...WarcraftClassRaidDebuffs.Deathknight,
    WarcraftRaidDebuff.PhysicalDamageDealt
  ],
  [WarcraftPlayerSpec.DeathknightFrost]: [
    ...WarcraftClassRaidDebuffs.Deathknight,
    WarcraftRaidDebuff.PhysicalDamageReceived
  ],
  [WarcraftPlayerSpec.DeathknightUnholy]: [
    ...WarcraftClassRaidDebuffs.Deathknight,
    WarcraftRaidDebuff.SpellDamageReceived
  ],
  [WarcraftPlayerSpec.DruidBalance]: [
    ...WarcraftClassRaidDebuffs.Druid,
    WarcraftRaidDebuff.SpellDamageReceived
  ],
  [WarcraftPlayerSpec.DruidFeral]: [
    ...WarcraftClassRaidDebuffs.Druid,
    WarcraftRaidDebuff.BleedDamageReceived,
    WarcraftRaidDebuff.MeleeHasteDown20,
    WarcraftRaidDebuff.PhysicalDamageDealt
  ],
  [WarcraftPlayerSpec.DruidGuardian]: [...WarcraftClassRaidDebuffs.Druid],
  [WarcraftPlayerSpec.DruidRestoration]: [...WarcraftClassRaidDebuffs.Druid],
  [WarcraftPlayerSpec.HunterBeastmastery]: [...WarcraftClassRaidDebuffs.Hunter],
  [WarcraftPlayerSpec.HunterMarksmanship]: [...WarcraftClassRaidDebuffs.Hunter],
  [WarcraftPlayerSpec.HunterSurvival]: [...WarcraftClassRaidDebuffs.Hunter],
  [WarcraftPlayerSpec.MageArcane]: [...WarcraftClassRaidDebuffs.Mage, WarcraftRaidDebuff.CastSpeed],
  [WarcraftPlayerSpec.MageFire]: [
    ...WarcraftClassRaidDebuffs.Mage,
    WarcraftRaidDebuff.SpellCritReceived
  ],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassRaidDebuffs.Mage],
  [WarcraftPlayerSpec.PriestDiscipline]: [...WarcraftClassRaidDebuffs.Priest],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassRaidDebuffs.Priest],
  [WarcraftPlayerSpec.PriestShadow]: [
    ...WarcraftClassRaidDebuffs.Priest,
    WarcraftRaidDebuff.HealingReceivedDown50
  ],
  [WarcraftPlayerSpec.PaladinHoly]: [...WarcraftClassRaidDebuffs.Paladin],
  [WarcraftPlayerSpec.PaladinProtection]: [
    ...WarcraftClassRaidDebuffs.Paladin,
    WarcraftRaidDebuff.MeleeHasteDown20,
    WarcraftRaidDebuff.PhysicalDamageDealt
  ],
  [WarcraftPlayerSpec.PaladinRetribution]: [...WarcraftClassRaidDebuffs.Paladin],
  [WarcraftPlayerSpec.RogueAssassination]: [
    ...WarcraftClassRaidDebuffs.Rogue,
    WarcraftRaidDebuff.SpellDamageReceived
  ],
  [WarcraftPlayerSpec.RogueCombat]: [
    ...WarcraftClassRaidDebuffs.Rogue,
    WarcraftRaidDebuff.PhysicalDamageReceived
  ],
  [WarcraftPlayerSpec.RogueSubtlety]: [
    ...WarcraftClassRaidDebuffs.Rogue,
    WarcraftRaidDebuff.BleedDamageReceived
  ],
  [WarcraftPlayerSpec.WarlockAffliction]: [...WarcraftClassRaidDebuffs.Warlock],
  [WarcraftPlayerSpec.WarlockDemonology]: [
    ...WarcraftClassRaidDebuffs.Warlock,
    WarcraftRaidDebuff.HealingReceivedDown50
  ],
  [WarcraftPlayerSpec.WarlockDestruction]: [
    ...WarcraftClassRaidDebuffs.Warlock,
    WarcraftRaidDebuff.SpellCritReceived
  ],
  [WarcraftPlayerSpec.ShamanElemental]: [...WarcraftClassRaidDebuffs.Shaman],
  [WarcraftPlayerSpec.ShamanEnhancement]: [...WarcraftClassRaidDebuffs.Shaman],
  [WarcraftPlayerSpec.ShamanRestoration]: [...WarcraftClassRaidDebuffs.Shaman],
  [WarcraftPlayerSpec.WarriorArms]: [
    ...WarcraftClassRaidDebuffs.Warrior,
    WarcraftRaidDebuff.BleedDamageReceived,
    WarcraftRaidDebuff.HealingReceivedDown50
  ],
  [WarcraftPlayerSpec.WarriorFury]: [
    ...WarcraftClassRaidDebuffs.Warrior,
    WarcraftRaidDebuff.PhysicalDamageReceived,
    WarcraftRaidDebuff.HealingReceivedDown50
  ],
  [WarcraftPlayerSpec.WarriorProtection]: [
    ...WarcraftClassRaidDebuffs.Warrior,
    WarcraftRaidDebuff.MeleeHasteDown20
  ],
  [WarcraftPlayerSpec.MonkBrewmaster]: [],
  [WarcraftPlayerSpec.MonkWindwalker]: [],
  [WarcraftPlayerSpec.MonkMistweaver]: []
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
  DamageReduction3 = "DamageReduction3",
  DarkIntent = "DarkIntent",
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
  [WarcraftPlayerClass.Deathknight]: [],
  [WarcraftPlayerClass.Druid]: [WarcraftRaidUtility.CombatResurrection],
  [WarcraftPlayerClass.Hunter]: [],
  [WarcraftPlayerClass.Mage]: [WarcraftRaidUtility.Bloodlust],
  [WarcraftPlayerClass.Priest]: [],
  [WarcraftPlayerClass.Paladin]: [WarcraftRaidUtility.BlessingOfProtection],
  [WarcraftPlayerClass.Rogue]: [],
  [WarcraftPlayerClass.Warlock]: [
    WarcraftRaidUtility.CombatResurrection,
    WarcraftRaidUtility.Healthstone
  ],
  [WarcraftPlayerClass.Shaman]: [WarcraftRaidUtility.Bloodlust],
  [WarcraftPlayerClass.Warrior]: [],
  [WarcraftPlayerClass.Monk]: []
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
  [WarcraftPlayerSpec.DeathknightUnholy]: [...WarcraftClassUtilities.Deathknight],

  [WarcraftPlayerSpec.DruidBalance]: [...WarcraftClassUtilities.Druid],
  [WarcraftPlayerSpec.DruidFeral]: [...WarcraftClassUtilities.Druid],
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

  [WarcraftPlayerSpec.PriestDiscipline]: [...WarcraftClassUtilities.Priest],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassUtilities.Priest],
  [WarcraftPlayerSpec.PriestShadow]: [...WarcraftClassUtilities.Priest],

  [WarcraftPlayerSpec.PaladinHoly]: [...WarcraftClassUtilities.Paladin],
  [WarcraftPlayerSpec.PaladinProtection]: [...WarcraftClassUtilities.Paladin],
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
    WarcraftRaidUtility.ManaTide
  ],

  [WarcraftPlayerSpec.WarriorArms]: [...WarcraftClassUtilities.Warrior],
  [WarcraftPlayerSpec.WarriorFury]: [...WarcraftClassUtilities.Warrior],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassUtilities.Warrior],
  [WarcraftPlayerSpec.MonkBrewmaster]: [],
  [WarcraftPlayerSpec.MonkWindwalker]: [],
  [WarcraftPlayerSpec.MonkMistweaver]: []
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
  ],
  [WarcraftPlayerClass.Monk]: [
    WarcraftPlayerSpec.MonkBrewmaster,
    WarcraftPlayerSpec.MonkWindwalker,
    WarcraftPlayerSpec.MonkMistweaver
  ]
};
