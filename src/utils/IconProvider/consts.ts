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
  [WarcraftPlayerClass.Warrior]: "classicon_warrior",
  [WarcraftPlayerClass.Monk]: "classicon_monk"
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
  [WarcraftPlayerRace.Goblin]: "achievement_goblinhead",
  [WarcraftPlayerRace.Pandaren]: "achievement_character_pandaren_female"
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
  [WarcraftPlayerSpec.WarriorProtection]: "ability_warrior_defensivestance",
  [WarcraftPlayerSpec.MonkBrewmaster]: "spell_monk_brewmaster_spec",
  [WarcraftPlayerSpec.MonkWindwalker]: "spell_monk_windwalker_spec",
  [WarcraftPlayerSpec.MonkMistweaver]: "spell_monk_mistweaver_spec"
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
  [WarcraftRaidBuff.MeleeHasteUp10]: "spell_nature_windfury",
  [WarcraftRaidBuff.Crit]: "spell_nature_unyeildingstamina",
  [WarcraftRaidBuff.AttackPower20]: "spell_holy_fistofjustice",
  [WarcraftRaidBuff.AttackPower10]: "ability_trueshot",
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
  [WarcraftRaidBuff.HealingReceived6]: "ability_druid_treeoflife",
  [WarcraftRaidBuff.MeleeHaste20]: "spell_nature_windfury",
  [WarcraftRaidBuff.AttackSpeed10]: "inv_helmet_08",
  [WarcraftRaidBuff.SpellHaste5]: "spell_nature_moonglow",
  [WarcraftRaidBuff.CritChance5]: "spell_nature_unyeildingstamina",
  [WarcraftRaidBuff.MasteryRating3000]: "spell_holy_fistofjustice",
  [WarcraftRaidBuff.AllStats5]: "spell_magic_magearmor",
  [WarcraftRaidBuff.Stamina10]: "spell_holy_wordfortitude"
};

