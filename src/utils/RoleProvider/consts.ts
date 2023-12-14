import { WarcraftPlayerClass, WarcraftPlayerRace, WarcraftPlayerSpec } from "../../consts";

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
  [WarcraftPlayerSpec.Unknown]: WarcraftRole.Unknown,
};

export enum WarcraftRaidBuff {
  MeleeHaste = "MeleeHaste",
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
  AttackPower10 = "AttackPower10",
  AttackPower10Wotlk = "AttackPower10Wotlk",
  Spirit = "Spirit",
  HealingReceived = "HealingReceived",
  Intellect = "Intellect",
}

export enum WarcraftRaidBuffCataclysm {
  MeleeHaste = "MeleeHaste",
  Crit = "Crit",
  AttackPower10 = "AttackPower10",
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
}

export enum WarcraftRaidBuffWotlk {
  SpellHaste = "SpellHaste",
  Kings = "Kings",
  SpellPower = "SpellPower",
  Haste3 = "Haste3",
  SpellCrit = "SpellCrit",
  AttackPower = "AttackPower",
  MarkOfTheWild = "MarkOfTheWild",
  PhysicalCrit = "PhysicalCrit",
  MeleeHaste20 = "MeleeHaste20",
  MaxHealth = "MaxHealth",
  StrengthAgility = "StrengthAgility",
  AttackPower10Wotlk = "AttackPower10Wotlk",
  IncDamage = "IncDamage",
  Spirit = "Spirit",
  HealingReceived = "HealingReceivedBuff",
  Intellect = "Intellect",
  Stamina = "Stamina",
  Replenishment = "Replenishment",
}

export const WarcraftClassRaidBuffsWotlk: {
  [className in WarcraftPlayerClass]: WarcraftRaidBuff[];
} = {
  [WarcraftPlayerClass.Deathknight]: [WarcraftRaidBuff.StrengthAgility],
  [WarcraftPlayerClass.Druid]: [WarcraftRaidBuff.MarkOfTheWild],
  [WarcraftPlayerClass.Hunter]: [],
  [WarcraftPlayerClass.Mage]: [WarcraftRaidBuff.Intellect],
  [WarcraftPlayerClass.Priest]: [WarcraftRaidBuff.Spirit,WarcraftRaidBuff.Stamina],
  [WarcraftPlayerClass.Paladin]: [WarcraftRaidBuff.Kings,WarcraftRaidBuff.AttackPower,WarcraftRaidBuff.MP5],
  [WarcraftPlayerClass.Rogue]: [],
  [WarcraftPlayerClass.Warlock]: [],
  [WarcraftPlayerClass.Shaman]: [WarcraftRaidBuff.StrengthAgility,WarcraftRaidBuff.MP5,WarcraftRaidBuff.MeleeHaste20,WarcraftRaidBuff.SpellHaste,WarcraftRaidBuff.SpellPower],
  [WarcraftPlayerClass.Warrior]: [WarcraftRaidBuff.AttackPower,WarcraftRaidBuff.MaxHealth],
  [WarcraftPlayerClass.Unknown]: [],
};

export const WarcraftClassRaidBuffs: {
  [className in WarcraftPlayerClass]: WarcraftRaidBuff[];
} = {
  [WarcraftPlayerClass.Deathknight]: [WarcraftRaidBuff.StrengthAgility],
  [WarcraftPlayerClass.Druid]: [WarcraftRaidBuff.AllStats],
  [WarcraftPlayerClass.Hunter]: [],
  [WarcraftPlayerClass.Mage]: [WarcraftRaidBuff.SpellPower6,WarcraftRaidBuff.MaxMana],
  [WarcraftPlayerClass.Priest]: [WarcraftRaidBuff.Stamina],
  [WarcraftPlayerClass.Paladin]: [WarcraftRaidBuff.AttackPower,WarcraftRaidBuff.AllStats,WarcraftRaidBuff.Armor,WarcraftRaidBuff.MP5],
  [WarcraftPlayerClass.Rogue]: [],
  [WarcraftPlayerClass.Warlock]: [],
  [WarcraftPlayerClass.Shaman]: [WarcraftRaidBuff.MeleeHaste,WarcraftRaidBuff.SpellHaste,WarcraftRaidBuff.SpellPower6,WarcraftRaidBuff.StrengthAgility,WarcraftRaidBuff.Armor,WarcraftRaidBuff.MP5],
  [WarcraftPlayerClass.Warrior]: [WarcraftRaidBuff.StrengthAgility,WarcraftRaidBuff.Stamina],
  [WarcraftPlayerClass.Unknown]: [],
};

