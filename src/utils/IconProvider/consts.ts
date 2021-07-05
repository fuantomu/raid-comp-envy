import { WarcraftPlayerClass, WarcraftPlayerSpec } from "../../consts";
import { WarcraftRaidBuff, WarcraftRaidUtility, WarcraftRole } from "../RoleProvider/consts";

export type WarcraftIcon = string;

export enum WarcraftIconSize {
  SMALL = 18,
  MEDIUM = 36,
  LARGE = 56,
}

export const IconUnknown: WarcraftIcon = "inv_misc_questionmark";

export const WarcraftClassIcon: {
  [className in WarcraftPlayerClass]: WarcraftIcon;
} = {
  [WarcraftPlayerClass.DeathKnight]: "classicon_deathknight",
  [WarcraftPlayerClass.DemonHunter]: "classicon_demonhunter",
  [WarcraftPlayerClass.Druid]: "classicon_druid",
  [WarcraftPlayerClass.Hunter]: "classicon_hunter",
  [WarcraftPlayerClass.Mage]: "classicon_mage",
  [WarcraftPlayerClass.Monk]: "classicon_monk",
  [WarcraftPlayerClass.Paladin]: "classicon_paladin",
  [WarcraftPlayerClass.Priest]: "classicon_priest",
  [WarcraftPlayerClass.Rogue]: "classicon_rogue",
  [WarcraftPlayerClass.Shaman]: "classicon_shaman",
  [WarcraftPlayerClass.Warlock]: "classicon_warlock",
  [WarcraftPlayerClass.Warrior]: "classicon_warrior",
  [WarcraftPlayerClass.Unknown]: IconUnknown,
};

export const WarcraftSpecIcon: {
  [playerSpec in WarcraftPlayerSpec]: WarcraftIcon;
} = {
  [WarcraftPlayerSpec.DeathKnightBlood]: "spell_deathknight_bloodpresence",
  [WarcraftPlayerSpec.DeathKnightFrost]: "spell_deathknight_frostpresence",
  [WarcraftPlayerSpec.DeathKnightUnholy]: "spell_deathknight_unholypresence",
  [WarcraftPlayerSpec.DemonHunterHavoc]: "ability_demonhunter_specdps",
  [WarcraftPlayerSpec.DemonHunterVengeance]: "ability_demonhunter_spectank",
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
  [WarcraftPlayerSpec.MonkBrewmaster]: "spell_monk_brewmaster_spec",
  [WarcraftPlayerSpec.MonkMistweaver]: "spell_monk_mistweaver_spec",
  [WarcraftPlayerSpec.MonkWindwalker]: "spell_monk_windwalker_spec",
  [WarcraftPlayerSpec.PriestDiscipline]: "spell_holy_powerwordshield",
  [WarcraftPlayerSpec.PriestHoly]: "spell_holy_guardianspirit",
  [WarcraftPlayerSpec.PriestShadow]: "spell_shadow_shadowwordpain",
  [WarcraftPlayerSpec.PaladinHoly]: "spell_holy_holybolt",
  [WarcraftPlayerSpec.PaladinProtection]: "ability_paladin_shieldofthetemplar",
  [WarcraftPlayerSpec.PaladinRetribution]: "spell_holy_auraoflight",
  [WarcraftPlayerSpec.RogueAssassination]: "ability_rogue_deadlybrew",
  [WarcraftPlayerSpec.RogueOutlaw]: "inv_sword_30",
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
  [WarcraftPlayerSpec.Unknown]: IconUnknown,
};

export const WarcraftRoleIcon: {
  [className in WarcraftRole]: WarcraftIcon;
} = {
  [WarcraftRole.Unknown]: IconUnknown,
  [WarcraftRole.Tank]: "inv_shield_04",
  [WarcraftRole.Healer]: "spell_nature_protectionformnature",
  [WarcraftRole.RangedDPS]: "inv_ammo_arrow_01",
  [WarcraftRole.MeleeDPS]: "ability_ghoulfrenzy",
};

export const WarcraftBuffIcon: {
  [buff in WarcraftRaidBuff]: WarcraftIcon;
} = {
  [WarcraftRaidBuff.Intellect]: "spell_holy_magicalsentry",
  [WarcraftRaidBuff.AttackPower]: "ability_warrior_battleshout",
  [WarcraftRaidBuff.Stamina]: "spell_holy_wordfortitude",
  [WarcraftRaidBuff.MovementSpeed]: "spell_druid_stampedingroar_cat",
  [WarcraftRaidBuff.PhysicalDamage]: "ability_monk_sparring",
  [WarcraftRaidBuff.MagicDamage]: "ability_demonhunter_empowerwards",
  [WarcraftRaidBuff.DamageReduction]: "spell_holy_devotionaura",
};

export const WarcraftUtilityIcon: {
  [buff in WarcraftRaidUtility]: WarcraftIcon;
} = {
  [WarcraftRaidUtility.Bloodlust]: "spell_nature_bloodlust",
  [WarcraftRaidUtility.CombatResurrection]: "spell_nature_reincarnation",
  [WarcraftRaidUtility.MovementSpeed]: "spell_druid_stampedingroar_cat",
  [WarcraftRaidUtility.Healthstone]: "warlock_healthstone",
  [WarcraftRaidUtility.Gateway]: "spell_warlock_demonicportal_green",
  [WarcraftRaidUtility.Innervate]: "spell_nature_lightning",
  [WarcraftRaidUtility.AntiMagicZone]: "spell_deathknight_antimagiczone",
  [WarcraftRaidUtility.BlessingOfProtection]: "spell_holy_sealofprotection",
  [WarcraftRaidUtility.RallyingCry]: "ability_warrior_rallyingcry",
  [WarcraftRaidUtility.Darkness]: "ability_demonhunter_darkness",
};

export enum CustomIcon {
  GroupNeedMore = "inv_misc_groupneedmore",
}
