import { WarcraftPlayerClass, WarcraftPlayerSpec } from "../consts";

interface SpecCharacter extends Partial<Record<WarcraftPlayerSpec | WarcraftPlayerClass, string>> {}
export enum RaidTeam {
  BF = "Blind Ferrets",
  HC = "Headless Chickens",
}

export const DiscordWarcraftCharacter: {
  [discordId: string]: SpecCharacter;
} = {
  // BF
  "313680319985352705": { [WarcraftPlayerSpec.DruidGuardian]: "Sephmeow" },
  "277748456959901709": { [WarcraftPlayerSpec.PaladinProtection]: "Vicpal" },
  "282993310140727296": { [WarcraftPlayerSpec.PriestShadow]: "Ameliorate" },
  "477835560866807818": { [WarcraftPlayerClass.Mage]: "Ouzanzi" },
  "176014611479396352": { [WarcraftPlayerClass.Mage]: "Chhe" },
  "348926197389983744": { [WarcraftPlayerClass.Warlock]: "Blacklíly" },
  "191292666770751488": { [WarcraftPlayerClass.Hunter]: "Tryxiz" },
  "295558835941277696": { [WarcraftPlayerSpec.PriestShadow]: "Minislyn" },
  "232861289234432001": { [WarcraftPlayerSpec.PriestShadow]: "Priska" },
  "230275166121230336": { [WarcraftPlayerSpec.DemonHunterHavoc]: "Betræyer" },
  "162565655839768577": { [WarcraftPlayerClass.Rogue]: "Minirax" },
  "218372462604320771": { [WarcraftPlayerSpec.DeathKnightUnholy]: "Eyotadk" },
  "156530362862927880": { [WarcraftPlayerSpec.DeathKnightUnholy]: "Nepotisme" },
  "194803998451040256": {
    [WarcraftPlayerSpec.WarriorArms]: "Freyjr",
    [WarcraftPlayerSpec.WarriorFury]: "Freyjr",
  },
  "230017946070548481": { [WarcraftPlayerSpec.MonkWindwalker]: "Chullee" },
  "292694154750853130": { [WarcraftPlayerSpec.PaladinHoly]: "Angélinaholy" },
  "118025159394197509": { [WarcraftPlayerSpec.ShamanRestoration]: "Alfrothir" },
  "95405560911892480": { [WarcraftPlayerSpec.DruidRestoration]: "Shiftmypantz" },
  "243120086125117440": { [WarcraftPlayerSpec.PriestHoly]: "Myxo" },

  // HC
  "329979216496033793": { [WarcraftPlayerSpec.WarriorProtection]: "Pigor" },
  "213425609148203009": { [WarcraftPlayerSpec.MonkBrewmaster]: "Badumtis" },
  "238347272990097408": { [WarcraftPlayerSpec.ShamanElemental]: "Nanthos" },
  "224947299220979712": { [WarcraftPlayerClass.Hunter]: "Miechhunt" },
  "347086017473413120": { [WarcraftPlayerClass.Hunter]: "Mudomon" },
  "291232300803424256": { [WarcraftPlayerSpec.PriestShadow]: "Vesely" },
  "223522935766384640": { [WarcraftPlayerClass.Warlock]: "Gunnaer" },
  "244161604449468426": { [WarcraftPlayerClass.Hunter]: "Hrutkata" },
  "460156493644169217": { [WarcraftPlayerClass.Hunter]: "Loneah" },
  "118382744274206726": { [WarcraftPlayerSpec.PriestShadow]: "Ariseth" },
  "136555781809111041": { [WarcraftPlayerClass.Hunter]: "Linkidudie" },
  "356492216174116866": { [WarcraftPlayerSpec.PaladinRetribution]: "Makedonass" },
  "219129629221453825": {
    [WarcraftPlayerSpec.ShamanEnhancement]: "Cultmaster",
    [WarcraftPlayerSpec.ShamanElemental]: "Cultmaster",
  },
  "219835592983314432": { [WarcraftPlayerSpec.PaladinRetribution]: "Christene" },
  "183674051615653888": {
    [WarcraftPlayerSpec.WarriorArms]: "Aemiliuss",
    [WarcraftPlayerSpec.WarriorFury]: "Aemiliuss",
  },
  "220318467125936138": {
    [WarcraftPlayerSpec.DeathKnightFrost]: "Sindraen",
    [WarcraftPlayerSpec.DeathKnightUnholy]: "Sindraen",
  },
  "188341550764392458": { [WarcraftPlayerSpec.PriestHoly]: "Albionna" },
  "352128691184336900": { [WarcraftPlayerSpec.DruidRestoration]: "Luleradhiqe" },
  "494230541491765248": { [WarcraftPlayerSpec.ShamanRestoration]: "Hijena" },
  "143857688210702336": {
    [WarcraftPlayerSpec.PriestHoly]: "Egoistas",
    [WarcraftPlayerSpec.PriestDiscipline]: "Egoistas",
  },
  "237279954448941056": { [WarcraftPlayerSpec.ShamanRestoration]: "Vortiginous" },
};

export const DiscordWarcraftCharacterTeam: {
  [discordId: string]: RaidTeam;
} = {
  // BF
  "313680319985352705": RaidTeam.BF,
  "277748456959901709": RaidTeam.BF,
  "282993310140727296": RaidTeam.BF,
  "477835560866807818": RaidTeam.BF,
  "176014611479396352": RaidTeam.BF,
  "348926197389983744": RaidTeam.BF,
  "191292666770751488": RaidTeam.BF,
  "295558835941277696": RaidTeam.BF,
  "232861289234432001": RaidTeam.BF,
  "230275166121230336": RaidTeam.BF,
  "162565655839768577": RaidTeam.BF,
  "218372462604320771": RaidTeam.BF,
  "156530362862927880": RaidTeam.BF,
  "194803998451040256": RaidTeam.BF,
  "230017946070548481": RaidTeam.BF,
  "292694154750853130": RaidTeam.BF,
  "118025159394197509": RaidTeam.BF,
  "95405560911892480": RaidTeam.BF,
  "243120086125117440": RaidTeam.BF,

  // HC
  "329979216496033793": RaidTeam.HC,
  "213425609148203009": RaidTeam.HC,
  "238347272990097408": RaidTeam.HC,
  "224947299220979712": RaidTeam.HC,
  "347086017473413120": RaidTeam.HC,
  "291232300803424256": RaidTeam.HC,
  "223522935766384640": RaidTeam.HC,
  "244161604449468426": RaidTeam.HC,
  "460156493644169217": RaidTeam.HC,
  "118382744274206726": RaidTeam.HC,
  "136555781809111041": RaidTeam.HC,
  "356492216174116866": RaidTeam.HC,
  "219129629221453825": RaidTeam.HC,
  "219835592983314432": RaidTeam.HC,
  "183674051615653888": RaidTeam.HC,
  "220318467125936138": RaidTeam.HC,
  "188341550764392458": RaidTeam.HC,
  "352128691184336900": RaidTeam.HC,
  "494230541491765248": RaidTeam.HC,
  "143857688210702336": RaidTeam.HC,
  "237279954448941056": RaidTeam.HC,
};