export const WarcraftSpecRaidBuffsWotlk: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidBuff[];
} = {
  [WarcraftPlayerSpec.DeathknightBlood]: [...WarcraftClassRaidBuffsWotlk.Deathknight,WarcraftRaidBuff.AttackPower10Wotlk,WarcraftRaidBuff.MeleeHaste20],
  [WarcraftPlayerSpec.DeathknightFrost]: [...WarcraftClassRaidBuffsWotlk.Deathknight,WarcraftRaidBuff.MeleeHaste20],
  [WarcraftPlayerSpec.DeathknightUnholy]: [...WarcraftClassRaidBuffsWotlk.Deathknight],
  [WarcraftPlayerSpec.DruidBalance]: [...WarcraftClassRaidBuffsWotlk.Druid,WarcraftRaidBuff.Haste3,WarcraftRaidBuff.SpellCrit],
  [WarcraftPlayerSpec.DruidFeral]: [...WarcraftClassRaidBuffsWotlk.Druid,WarcraftRaidBuff.PhysicalCrit],
  [WarcraftPlayerSpec.DruidGuardian]: [...WarcraftClassRaidBuffsWotlk.Druid],
  [WarcraftPlayerSpec.DruidRestoration]: [...WarcraftClassRaidBuffsWotlk.Druid,WarcraftRaidBuff.HealingReceived],
  [WarcraftPlayerSpec.HunterBeastmastery]: [...WarcraftClassRaidBuffsWotlk.Hunter,WarcraftRaidBuff.IncDamage],
  [WarcraftPlayerSpec.HunterMarksmanship]: [...WarcraftClassRaidBuffsWotlk.Hunter,WarcraftRaidBuff.AttackPower10Wotlk],
  [WarcraftPlayerSpec.HunterSurvival]: [...WarcraftClassRaidBuffsWotlk.Hunter,WarcraftRaidBuff.Replenishment],
  [WarcraftPlayerSpec.MageArcane]: [...WarcraftClassRaidBuffsWotlk.Mage,WarcraftRaidBuff.IncDamage],
  [WarcraftPlayerSpec.MageFire]: [...WarcraftClassRaidBuffsWotlk.Mage],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassRaidBuffsWotlk.Mage,WarcraftRaidBuff.Replenishment],
  [WarcraftPlayerSpec.PriestDiscipline]: [...WarcraftClassRaidBuffsWotlk.Priest],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassRaidBuffsWotlk.Priest],
  [WarcraftPlayerSpec.PriestShadow]: [...WarcraftClassRaidBuffsWotlk.Priest,WarcraftRaidBuff.Replenishment],
  [WarcraftPlayerSpec.PaladinHoly]: [...WarcraftClassRaidBuffsWotlk.Paladin,WarcraftRaidBuff.HealingReceived],
  [WarcraftPlayerSpec.PaladinProtection]: [...WarcraftClassRaidBuffsWotlk.Paladin],
  [WarcraftPlayerSpec.PaladinRetribution]: [...WarcraftClassRaidBuffsWotlk.Paladin,WarcraftRaidBuff.IncDamage,WarcraftRaidBuff.Haste3,WarcraftRaidBuff.Replenishment],
  [WarcraftPlayerSpec.RogueAssassination]: [...WarcraftClassRaidBuffsWotlk.Rogue],
  [WarcraftPlayerSpec.RogueCombat]: [...WarcraftClassRaidBuffsWotlk.Rogue],
  [WarcraftPlayerSpec.RogueSubtlety]: [...WarcraftClassRaidBuffsWotlk.Rogue],
  [WarcraftPlayerSpec.WarlockAffliction]: [...WarcraftClassRaidBuffsWotlk.Warlock,WarcraftRaidBuff.Intellect,WarcraftRaidBuff.Spirit],
  [WarcraftPlayerSpec.WarlockDemonology]: [...WarcraftClassRaidBuffsWotlk.Warlock,WarcraftRaidBuff.SpellPower],
  [WarcraftPlayerSpec.WarlockDestruction]: [...WarcraftClassRaidBuffsWotlk.Warlock,WarcraftRaidBuff.MaxHealth,WarcraftRaidBuff.Replenishment],
  [WarcraftPlayerSpec.ShamanElemental]: [...WarcraftClassRaidBuffsWotlk.Shaman,WarcraftRaidBuff.SpellCrit],
  [WarcraftPlayerSpec.ShamanEnhancement]: [...WarcraftClassRaidBuffsWotlk.Shaman,WarcraftRaidBuff.AttackPower10Wotlk],
  [WarcraftPlayerSpec.ShamanRestoration]: [...WarcraftClassRaidBuffsWotlk.Shaman],
  [WarcraftPlayerSpec.WarriorArms]: [...WarcraftClassRaidBuffsWotlk.Warrior],
  [WarcraftPlayerSpec.WarriorFury]: [...WarcraftClassRaidBuffsWotlk.Warrior,WarcraftRaidBuff.PhysicalCrit],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassRaidBuffsWotlk.Warrior],
  [WarcraftPlayerSpec.Unknown]: [],
};

