import type { GameVersionSource } from '$lib/versioning/GameVersionSource';
import { PlayerRole, UNKNOWN_CLASS, UNKNOWN_SPEC } from '$lib/consts';

const ICON_QUESTIONMARK = 'inv_misc_questionmark';

export const versionSource: GameVersionSource = {
	buffs: [
		{ slug: 'Intellect', icon: 'spell_holy_magicalsentry' },
		{ slug: 'AttackPower', icon: 'ability_warrior_battleshout' },
		{ slug: 'Stamina', icon: 'spell_holy_wordfortitude' },
		{ slug: 'Versatility', icon: 'spell_nature_regeneration' },
		{ slug: 'MovementSpeed', icon: 'spell_druid_stampedingroar_cat' },
		{ slug: 'PhysicalDamage', icon: 'ability_monk_sparring' },
		{ slug: 'MagicDamage', icon: 'ability_demonhunter_empowerwards' },
		{ slug: 'DamageReduction', icon: 'spell_holy_devotionaura' },
	],
	utilities: [
		{ slug: 'Bloodlust', icon: 'spell_nature_bloodlust' },
		{ slug: 'CombatResurrection', icon: 'spell_nature_reincarnation' },
		{ slug: 'MovementSpeed', icon: 'spell_druid_stampedingroar_cat' },
		{ slug: 'Healthstone', icon: 'warlock_healthstone' },
		{ slug: 'Gateway', icon: 'spell_warlock_demonicportal_green' },
		{ slug: 'Innervate', icon: 'spell_nature_lightning' },
		{ slug: 'AntiMagicZone', icon: 'spell_deathknight_antimagiczone' },
		{ slug: 'BlessingOfProtection', icon: 'spell_holy_sealofprotection' },
		{ slug: 'RallyingCry', icon: 'ability_warrior_rallyingcry' },
		{ slug: 'Darkness', icon: 'ability_demonhunter_darkness' },
	],
	classes: [
		{
			slug: 'DeathKnight',
			icon: 'classicon_deathknight',
			utilities: ['AntiMagicZone', 'CombatResurrection'],
		},
		{
			slug: 'DemonHunter',
			icon: 'classicon_demonhunter',
			buffs: ['MagicDamage'],
		},
		{
			slug: 'Druid',
			icon: 'classicon_druid',
			buffs: ['Versatility'],
			utilities: ['MovementSpeed', 'CombatResurrection'],
		},
		{ slug: 'Evoker', icon: 'classicon_evoker', utilities: ['Bloodlust', 'MovementSpeed'] },
		{ slug: 'Hunter', icon: 'classicon_hunter', utilities: ['Bloodlust'] },
		{ slug: 'Mage', icon: 'classicon_mage', buffs: ['Intellect'], utilities: ['Bloodlust'] },
		{ slug: 'Monk', icon: 'classicon_monk', buffs: ['PhysicalDamage'] },
		{
			slug: 'Paladin',
			icon: 'classicon_paladin',
			buffs: ['DamageReduction'],
			utilities: ['BlessingOfProtection', 'CombatResurrection'],
		},
		{ slug: 'Priest', icon: 'classicon_priest', buffs: ['Stamina'] },
		{ slug: 'Rogue', icon: 'classicon_rogue' },
		{ slug: 'Shaman', icon: 'classicon_shaman', utilities: ['Bloodlust', 'MovementSpeed'] },
		{
			slug: 'Warlock',
			icon: 'classicon_warlock',
			utilities: ['CombatResurrection', 'Healthstone', 'Gateway'],
		},
		{
			slug: 'Warrior',
			icon: 'classicon_warrior',
			buffs: ['AttackPower'],
			utilities: ['RallyingCry'],
		},
		{ slug: UNKNOWN_CLASS, icon: ICON_QUESTIONMARK },
	],
	specs: [
		{
			slug: 'DeathKnightBlood',
			icon: 'spell_deathknight_bloodpresence',
			class: 'DeathKnight',
			role: PlayerRole.Tank,
		},
		{
			slug: 'DeathKnightFrost',
			icon: 'spell_deathknight_frostpresence',
			class: 'DeathKnight',
			role: PlayerRole.MeleeDPS,
		},
		{
			slug: 'DeathKnightUnholy',
			icon: 'spell_deathknight_unholypresence',
			class: 'DeathKnight',
			role: PlayerRole.MeleeDPS,
		},
		{
			slug: 'DemonHunterHavoc',
			icon: 'ability_demonhunter_specdps',
			class: 'DemonHunter',
			role: PlayerRole.MeleeDPS,
			utilities: ['Darkness'],
		},
		{
			slug: 'DemonHunterVengeance',
			icon: 'ability_demonhunter_spectank',
			class: 'DemonHunter',
			role: PlayerRole.Tank,
		},
		{
			slug: 'DruidBalance',
			icon: 'spell_nature_starfall',
			class: 'Druid',
			role: PlayerRole.RangedDPS,
		},
		{
			slug: 'DruidFeral',
			icon: 'ability_druid_catform',
			class: 'Druid',
			role: PlayerRole.MeleeDPS,
		},
		{
			slug: 'DruidGuardian',
			icon: 'ability_racial_bearform',
			class: 'Druid',
			role: PlayerRole.Tank,
			utilities: ['Innervate'],
		},
		{
			slug: 'DruidRestoration',
			icon: 'spell_nature_healingtouch',
			class: 'Druid',
			role: PlayerRole.Healer,
			utilities: ['Innervate'],
		},
		{
			slug: 'EvokerDevastation',
			icon: 'classicon_evoker_devastation',
			class: 'Evoker',
			role: PlayerRole.RangedDPS,
		},
		{
			slug: 'EvokerAugmentation',
			icon: 'classicon_evoker_augmentation',
			class: 'Evoker',
			role: PlayerRole.RangedDPS,
		},
		{
			slug: 'EvokerPreservation',
			icon: 'classicon_evoker_preservation',
			class: 'Evoker',
			role: PlayerRole.Healer,
		},
		{
			slug: 'HunterBeastmastery',
			icon: 'ability_hunter_bestialdiscipline',
			class: 'Hunter',
			role: PlayerRole.RangedDPS,
		},
		{
			slug: 'HunterMarksmanship',
			icon: 'ability_hunter_focusedaim',
			class: 'Hunter',
			role: PlayerRole.RangedDPS,
		},
		{
			slug: 'HunterSurvival',
			icon: 'ability_hunter_camouflage',
			class: 'Hunter',
			role: PlayerRole.MeleeDPS,
		},
		{
			slug: 'MageArcane',
			icon: 'spell_holy_magicalsentry',
			class: 'Mage',
			role: PlayerRole.RangedDPS,
		},
		{ slug: 'MageFire', icon: 'spell_fire_firebolt02', class: 'Mage', role: PlayerRole.RangedDPS },
		{
			slug: 'MageFrost',
			icon: 'spell_frost_frostbolt02',
			class: 'Mage',
			role: PlayerRole.RangedDPS,
		},
		{
			slug: 'MonkBrewmaster',
			icon: 'spell_monk_brewmaster_spec',
			class: 'Monk',
			role: PlayerRole.Tank,
		},
		{
			slug: 'MonkMistweaver',
			icon: 'spell_monk_mistweaver_spec',
			class: 'Monk',
			role: PlayerRole.Healer,
		},
		{
			slug: 'MonkWindwalker',
			icon: 'spell_monk_windwalker_spec',
			class: 'Monk',
			role: PlayerRole.MeleeDPS,
			buffs: ['MovementSpeed'],
		},
		{
			slug: 'PriestDiscipline',
			icon: 'spell_holy_powerwordshield',
			class: 'Priest',
			role: PlayerRole.Healer,
		},
		{
			slug: 'PriestHoly',
			icon: 'spell_holy_guardianspirit',
			class: 'Priest',
			role: PlayerRole.Healer,
		},
		{
			slug: 'PriestShadow',
			icon: 'spell_shadow_shadowwordpain',
			class: 'Priest',
			role: PlayerRole.RangedDPS,
		},
		{
			slug: 'PaladinHoly',
			icon: 'spell_holy_holybolt',
			class: 'Paladin',
			role: PlayerRole.Healer,
		},
		{
			slug: 'PaladinProtection',
			icon: 'ability_paladin_shieldofthetemplar',
			class: 'Paladin',
			role: PlayerRole.Tank,
		},
		{
			slug: 'PaladinRetribution',
			icon: 'spell_holy_auraoflight',
			class: 'Paladin',
			role: PlayerRole.MeleeDPS,
		},
		{
			slug: 'RogueAssassination',
			icon: 'ability_rogue_deadlybrew',
			class: 'Rogue',
			role: PlayerRole.MeleeDPS,
		},
		{
			slug: 'RogueOutlaw',
			icon: 'ability_rogue_waylay',
			class: 'Rogue',
			role: PlayerRole.MeleeDPS,
		},
		{ slug: 'RogueSubtlety', icon: 'ability_stealth', class: 'Rogue', role: PlayerRole.MeleeDPS },
		{
			slug: 'WarlockAffliction',
			icon: 'spell_shadow_deathcoil',
			class: 'Warlock',
			role: PlayerRole.RangedDPS,
		},
		{
			slug: 'WarlockDemonology',
			icon: 'spell_shadow_metamorphosis',
			class: 'Warlock',
			role: PlayerRole.RangedDPS,
		},
		{
			slug: 'WarlockDestruction',
			icon: 'spell_shadow_rainoffire',
			class: 'Warlock',
			role: PlayerRole.RangedDPS,
		},
		{
			slug: 'ShamanElemental',
			icon: 'spell_nature_lightning',
			class: 'Shaman',
			role: PlayerRole.RangedDPS,
		},
		{
			slug: 'ShamanEnhancement',
			icon: 'spell_shaman_improvedstormstrike',
			class: 'Shaman',
			role: PlayerRole.MeleeDPS,
		},
		{
			slug: 'ShamanRestoration',
			icon: 'spell_nature_magicimmunity',
			class: 'Shaman',
			role: PlayerRole.Healer,
		},
		{
			slug: 'WarriorArms',
			icon: 'ability_warrior_savageblow',
			class: 'Warrior',
			role: PlayerRole.MeleeDPS,
		},
		{
			slug: 'WarriorFury',
			icon: 'ability_warrior_innerrage',
			class: 'Warrior',
			role: PlayerRole.MeleeDPS,
		},
		{
			slug: 'WarriorProtection',
			icon: 'ability_warrior_defensivestance',
			class: 'Warrior',
			role: PlayerRole.Tank,
		},
		{ slug: UNKNOWN_SPEC, icon: ICON_QUESTIONMARK, class: UNKNOWN_CLASS, role: PlayerRole.Unknown },
	],
};
