import { WarcraftPlayerClass, WarcraftPlayerSpec } from "../../consts";

export type WarcraftIcon = string;

export const WarcraftClassIcon: {
  [playerClass in WarcraftPlayerClass]: WarcraftIcon;
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
  [WarcraftPlayerSpec.HunterBeast]: "ability_hunter_bestialdiscipline",
  [WarcraftPlayerSpec.HunterMarksmanship]: "ability_hunter_focusedaim",
  [WarcraftPlayerSpec.HunterSurvival]: "ability_hunter_camouflage",
  [WarcraftPlayerSpec.MageArcane]: "spell_holy_magicalsentry",
  [WarcraftPlayerSpec.MageFire]: "spell_fire_firebolt02",
  [WarcraftPlayerSpec.MageFrost]: "spell_frost_frostbolt02",
  [WarcraftPlayerSpec.MonkBrewmaster]: "spell_monk_brewmaster_spec",
  [WarcraftPlayerSpec.MonkMistweaver]: "spell_monk_mistweaver_spec",
  [WarcraftPlayerSpec.MonkWindwalker]: "spell_monk_windwalker_spec",
  [WarcraftPlayerSpec.PaladinDiscipline]: "spell_holy_powerwordshield",
  [WarcraftPlayerSpec.PaladinHoly]: "spell_holy_guardianspirit",
  [WarcraftPlayerSpec.PaladinShadow]: "spell_shadow_shadowwordpain",
  [WarcraftPlayerSpec.PriestHoly]: "spell_holy_holybolt",
  [WarcraftPlayerSpec.PriestProtection]: "ability_paladin_shieldofthetemplar",
  [WarcraftPlayerSpec.PriestRetribution]: "spell_holy_auraoflight",
  [WarcraftPlayerSpec.RogueAssassination]: "ability_rogue_deadlybrew",
  [WarcraftPlayerSpec.RogueOutlaw]: "inv_sword_30",
  [WarcraftPlayerSpec.RogueSubtlety]: "ability_stealth",
  [WarcraftPlayerSpec.ShamanAffliction]: "spell_shadow_deathcoil",
  [WarcraftPlayerSpec.ShamanDemonology]: "spell_shadow_metamorphosis",
  [WarcraftPlayerSpec.ShamanDestruction]: "spell_shadow_rainoffire",
  [WarcraftPlayerSpec.WarlockElemental]: "spell_nature_lightning",
  [WarcraftPlayerSpec.WarlockEnhancement]: "spell_shaman_improvedstormstrike",
  [WarcraftPlayerSpec.WarlockRestoration]: "spell_nature_magicimmunity",
  [WarcraftPlayerSpec.WarriorArms]: "ability_warrior_savageblow",
  [WarcraftPlayerSpec.WarriorFury]: "ability_warrior_innerrage",
  [WarcraftPlayerSpec.WarriorProtection]: "ability_warrior_defensivestance",
};

export enum WarcraftIconSize {
  SMALL = 18,
  MEDIUM = 36,
  LARGE = 56,
}