export const WarcraftSpecRaidBuffs: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidBuff[];
} = {
  [WarcraftPlayerSpec.DeathknightBlood]: [...WarcraftClassRaidBuffs.Deathknight,WarcraftRaidBuff.AttackPower],
  [WarcraftPlayerSpec.DeathknightFrost]: [...WarcraftClassRaidBuffs.Deathknight,WarcraftRaidBuff.MeleeHaste],
  [WarcraftPlayerSpec.DeathknightUnholy]: [...WarcraftClassRaidBuffs.Deathknight],
  [WarcraftPlayerSpec.DruidBalance]: [...WarcraftClassRaidBuffs.Druid,WarcraftRaidBuff.SpellHaste],
  [WarcraftPlayerSpec.DruidFeral]: [...WarcraftClassRaidBuffs.Druid,WarcraftRaidBuff.Crit],
  [WarcraftPlayerSpec.DruidGuardian]: [...WarcraftClassRaidBuffs.Druid],
  [WarcraftPlayerSpec.DruidRestoration]: [...WarcraftClassRaidBuffs.Druid,WarcraftRaidBuff.Replenishment],
  [WarcraftPlayerSpec.HunterBeastmastery]: [...WarcraftClassRaidBuffs.Hunter,WarcraftRaidBuff.IncDamage],
  [WarcraftPlayerSpec.HunterMarksmanship]: [...WarcraftClassRaidBuffs.Hunter,WarcraftRaidBuff.AttackPower],
  [WarcraftPlayerSpec.HunterSurvival]: [...WarcraftClassRaidBuffs.Hunter,WarcraftRaidBuff.MeleeHaste],
  [WarcraftPlayerSpec.MageArcane]: [...WarcraftClassRaidBuffs.Mage,WarcraftRaidBuff.IncDamage],
  [WarcraftPlayerSpec.MageFire]: [...WarcraftClassRaidBuffs.Mage],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassRaidBuffs.Mage,WarcraftRaidBuff.Replenishment],
  [WarcraftPlayerSpec.PriestDiscipline]: [...WarcraftClassRaidBuffs.Priest],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassRaidBuffs.Priest],
  [WarcraftPlayerSpec.PriestShadow]: [...WarcraftClassRaidBuffs.Priest,WarcraftRaidBuff.SpellHaste,WarcraftRaidBuff.Replenishment],
  [WarcraftPlayerSpec.PaladinHoly]: [...WarcraftClassRaidBuffs.Paladin],
  [WarcraftPlayerSpec.PaladinProtection]: [...WarcraftClassRaidBuffs.Paladin],
  [WarcraftPlayerSpec.PaladinRetribution]: [...WarcraftClassRaidBuffs.Paladin,WarcraftRaidBuff.IncDamage,WarcraftRaidBuff.Replenishment],
  [WarcraftPlayerSpec.RogueAssassination]: [...WarcraftClassRaidBuffs.Rogue],
  [WarcraftPlayerSpec.RogueCombat]: [...WarcraftClassRaidBuffs.Rogue],
  [WarcraftPlayerSpec.RogueSubtlety]: [...WarcraftClassRaidBuffs.Rogue,WarcraftRaidBuff.Crit],
  [WarcraftPlayerSpec.WarlockAffliction]: [...WarcraftClassRaidBuffs.Warlock,WarcraftRaidBuff.MaxMana,WarcraftRaidBuff.MP5],
  [WarcraftPlayerSpec.WarlockDemonology]: [...WarcraftClassRaidBuffs.Warlock,WarcraftRaidBuff.SpellPower10],
  [WarcraftPlayerSpec.WarlockDestruction]: [...WarcraftClassRaidBuffs.Warlock,WarcraftRaidBuff.Stamina,WarcraftRaidBuff.Replenishment],
  [WarcraftPlayerSpec.ShamanElemental]: [...WarcraftClassRaidBuffs.Shaman,WarcraftRaidBuff.Crit,WarcraftRaidBuff.SpellPower10],
  [WarcraftPlayerSpec.ShamanEnhancement]: [...WarcraftClassRaidBuffs.Shaman,WarcraftRaidBuff.AttackPower],
  [WarcraftPlayerSpec.ShamanRestoration]: [...WarcraftClassRaidBuffs.Shaman],
  [WarcraftPlayerSpec.WarriorArms]: [...WarcraftClassRaidBuffs.Warrior],
  [WarcraftPlayerSpec.WarriorFury]: [...WarcraftClassRaidBuffs.Warrior,WarcraftRaidBuff.Crit],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassRaidBuffs.Warrior],
  [WarcraftPlayerSpec.Unknown]: [],
};

