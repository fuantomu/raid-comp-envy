import { WarcraftPlayerClass, WarcraftPlayerRace, WarcraftPlayerSpec } from "../../consts";
import {
  WarcraftRaidBuff,
  WarcraftRaidDebuff,
  WarcraftRaidUtility,
  WarcraftRole
} from "../RoleProvider/consts";

export type WarcraftIcon = string;

export enum WarcraftIconSize {
  SMALL = 18,
  MEDIUM = 36,
  LARGE = 56
}

export const IconUnknown: WarcraftIcon = "inv_misc_questionmark";

export const WarcraftClassIcon: {
  [class_name in WarcraftPlayerClass]: WarcraftIcon;
} = {
  [WarcraftPlayerClass.Deathknight]: "classicon_deathknight",
  [WarcraftPlayerClass.Druid]: "classicon_druid",
  [WarcraftPlayerClass.Hunter]: "classicon_hunter",
  [WarcraftPlayerClass.Mage]: "classicon_mage",
  [WarcraftPlayerClass.Paladin]: "classicon_paladin",
  [WarcraftPlayerClass.Priest]: "classicon_priest",
  [WarcraftPlayerClass.Rogue]: "classicon_rogue",
  [WarcraftPlayerClass.Shaman]: "classicon_shaman",
  [WarcraftPlayerClass.Warlock]: "classicon_warlock",
  [WarcraftPlayerClass.Warrior]: "classicon_warrior"
};

export const WarcraftRaceIcon: {
  [class_name in WarcraftPlayerRace]: WarcraftIcon;
} = {
  [WarcraftPlayerRace.Human]: "achievement_character_human_female",
  [WarcraftPlayerRace.Dwarf]: "achievement_character_dwarf_male",
  [WarcraftPlayerRace.Gnome]: "achievement_character_gnome_male",
  [WarcraftPlayerRace.Nightelf]: "achievement_character_nightelf_female",
  [WarcraftPlayerRace.Draenei]: "achievement_character_draenei_female",
  [WarcraftPlayerRace.Worgen]: "achievement_worganhead",
  [WarcraftPlayerRace.Orc]: "achievement_character_orc_male",
  [WarcraftPlayerRace.Troll]: "achievement_character_troll_male",
  [WarcraftPlayerRace.Undead]: "achievement_character_undead_male",
  [WarcraftPlayerRace.Tauren]: "achievement_character_tauren_male",
  [WarcraftPlayerRace.Bloodelf]: "achievement_character_bloodelf_female",
  [WarcraftPlayerRace.Goblin]: "achievement_goblinhead"
};