export const WarcraftDebuffIcon: {
  [buff in WarcraftRaidDebuff]: WarcraftIcon;
} = {
  [WarcraftRaidDebuff.ArmorDown]: "ability_warrior_riposte",
  [WarcraftRaidDebuff.BleedDamageReceived]: "ability_druid_mangle2",
  [WarcraftRaidDebuff.SpellCritReceived]: "spell_fire_soulburn",
  [WarcraftRaidDebuff.MeleeHasteDown20]: "spell_nature_thunderclap",
  [WarcraftRaidDebuff.SpellDamageReceived]: "ability_creature_poison_06",
  [WarcraftRaidDebuff.SpellDamageReceived13]: "spell_shadow_chilltouch",
  [WarcraftRaidDebuff.PhysicalDamageReceived]: "ability_warrior_bloodfrenzy",
  [WarcraftRaidDebuff.HealingReceivedDown50]: "ability_warrior_savageblow",
  [WarcraftRaidDebuff.HealingReceivedDown25]: "ability_warrior_savageblow",
  [WarcraftRaidDebuff.PhysicalDamageDealt]: "ability_warrior_warcry",
  [WarcraftRaidDebuff.CastSpeed]: "spell_shadow_curseoftounges",
  [WarcraftRaidDebuff.CastSpeed30]: "spell_nature_nullifydisease",
  [WarcraftRaidDebuff.AttackPowerDown]: "ability_warrior_warcry",
  [WarcraftRaidDebuff.ArmorDown20]: "ability_warrior_riposte",
  [WarcraftRaidDebuff.ArmorDown5]: "spell_nature_faeriefire",
  [WarcraftRaidDebuff.SpellHit]: "spell_shadow_misery",
  [WarcraftRaidDebuff.CritChanceReceived]: "ability_creature_poison_06",
  [WarcraftRaidDebuff.PhysicalHitDown]: "ability_hunter_criticalshot",

  [WarcraftRaidDebuff.PhysicalDamageDealtDown10]: "ability_druid_demoralizingroar",
  [WarcraftRaidDebuff.PhysicalDamageTakenUp4]: "ability_warrior_colossussmash",
  [WarcraftRaidDebuff.ArmorDown12]: "ability_warrior_sunder",
  [WarcraftRaidDebuff.SpellDamageTaken5]: "warlock_curse_shadow",
  [WarcraftRaidDebuff.HealingReduction25]: "ability_criticalstrike",
  [WarcraftRaidDebuff.CastSpeedReduction30]: "spell_nature_nullifydisease"
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
  [WarcraftRaidUtility.UnholyFrenzy]: "spell_shadow_unholyfrenzy",
  [WarcraftRaidUtility.FocusMagic]: "spell_arcane_studentofmagic",
  [WarcraftRaidUtility.DivineGuardian]: "spell_holy_powerwordbarrier",
  [WarcraftRaidUtility.DamageReduction10]: "spell_holy_layonhands",
  [WarcraftRaidUtility.DamageReduction3]: "spell_holy_greaterblessingofsanctuary",
  [WarcraftRaidUtility.DarkIntent]: "spell_warlock_focusshadow",

  [WarcraftRaidUtility.Stun]: "spell_frost_stun",
  [WarcraftRaidUtility.Incapacitate]: "spell_holy_prayerofhealing",
  [WarcraftRaidUtility.Fear]: "spell_shadow_possession",
  [WarcraftRaidUtility.Slow]: "spell_nature_slow",
  [WarcraftRaidUtility.Root]: "spell_nature_stranglevines",
  [WarcraftRaidUtility.RootAoE]: "spell_druid_massentanglement",
  [WarcraftRaidUtility.Knockback]: "ability_druid_typhoon",
  [WarcraftRaidUtility.Pull]: "ability_deathknight_aoedeathgrip",
  [WarcraftRaidUtility.DamageReduction]: "ability_warrior_safeguard",
  [WarcraftRaidUtility.Disorient]: "spell_shadow_mindsteal",
  [WarcraftRaidUtility.Silence]: "ability_priest_silence",
  [WarcraftRaidUtility.Disarm]: "ability_warrior_disarm",
  [WarcraftRaidUtility.SlowImmunity]: "ability_shaman_windwalktotem",
  [WarcraftRaidUtility.Interrupt]: "ability_kick",
  [WarcraftRaidUtility.Taunt]: "spell_nature_reincarnation",
  [WarcraftRaidUtility.Horror]: "spell_shadow_psychichorrors",
  [WarcraftRaidUtility.HealingReduction]: "rogue_nerve_strike",
  [WarcraftRaidUtility.IncreasedDamageTaken]: "ability_rogue_preyontheweak",
  [WarcraftRaidUtility.Immunity]: "ability_rogue_cheatdeath",
  [WarcraftRaidUtility.SpellReflect]: "ability_warrior_shieldreflection",
  [WarcraftRaidUtility.CritDamageUp20]: "warrior_skullbanner",
  [WarcraftRaidUtility.EnemyDamageDealtDown10]: "demoralizing_banner",

  [WarcraftRaidUtility.EnemyArmorDown20]: "ability_warrior_shatteringthrow",
  [WarcraftRaidUtility.AdditionalDamageDealt]: "ability_shaman_tranquilmindtotem",
  [WarcraftRaidUtility.ReducedMagicDamageTaken20]: "spell_holy_auramastery",
  [WarcraftRaidUtility.ReducedMagicDamageTaken40]: "spell_deathknight_antimagiczone",
  [WarcraftRaidUtility.ReducedDamageTaken25]: "spell_holy_powerwordbarrier",
  [WarcraftRaidUtility.ReducedDamageTaken20]: "ability_rogue_smoke",
  [WarcraftRaidUtility.ReducedDamageTaken10]: "spell_shaman_spiritlink",
  [WarcraftRaidUtility.IncreasedMaximumHealth20]: "ability_toughness",
  [WarcraftRaidUtility.IncreasedPhysicalHaste20]: "spell_shadow_unholyfrenzy",
  [WarcraftRaidUtility.IncreasedDamageDealt15]: "ability_rogue_tricksofthetrade",
  [WarcraftRaidUtility.Symbiosis]: "spell_druid_symbiosis"
};

export enum CustomIcon {
  GroupNeedMore = "inv_misc_groupneedmore",
  ICC = "achievement_zone_icecrown_01",
  RS = "spell_shadow_twilight",
  BWD = "achievement_boss_nefarion",
  BOT = "spell_fire_twilightcano",
  FOURWINDS = "achievement_boss_murmur",
  FL = "achievement_zone_firelands",
  DS = "achievment_boss_madnessofdeathwing",
  MV = "achievement_moguraid_06",
  HOF = "achievement_raid_mantidraid03",
  TOES = "achievement_raid_terraceofendlessspring04",
  TOT = "achievement_boss_leishen",
  SOO = "ability_garrosh_hellscreams_warsong",
  Vanquisher = "inv_helmet_24",
  Protector = "inv_helmet_24",
  Conqueror = "inv_helmet_24"
}

export enum RarityColors {
  POOR = "#9d9d9d",
  COMMON = "#ffffff",
  UNCOMMON = "#1eff00",
  RARE = "#0070dd",
  EPIC = "#a335ee",
  LEGENDARY = "#ff8000",
  ARTIFACT = "#e6cc80",
  HEIRLOOM = "#00ccff"
}