export enum WarcraftRaidDebuff {
  ArmorDown = "ArmorDown",
  BleedDamageReceived = "BleedDamageReceived",
  SpellCritReceived = "SpellCritReceived",
  MeleeHaste = "MeleeHaste",
  SpellDamageReceived = "SpellDamageReceived",
  SpellDamageReceived13 = "SpellDamageReceived13",
  PhysicalDamageReceived = "PhysicalDamageReceived",
  HealingReceived = "HealingReceived",
  PhysicalDamageDealt = "PhysicalDamageDealt",
  CastSpeed = "CastSpeed",
  CastSpeed30 = "CastSpeed30",
  AttackPowerDown = "AttackPowerDown",
  ArmorDown5 = "ArmorDown5",
  ArmorDown20 = "ArmorDown20",
  CritChanceReceived = "CritChanceReceived",
  PhysicalHitDown = "PhysicalHitDown",
  SpellHit = "SpellHit"
}

export enum WarcraftRaidDebuffWotlk {
  ArmorDown5 = "ArmorDown5",
  ArmorDown20 = "ArmorDown20",
  BleedDamageReceived = "BleedDamageReceived",
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

export enum WarcraftRaidDebuffCataclysm {
  ArmorDown = "ArmorDown",
  BleedDamageReceived = "BleedDamageReceived",
  SpellCritReceived = "SpellCritReceived",
  MeleeHaste = "MeleeHaste",
  SpellDamageReceived = "SpellDamageReceived",
  PhysicalDamageReceived = "PhysicalDamageReceived",
  HealingReceived = "HealingReceived",
  PhysicalDamageDealt = "PhysicalDamageDealt",
  CastSpeed = "CastSpeed",
}

export const WarcraftClassRaidDebuffsWotlk: {
  [className in WarcraftPlayerClass]: WarcraftRaidDebuff[];
} = {
  [WarcraftPlayerClass.Deathknight]: [WarcraftRaidDebuff.MeleeHaste],
  [WarcraftPlayerClass.Druid]: [WarcraftRaidDebuff.ArmorDown5],
  [WarcraftPlayerClass.Hunter]: [WarcraftRaidDebuff.ArmorDown5,WarcraftRaidDebuff.PhysicalHitDown,WarcraftRaidDebuff.HealingReceived],
  [WarcraftPlayerClass.Mage]: [],
  [WarcraftPlayerClass.Priest]: [],
  [WarcraftPlayerClass.Paladin]: [],
  [WarcraftPlayerClass.Rogue]: [WarcraftRaidDebuff.ArmorDown20,WarcraftRaidDebuff.CastSpeed30,WarcraftRaidDebuff.HealingReceived],
  [WarcraftPlayerClass.Warlock]: [WarcraftRaidDebuff.ArmorDown5,WarcraftRaidDebuff.AttackPowerDown,WarcraftRaidDebuff.CastSpeed30,WarcraftRaidDebuff.SpellDamageReceived13],
  [WarcraftPlayerClass.Shaman]: [],
  [WarcraftPlayerClass.Warrior]: [WarcraftRaidDebuff.ArmorDown20,WarcraftRaidDebuff.AttackPowerDown,WarcraftRaidDebuff.MeleeHaste],
  [WarcraftPlayerClass.Unknown]: [],
};

export const WarcraftClassRaidDebuffs: {
  [className in WarcraftPlayerClass]: WarcraftRaidDebuff[];
} = {
  [WarcraftPlayerClass.Deathknight]: [WarcraftRaidDebuff.MeleeHaste,WarcraftRaidDebuff.CastSpeed],
  [WarcraftPlayerClass.Druid]: [WarcraftRaidDebuff.ArmorDown],
  [WarcraftPlayerClass.Hunter]: [WarcraftRaidDebuff.HealingReceived],
  [WarcraftPlayerClass.Mage]: [],
  [WarcraftPlayerClass.Priest]: [],
  [WarcraftPlayerClass.Paladin]: [],
  [WarcraftPlayerClass.Rogue]: [WarcraftRaidDebuff.ArmorDown,WarcraftRaidDebuff.HealingReceived,WarcraftRaidDebuff.CastSpeed],
  [WarcraftPlayerClass.Warlock]: [WarcraftRaidDebuff.SpellDamageReceived,WarcraftRaidDebuff.PhysicalDamageDealt,WarcraftRaidDebuff.CastSpeed],
  [WarcraftPlayerClass.Shaman]: [WarcraftRaidDebuff.MeleeHaste],
  [WarcraftPlayerClass.Warrior]: [WarcraftRaidDebuff.ArmorDown,WarcraftRaidDebuff.PhysicalDamageDealt],
  [WarcraftPlayerClass.Unknown]: [],
};

export const WarcraftSpecRaidDebuffsWotlk: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidDebuff[];
} = {
  [WarcraftPlayerSpec.DeathknightBlood]: [...WarcraftClassRaidDebuffsWotlk.Deathknight],
  [WarcraftPlayerSpec.DeathknightFrost]: [...WarcraftClassRaidDebuffsWotlk.Deathknight],
  [WarcraftPlayerSpec.DeathknightUnholy]: [...WarcraftClassRaidDebuffsWotlk.Deathknight,WarcraftRaidDebuff.SpellDamageReceived13],
  [WarcraftPlayerSpec.DruidBalance]: [...WarcraftClassRaidDebuffsWotlk.Druid,WarcraftRaidDebuff.PhysicalHitDown,WarcraftRaidDebuff.SpellDamageReceived13,WarcraftRaidDebuff.SpellHit],
  [WarcraftPlayerSpec.DruidFeral]: [...WarcraftClassRaidDebuffsWotlk.Druid,WarcraftRaidDebuff.AttackPowerDown,WarcraftRaidDebuff.MeleeHaste,WarcraftRaidDebuff.BleedDamageReceived],
  [WarcraftPlayerSpec.DruidGuardian]: [...WarcraftClassRaidDebuffsWotlk.Druid,WarcraftRaidDebuff.AttackPowerDown,WarcraftRaidDebuff.BleedDamageReceived],
  [WarcraftPlayerSpec.DruidRestoration]: [...WarcraftClassRaidDebuffsWotlk.Druid],
  [WarcraftPlayerSpec.HunterBeastmastery]: [...WarcraftClassRaidDebuffsWotlk.Hunter,WarcraftRaidDebuff.ArmorDown20,WarcraftRaidDebuff.BleedDamageReceived,WarcraftRaidDebuff.CastSpeed30],
  [WarcraftPlayerSpec.HunterMarksmanship]: [...WarcraftClassRaidDebuffsWotlk.Hunter],
  [WarcraftPlayerSpec.HunterSurvival]: [...WarcraftClassRaidDebuffsWotlk.Hunter],
  [WarcraftPlayerSpec.MageArcane]: [...WarcraftClassRaidDebuffsWotlk.Mage,WarcraftRaidDebuff.CastSpeed30],
  [WarcraftPlayerSpec.MageFire]: [...WarcraftClassRaidDebuffsWotlk.Mage,WarcraftRaidDebuff.SpellCritReceived],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassRaidDebuffsWotlk.Mage,WarcraftRaidDebuff.SpellCritReceived],
  [WarcraftPlayerSpec.PriestDiscipline]: [...WarcraftClassRaidDebuffsWotlk.Priest],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassRaidDebuffsWotlk.Priest],
  [WarcraftPlayerSpec.PriestShadow]: [...WarcraftClassRaidDebuffsWotlk.Priest,WarcraftRaidDebuff.SpellHit],
  [WarcraftPlayerSpec.PaladinHoly]: [...WarcraftClassRaidDebuffsWotlk.Paladin],
  [WarcraftPlayerSpec.PaladinProtection]: [...WarcraftClassRaidDebuffsWotlk.Paladin,WarcraftRaidDebuff.AttackPowerDown,WarcraftRaidDebuff.MeleeHaste],
  [WarcraftPlayerSpec.PaladinRetribution]: [...WarcraftClassRaidDebuffsWotlk.Paladin,WarcraftRaidDebuff.AttackPowerDown,WarcraftRaidDebuff.CritChanceReceived],
  [WarcraftPlayerSpec.RogueAssassination]: [...WarcraftClassRaidDebuffsWotlk.Rogue,WarcraftRaidDebuff.CritChanceReceived],
  [WarcraftPlayerSpec.RogueCombat]: [...WarcraftClassRaidDebuffsWotlk.Rogue,WarcraftRaidDebuff.PhysicalDamageReceived],
  [WarcraftPlayerSpec.RogueSubtlety]: [...WarcraftClassRaidDebuffsWotlk.Rogue],
  [WarcraftPlayerSpec.WarlockAffliction]: [...WarcraftClassRaidDebuffsWotlk.Warlock,WarcraftRaidDebuff.SpellCritReceived],
  [WarcraftPlayerSpec.WarlockDemonology]: [...WarcraftClassRaidDebuffsWotlk.Warlock,WarcraftRaidDebuff.SpellCritReceived],
  [WarcraftPlayerSpec.WarlockDestruction]: [...WarcraftClassRaidDebuffsWotlk.Warlock],
  [WarcraftPlayerSpec.ShamanElemental]: [...WarcraftClassRaidDebuffsWotlk.Shaman,WarcraftRaidDebuff.CritChanceReceived],
  [WarcraftPlayerSpec.ShamanEnhancement]: [...WarcraftClassRaidDebuffsWotlk.Shaman],
  [WarcraftPlayerSpec.ShamanRestoration]: [...WarcraftClassRaidDebuffsWotlk.Shaman],
  [WarcraftPlayerSpec.WarriorArms]: [...WarcraftClassRaidDebuffsWotlk.Warrior,WarcraftRaidDebuff.BleedDamageReceived,WarcraftRaidDebuff.HealingReceived,WarcraftRaidDebuff.PhysicalDamageReceived],
  [WarcraftPlayerSpec.WarriorFury]: [...WarcraftClassRaidDebuffsWotlk.Warrior],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassRaidDebuffsWotlk.Warrior],
  [WarcraftPlayerSpec.Unknown]: [],
};

