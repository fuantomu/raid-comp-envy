import { WarcraftPlayerClass } from "../consts";

export enum WowAuditPlayerClass {
  DeathKnight = "Death Knight",
  DemonHunter = "Demon Hunter",
  Druid = "Druid",
  Evoker = "Evoker",
  Hunter = "Hunter",
  Mage = "Mage",
  Monk = "Monk",
  Paladin = "Paladin",
  Priest = "Priest",
  Rogue = "Rogue",
  Shaman = "Shaman",
  Warlock = "Warlock",
  Warrior = "Warrior",
}

export const WowAuditClassMap: {
  [waClass in WowAuditPlayerClass]: WarcraftPlayerClass;
} = {
  [WowAuditPlayerClass.DeathKnight]: WarcraftPlayerClass.DeathKnight,
  [WowAuditPlayerClass.DemonHunter]: WarcraftPlayerClass.DemonHunter,
  Druid: WarcraftPlayerClass.Druid,
  Evoker: WarcraftPlayerClass.Evoker,
  Hunter: WarcraftPlayerClass.Hunter,
  Mage: WarcraftPlayerClass.Mage,
  Monk: WarcraftPlayerClass.Monk,
  Paladin: WarcraftPlayerClass.Paladin,
  Priest: WarcraftPlayerClass.Priest,
  Rogue: WarcraftPlayerClass.Rogue,
  Shaman: WarcraftPlayerClass.Shaman,
  Warlock: WarcraftPlayerClass.Warlock,
  Warrior: WarcraftPlayerClass.Warrior,
};
