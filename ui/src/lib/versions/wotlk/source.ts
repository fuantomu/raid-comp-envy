import type { GameVersionSource } from "$lib/versioning/GameVersionSource";
import { PlayerRole, UNKNOWN_CLASS, UNKNOWN_SPEC } from "$lib/consts";

const ICON_QUESTIONMARK = "inv_misc_questionmark";

export const versionSource: GameVersionSource = {
  buffs: [
    { slug: "Intellect", icon: "spell_holy_magicalsentry" }
  ],
  utilities: [
    { slug: "Bloodlust", icon: "spell_nature_bloodlust" }
  ],
  classes: [
    {
      slug: "DeathKnight",
      icon: "classicon_deathknight",
      utilities: ["AntiMagicZone", "CombatResurrection"]
    },
    { slug: UNKNOWN_CLASS, icon: ICON_QUESTIONMARK }
  ],
  specs: [
    {
      slug: "DeathKnightBlood",
      icon: "spell_deathknight_bloodpresence",
      class: "DeathKnight",
      role: PlayerRole.Tank
    },
    {
      slug: "DeathKnightFrost",
      icon: "spell_deathknight_frostpresence",
      class: "DeathKnight",
      role: PlayerRole.MeleeDPS
    },
    {
      slug: "DeathKnightUnholy",
      icon: "spell_deathknight_unholypresence",
      class: "DeathKnight",
      role: PlayerRole.MeleeDPS
    },
    { slug: UNKNOWN_SPEC, icon: ICON_QUESTIONMARK, class: UNKNOWN_CLASS, role: PlayerRole.Unknown }
  ]
};