export const WarcraftSpecRaidDebuffs: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidDebuff[];
} = {
  [WarcraftPlayerSpec.DeathknightBlood]: [...WarcraftClassRaidDebuffs.Deathknight,WarcraftRaidDebuff.PhysicalDamageDealt],
  [WarcraftPlayerSpec.DeathknightFrost]: [...WarcraftClassRaidDebuffs.Deathknight,WarcraftRaidDebuff.PhysicalDamageReceived],
  [WarcraftPlayerSpec.DeathknightUnholy]: [...WarcraftClassRaidDebuffs.Deathknight,WarcraftRaidDebuff.SpellDamageReceived],
  [WarcraftPlayerSpec.DruidBalance]: [...WarcraftClassRaidDebuffs.Druid,WarcraftRaidDebuff.SpellDamageReceived],
  [WarcraftPlayerSpec.DruidFeral]: [...WarcraftClassRaidDebuffs.Druid,WarcraftRaidDebuff.BleedDamageReceived,WarcraftRaidDebuff.MeleeHaste,WarcraftRaidDebuff.PhysicalDamageDealt],
  [WarcraftPlayerSpec.DruidGuardian]: [...WarcraftClassRaidDebuffs.Druid],
  [WarcraftPlayerSpec.DruidRestoration]: [...WarcraftClassRaidDebuffs.Druid],
  [WarcraftPlayerSpec.HunterBeastmastery]: [...WarcraftClassRaidDebuffs.Hunter],
  [WarcraftPlayerSpec.HunterMarksmanship]: [...WarcraftClassRaidDebuffs.Hunter],
  [WarcraftPlayerSpec.HunterSurvival]: [...WarcraftClassRaidDebuffs.Hunter],
  [WarcraftPlayerSpec.MageArcane]: [...WarcraftClassRaidDebuffs.Mage,WarcraftRaidDebuff.CastSpeed],
  [WarcraftPlayerSpec.MageFire]: [...WarcraftClassRaidDebuffs.Mage,WarcraftRaidDebuff.SpellCritReceived],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassRaidDebuffs.Mage],
  [WarcraftPlayerSpec.PriestDiscipline]: [...WarcraftClassRaidDebuffs.Priest],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassRaidDebuffs.Priest],
  [WarcraftPlayerSpec.PriestShadow]: [...WarcraftClassRaidDebuffs.Priest,WarcraftRaidDebuff.HealingReceived],
  [WarcraftPlayerSpec.PaladinHoly]: [...WarcraftClassRaidDebuffs.Paladin],
  [WarcraftPlayerSpec.PaladinProtection]: [...WarcraftClassRaidDebuffs.Paladin,WarcraftRaidDebuff.MeleeHaste,WarcraftRaidDebuff.PhysicalDamageDealt],
  [WarcraftPlayerSpec.PaladinRetribution]: [...WarcraftClassRaidDebuffs.Paladin],
  [WarcraftPlayerSpec.RogueAssassination]: [...WarcraftClassRaidDebuffs.Rogue,WarcraftRaidDebuff.SpellDamageReceived],
  [WarcraftPlayerSpec.RogueCombat]: [...WarcraftClassRaidDebuffs.Rogue,WarcraftRaidDebuff.PhysicalDamageReceived],
  [WarcraftPlayerSpec.RogueSubtlety]: [...WarcraftClassRaidDebuffs.Rogue,WarcraftRaidDebuff.BleedDamageReceived],
  [WarcraftPlayerSpec.WarlockAffliction]: [...WarcraftClassRaidDebuffs.Warlock],
  [WarcraftPlayerSpec.WarlockDemonology]: [...WarcraftClassRaidDebuffs.Warlock,WarcraftRaidDebuff.HealingReceived],
  [WarcraftPlayerSpec.WarlockDestruction]: [...WarcraftClassRaidDebuffs.Warlock,WarcraftRaidDebuff.SpellCritReceived],
  [WarcraftPlayerSpec.ShamanElemental]: [...WarcraftClassRaidDebuffs.Shaman],
  [WarcraftPlayerSpec.ShamanEnhancement]: [...WarcraftClassRaidDebuffs.Shaman],
  [WarcraftPlayerSpec.ShamanRestoration]: [...WarcraftClassRaidDebuffs.Shaman],
  [WarcraftPlayerSpec.WarriorArms]: [...WarcraftClassRaidDebuffs.Warrior,WarcraftRaidDebuff.BleedDamageReceived,WarcraftRaidDebuff.HealingReceived],
  [WarcraftPlayerSpec.WarriorFury]: [...WarcraftClassRaidDebuffs.Warrior,WarcraftRaidDebuff.PhysicalDamageReceived,WarcraftRaidDebuff.HealingReceived],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassRaidDebuffs.Warrior,WarcraftRaidDebuff.MeleeHaste],
  [WarcraftPlayerSpec.Unknown]: [],
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