export const WarcraftSpecIcon: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftIcon;
} = {
  [WarcraftPlayerSpec.DeathknightBlood]: "spell_deathknight_bloodpresence",
  [WarcraftPlayerSpec.DeathknightFrost]: "spell_deathknight_frostpresence",
  [WarcraftPlayerSpec.DeathknightUnholy]: "spell_deathknight_unholypresence",
  [WarcraftPlayerSpec.DruidBalance]: "spell_nature_starfall",
  [WarcraftPlayerSpec.DruidFeral]: "ability_druid_catform",
  [WarcraftPlayerSpec.DruidGuardian]: "ability_racial_bearform",
  [WarcraftPlayerSpec.DruidRestoration]: "spell_nature_healingtouch",
  [WarcraftPlayerSpec.HunterBeastmastery]: "ability_hunter_bestialdiscipline",
  [WarcraftPlayerSpec.HunterMarksmanship]: "ability_hunter_focusedaim",
  [WarcraftPlayerSpec.HunterSurvival]: "ability_hunter_camouflage",
  [WarcraftPlayerSpec.MageArcane]: "spell_holy_magicalsentry",
  [WarcraftPlayerSpec.MageFire]: "spell_fire_firebolt02",
  [WarcraftPlayerSpec.MageFrost]: "spell_frost_frostbolt02",
  [WarcraftPlayerSpec.PriestDiscipline]: "spell_holy_powerwordshield",
  [WarcraftPlayerSpec.PriestHoly]: "spell_holy_guardianspirit",
  [WarcraftPlayerSpec.PriestShadow]: "spell_shadow_shadowwordpain",
  [WarcraftPlayerSpec.PaladinHoly]: "spell_holy_holybolt",
  [WarcraftPlayerSpec.PaladinProtection]: "ability_paladin_shieldofthetemplar",
  [WarcraftPlayerSpec.PaladinRetribution]: "spell_holy_auraoflight",
  [WarcraftPlayerSpec.RogueAssassination]: "ability_rogue_eviscerate",
  [WarcraftPlayerSpec.RogueCombat]: "ability_backstab",
  [WarcraftPlayerSpec.RogueSubtlety]: "ability_stealth",
  [WarcraftPlayerSpec.WarlockAffliction]: "spell_shadow_deathcoil",
  [WarcraftPlayerSpec.WarlockDemonology]: "spell_shadow_metamorphosis",
  [WarcraftPlayerSpec.WarlockDestruction]: "spell_shadow_rainoffire",
  [WarcraftPlayerSpec.ShamanElemental]: "spell_nature_lightning",
  [WarcraftPlayerSpec.ShamanEnhancement]: "spell_shaman_improvedstormstrike",
  [WarcraftPlayerSpec.ShamanRestoration]: "spell_nature_magicimmunity",
  [WarcraftPlayerSpec.WarriorArms]: "ability_warrior_savageblow",
  [WarcraftPlayerSpec.WarriorFury]: "ability_warrior_innerrage",
  [WarcraftPlayerSpec.WarriorProtection]: "ability_warrior_defensivestance"
};

export const WarcraftRoleIcon: {
  [class_name in WarcraftRole]: WarcraftIcon;
} = {
  [WarcraftRole.Unknown]: IconUnknown,
  [WarcraftRole.Tank]: "ability_defend",
  [WarcraftRole.Healer]: "spell_holy_heal",
  [WarcraftRole.RangedDPS]: "inv_weapon_bow_02",
  [WarcraftRole.MeleeDPS]: "ability_meleedamage"
};

export const WarcraftBuffIcon: {
  [buff in WarcraftRaidBuff]: WarcraftIcon;
} = {
  [WarcraftRaidBuff.MeleeHaste]: "spell_nature_windfury",
  [WarcraftRaidBuff.Crit]: "spell_nature_unyeildingstamina",
  [WarcraftRaidBuff.AttackPower10]: "spell_holy_fistofjustice",
  [WarcraftRaidBuff.AttackPower10Wotlk]: "ability_trueshot",
  [WarcraftRaidBuff.AttackPower]: "spell_holy_fistofjustice",
  [WarcraftRaidBuff.SpellHaste]: "spell_nature_forceofnature",
  [WarcraftRaidBuff.SpellPower10]: "spell_shadow_demonicpact",
  [WarcraftRaidBuff.SpellPower6]: "spell_holy_magicalsentry",
  [WarcraftRaidBuff.SpellPower]: "spell_shadow_demonicpact",
  [WarcraftRaidBuff.IncDamage]: "ability_hunter_ferociousinspiration",
  [WarcraftRaidBuff.AllStats]: "spell_magic_magearmor",
  [WarcraftRaidBuff.StrengthAgility]: "inv_misc_horn_02",
  [WarcraftRaidBuff.Stamina]: "spell_holy_wordfortitude",
  [WarcraftRaidBuff.MaxMana]: "spell_holy_magicalsentry",
  [WarcraftRaidBuff.Armor]: "spell_holy_devotionaura",
  [WarcraftRaidBuff.MP5]: "spell_nature_manaregentotem",
  [WarcraftRaidBuff.Replenishment]: "spell_magic_managain",
  [WarcraftRaidBuff.Kings]: "spell_magic_greaterblessingofkings",
  [WarcraftRaidBuff.Haste3]: "ability_paladin_swiftretribution",
  [WarcraftRaidBuff.Intellect]: "spell_holy_magicalsentry",
  [WarcraftRaidBuff.Spirit]: "spell_holy_divinespirit",
  [WarcraftRaidBuff.MaxHealth]: "ability_warrior_rallyingcry",
  [WarcraftRaidBuff.SpellCrit]: "spell_nature_forceofnature",
  [WarcraftRaidBuff.MarkOfTheWild]: "spell_nature_regeneration",
  [WarcraftRaidBuff.PhysicalCrit]: "spell_nature_unyeildingstamina",
  [WarcraftRaidBuff.HealingReceived]: "ability_druid_treeoflife",
  [WarcraftRaidBuff.MeleeHaste20]: "spell_nature_windfury"
};

export const WarcraftDebuffIcon: {
  [buff in WarcraftRaidDebuff]: WarcraftIcon;
} = {
  [WarcraftRaidDebuff.ArmorDown]: "ability_warrior_riposte",
  [WarcraftRaidDebuff.BleedDamageReceived]: "ability_druid_mangle2",
  [WarcraftRaidDebuff.SpellCritReceived]: "spell_fire_soulburn",
  [WarcraftRaidDebuff.MeleeHaste]: "spell_nature_thunderclap",
  [WarcraftRaidDebuff.SpellDamageReceived]: "ability_creature_poison_06",
  [WarcraftRaidDebuff.SpellDamageReceived13]: "spell_shadow_chilltouch",
  [WarcraftRaidDebuff.PhysicalDamageReceived]: "ability_warrior_bloodfrenzy",
  [WarcraftRaidDebuff.HealingReceived]: "ability_warrior_savageblow",
  [WarcraftRaidDebuff.PhysicalDamageDealt]: "ability_warrior_warcry",
  [WarcraftRaidDebuff.CastSpeed]: "spell_shadow_curseoftounges",
  [WarcraftRaidDebuff.CastSpeed30]: "spell_nature_nullifydisease",
  [WarcraftRaidDebuff.AttackPowerDown]: "ability_warrior_warcry",
  [WarcraftRaidDebuff.ArmorDown20]: "ability_warrior_riposte",
  [WarcraftRaidDebuff.ArmorDown5]: "spell_nature_faeriefire",
  [WarcraftRaidDebuff.SpellHit]: "spell_shadow_misery",
  [WarcraftRaidDebuff.CritChanceReceived]: "ability_creature_poison_06",
  [WarcraftRaidDebuff.PhysicalHitDown]: "ability_hunter_criticalshot"
};

export const WarcraftUtilityIcon: {
  [buff in WarcraftRaidUtility]: WarcraftIcon;
} = {
  [WarcraftRaidUtility.Bloodlust]: "spell_nature_bloodlust",
  [WarcraftRaidUtility.CombatResurrection]: "spell_nature_reincarnation",
  [WarcraftRaidUtility.Healthstone]: "warlock_healthstone",
  [WarcraftRaidUtility.Innervate]: "spell_nature_lightning",
  [WarcraftRaidUtility.BlessingOfProtection]: "spell_holy_sealofprotection",
  [WarcraftRaidUtility.ManaTide]: "spell_frost_summonwaterelemental",
  [WarcraftRaidUtility.DraeneiHit]: "inv_helmet_21",
  [WarcraftRaidUtility.TricksOfTheTrade]: "ability_rogue_tricksofthetrade",
  [WarcraftRaidUtility.PowerInfusion]: "spell_holy_powerinfusion",
  [WarcraftRaidUtility.UnholyFrenzy]: "spell_deathknight_bladedarmor",
  [WarcraftRaidUtility.FocusMagic]: "spell_arcane_studentofmagic",
  [WarcraftRaidUtility.DivineGuardian]: "spell_holy_powerwordbarrier",
  [WarcraftRaidUtility.DamageReduction10]: "spell_holy_layonhands",
  [WarcraftRaidUtility.DamageReduction3]: "spell_holy_greaterblessingofsanctuary"
};

export enum CustomIcon {
  GroupNeedMore = "inv_misc_groupneedmore",
  WRATH = "achievement_boss_lichking",
  CATACLYSM = "achievment_boss_madnessofdeathwing"
}