export enum WarcraftRaidUtilityWotlk {
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

export enum WarcraftRaidUtilityCataclysm {
  Bloodlust = "Bloodlust",
  CombatResurrection = "CombatResurrection",
  Healthstone = "Healthstone",
  Innervate = "Innervate",
  BlessingOfProtection = "BlessingOfProtection",
  ManaTide = "ManaTide"
}

export const WarcraftClassUtilities: {
  [className in WarcraftPlayerClass]: WarcraftRaidUtility[];
} = {
  [WarcraftPlayerClass.Deathknight]: [],
  [WarcraftPlayerClass.Druid]: [
    WarcraftRaidUtility.CombatResurrection,
  ],
  [WarcraftPlayerClass.Hunter]: [],
  [WarcraftPlayerClass.Mage]: [WarcraftRaidUtility.Bloodlust],
  [WarcraftPlayerClass.Priest]: [],
  [WarcraftPlayerClass.Paladin]: [WarcraftRaidUtility.BlessingOfProtection],
  [WarcraftPlayerClass.Rogue]: [],
  [WarcraftPlayerClass.Warlock]: [
    WarcraftRaidUtility.CombatResurrection,
    WarcraftRaidUtility.Healthstone,
  ],
  [WarcraftPlayerClass.Shaman]: [WarcraftRaidUtility.Bloodlust],
  [WarcraftPlayerClass.Warrior]: [],
  [WarcraftPlayerClass.Unknown]: [],
};

export const WarcraftClassUtilitiesWotlk: {
  [className in WarcraftPlayerClass]: WarcraftRaidUtility[];
} = {
  [WarcraftPlayerClass.Deathknight]: [],
  [WarcraftPlayerClass.Druid]: [
    WarcraftRaidUtility.CombatResurrection,
  ],
  [WarcraftPlayerClass.Hunter]: [],
  [WarcraftPlayerClass.Mage]: [WarcraftRaidUtility.FocusMagic],
  [WarcraftPlayerClass.Priest]: [],
  [WarcraftPlayerClass.Paladin]: [WarcraftRaidUtility.BlessingOfProtection],
  [WarcraftPlayerClass.Rogue]: [WarcraftRaidUtility.TricksOfTheTrade],
  [WarcraftPlayerClass.Warlock]: [
    WarcraftRaidUtility.CombatResurrection,
    WarcraftRaidUtility.Healthstone,
  ],
  [WarcraftPlayerClass.Shaman]: [WarcraftRaidUtility.Bloodlust],
  [WarcraftPlayerClass.Warrior]: [],
  [WarcraftPlayerClass.Unknown]: [],
};

export const WarcraftRaceUtilities: {
  [className in WarcraftPlayerRace]: WarcraftRaidUtility[];
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
  [WarcraftPlayerRace.Unknown]: [],
};

export const WarcraftRaceUtilitiesWotlk: {
  [className in WarcraftPlayerRace]: WarcraftRaidUtility[];
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
  [WarcraftPlayerRace.Goblin]: [],
  [WarcraftPlayerRace.Unknown]: [],
};

export const WarcraftSpecUtilitiesWotlk: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftRaidUtility[];
} = {
  [WarcraftPlayerSpec.DeathknightBlood]: [...WarcraftClassUtilitiesWotlk.Deathknight,WarcraftRaidUtility.UnholyFrenzy],
  [WarcraftPlayerSpec.DeathknightFrost]: [...WarcraftClassUtilitiesWotlk.Deathknight],
  [WarcraftPlayerSpec.DeathknightUnholy]: [...WarcraftClassUtilitiesWotlk.Deathknight],

  [WarcraftPlayerSpec.DruidBalance]: [...WarcraftClassUtilitiesWotlk.Druid,WarcraftRaidUtility.Innervate],
  [WarcraftPlayerSpec.DruidFeral]: [...WarcraftClassUtilitiesWotlk.Druid,WarcraftRaidUtility.Innervate],
  [WarcraftPlayerSpec.DruidGuardian]: [
    ...WarcraftClassUtilitiesWotlk.Druid,
    WarcraftRaidUtility.Innervate,
  ],
  [WarcraftPlayerSpec.DruidRestoration]: [
    ...WarcraftClassUtilitiesWotlk.Druid,
    WarcraftRaidUtility.Innervate,
  ],

  [WarcraftPlayerSpec.HunterBeastmastery]: [...WarcraftClassUtilitiesWotlk.Hunter],
  [WarcraftPlayerSpec.HunterMarksmanship]: [...WarcraftClassUtilitiesWotlk.Hunter],
  [WarcraftPlayerSpec.HunterSurvival]: [...WarcraftClassUtilitiesWotlk.Hunter],

  [WarcraftPlayerSpec.MageArcane]: [...WarcraftClassUtilitiesWotlk.Mage],
  [WarcraftPlayerSpec.MageFire]: [...WarcraftClassUtilitiesWotlk.Mage],
  [WarcraftPlayerSpec.MageFrost]: [...WarcraftClassUtilitiesWotlk.Mage],

  [WarcraftPlayerSpec.PriestDiscipline]: [...WarcraftClassUtilitiesWotlk.Priest,WarcraftRaidUtility.PowerInfusion,WarcraftRaidUtility.DamageReduction10],
  [WarcraftPlayerSpec.PriestHoly]: [...WarcraftClassUtilitiesWotlk.Priest,WarcraftRaidUtility.DamageReduction3,WarcraftRaidUtility.DamageReduction10],
  [WarcraftPlayerSpec.PriestShadow]: [...WarcraftClassUtilitiesWotlk.Priest],

  [WarcraftPlayerSpec.PaladinHoly]: [...WarcraftClassUtilitiesWotlk.Paladin,WarcraftRaidUtility.DivineGuardian],
  [WarcraftPlayerSpec.PaladinProtection]: [...WarcraftClassUtilitiesWotlk.Paladin,WarcraftRaidUtility.DivineGuardian,WarcraftRaidUtility.DamageReduction3],
  [WarcraftPlayerSpec.PaladinRetribution]: [...WarcraftClassUtilitiesWotlk.Paladin],

  [WarcraftPlayerSpec.RogueAssassination]: [...WarcraftClassUtilitiesWotlk.Rogue],
  [WarcraftPlayerSpec.RogueCombat]: [...WarcraftClassUtilitiesWotlk.Rogue],
  [WarcraftPlayerSpec.RogueSubtlety]: [...WarcraftClassUtilitiesWotlk.Rogue],

  [WarcraftPlayerSpec.WarlockAffliction]: [...WarcraftClassUtilitiesWotlk.Warlock],
  [WarcraftPlayerSpec.WarlockDemonology]: [...WarcraftClassUtilitiesWotlk.Warlock],
  [WarcraftPlayerSpec.WarlockDestruction]: [...WarcraftClassUtilitiesWotlk.Warlock],

  [WarcraftPlayerSpec.ShamanElemental]: [...WarcraftClassUtilitiesWotlk.Shaman],
  [WarcraftPlayerSpec.ShamanEnhancement]: [...WarcraftClassUtilitiesWotlk.Shaman],
  [WarcraftPlayerSpec.ShamanRestoration]: [...WarcraftClassUtilitiesWotlk.Shaman,WarcraftRaidUtility.ManaTide,WarcraftRaidUtility.DamageReduction10],

  [WarcraftPlayerSpec.WarriorArms]: [...WarcraftClassUtilitiesWotlk.Warrior],
  [WarcraftPlayerSpec.WarriorFury]: [...WarcraftClassUtilitiesWotlk.Warrior],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassUtilitiesWotlk.Warrior],
  [WarcraftPlayerSpec.Unknown]: [],
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
    WarcraftRaidUtility.Innervate,
  ],
  [WarcraftPlayerSpec.DruidRestoration]: [
    ...WarcraftClassUtilities.Druid,
    WarcraftRaidUtility.Innervate,
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
  [WarcraftPlayerSpec.ShamanRestoration]: [...WarcraftClassUtilities.Shaman,WarcraftRaidUtility.ManaTide],

  [WarcraftPlayerSpec.WarriorArms]: [...WarcraftClassUtilities.Warrior],
  [WarcraftPlayerSpec.WarriorFury]: [...WarcraftClassUtilities.Warrior],
  [WarcraftPlayerSpec.WarriorProtection]: [...WarcraftClassUtilities.Warrior],
  [WarcraftPlayerSpec.Unknown]: [],
};

export const WarcraftPlayerClassSpecs: {
  [className in WarcraftPlayerClass]: WarcraftPlayerSpec[];
} = {
  [WarcraftPlayerClass.Deathknight]: [
    WarcraftPlayerSpec.DeathknightBlood,
    WarcraftPlayerSpec.DeathknightFrost,
    WarcraftPlayerSpec.DeathknightUnholy,
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
    WarcraftPlayerSpec.RogueCombat,
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
