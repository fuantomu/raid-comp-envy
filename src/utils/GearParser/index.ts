import axios from "axios";
import { Affixes, BlizzardApiMedia, BlizzardEquippedItem, Enchant, EnchantSlots } from "../../types";

export abstract class GearParser {

  private static baseUrl = 'https://eu.api.blizzard.com/profile/wow/character/everlook/CHARACTERNAME/TYPE?namespace=profile-classic-eu&locale=en_US';

  private static slotNames = {
    "HEAD": 0,
    "NECK": 1,
    "SHOULDER": 2,
    "SHIRT": 3,
    "CHEST": 4,
    "WAIST": 5,
    "LEGS": 6,
    "FEET": 7,
    "WRIST": 8,
    "HANDS": 9,
    "FINGER_1": 10,
    "FINGER_2": 11,
    "TRINKET_1": 12,
    "TRINKET_2": 13,
    "BACK": 14,
    "MAIN_HAND": 15,
    "OFF_HAND": 16,
    "RANGED": 17,
    "TABARD": 18
  };

  private static affixStats = {
    2802: "AGILITY",
    2803: "STAMINA",
    2804: "INTELLECT",
    2805: "STRENGTH",
    2806: "SPIRIT",
    2815: "DODGE_RATING",
    2822: "CRIT_RATING",
    3726: "HASTE_RATING",
    3727: "HIT_RATING",
    4058: "EXPERTISE_RATING",
    4059: "MASTERY_RATING",
    4060: "PARRY_RATING"
  };

  private static ignore_enchant = [3, 18];
  private static token = null;

  public static async getEquipment(playerName: String, version: String) {
    const character: BlizzardEquippedItem[] = (await axios.get(this.baseUrl.replace("CHARACTERNAME", playerName.toLowerCase()).replace("TYPE", "equipment"), {
      headers: {
        "Authorization": `Bearer ${this.token}`
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.data.equipped_items
      }

    }).catch(() => {
      return false
    }))

    if (!character) {
      return false
    }

    const enchants: EnchantSlots = (await axios.get("https://raw.githubusercontent.com/fuantomu/envy-armory/main/enchants.json")).data
    const affixes: Affixes = (await axios.get("https://raw.githubusercontent.com/fuantomu/envy-armory/main/affix.json")).data
    const sortedEquipment = {
      "HEAD": null,
      "NECK": null,
      "SHOULDER": null,
      "SHIRT": null,
      "CHEST": null,
      "WAIST": null,
      "LEGS": null,
      "FEET": null,
      "WRIST": null,
      "HANDS": null,
      "FINGER_1": null,
      "FINGER_2": null,
      "TRINKET_1": null,
      "TRINKET_2": null,
      "BACK": null,
      "MAIN_HAND": null,
      "OFF_HAND": null,
      "RANGED": null,
      "TABARD": null
    }

    for (const item of character) {
      item["link"] = "";

      if (!this.ignore_enchant.includes(this.slotNames[item["slot"]["type"]])) {
        if (item.enchantments) {

          if (item.enchantments[0].enchantment_slot.id === 0) {
            item["link"] += "&ench="
          }

          const filtered_enchants: Enchant[] = enchants[String(this.slotNames[item.slot.type])].filter((enchant) =>
            item.enchantments.some((itemEnchant) => enchant.id === itemEnchant.enchantment_id) ||
            item.enchantments.some((entry) => entry.enchantment_id === 3729)
          );

          item["enchants"] = filtered_enchants;
          if (filtered_enchants.length > 0) {
            item["link"] += filtered_enchants.map((enchant) => enchant.id).join(":")
          }

          if (item.enchantments.length > 0) {
            const filtered_enchantments = item.enchantments.filter((entry) => [2, 3, 4].includes(entry.enchantment_slot.id))
            item["gems"] = filtered_enchantments.map((entry) => {
              return { id: entry.source_item.id }
            })

            if (filtered_enchantments.length > 0) {
              item["link"] += "&gems="
            }

            filtered_enchantments.map((entry, idx) => {
              item["link"] += entry.source_item.id

              if (idx !== filtered_enchantments.length - 1) {
                item["link"] += ":"
              }
              return true;
            })

            if (item.inventory_type.type.includes("WEAPON")) {
              item.inventory_type.type = "WEAPON"
            }


            if (affixes[item.inventory_type.type]) {

              var temp_affix = []

              if (affixes[item.inventory_type.type].P1.ids.includes(item.item.id)) {
                temp_affix = affixes[item.inventory_type.type].P1["affix"]
              }

              if (temp_affix.length > 0) {
                const found_affix = temp_affix;
                const filtered_affix = item.enchantments.filter((entry) => [8, 9, 10, 11].includes(entry.enchantment_slot.id))

                if (filtered_affix.length > 0) {
                  item["link"] += '&rand='
                }

                const affixNames = filtered_affix.map((entry) => this.affixStats[entry.enchantment_id])
                found_affix.map((entry) => {
                  if (affixNames.every((affixName) => found_affix[entry]["stats"].includes(affixName))) {
                    item["link"] += entry
                    return true;
                  }
                  return true
                })
              }
            }

          }
        }
        if (item.set) {
          item["link"] += "&pcs="
          item["link"] += character.map((entry) => entry.item.id).join(":")
        }

        if (item["link"].length > 0) {
          item["link"] = item["link"].substring(1)
        }
      }

      const itemMedia = (await axios.get(item.media.key.href, {
        headers: {
          "Authorization": `Bearer ${this.token}`
        }
      }).catch(() => {
        return {
          data: {
            _links: {
              self: {
                href: ""
              }
            },
            assets: [
              {
                value: "inv_misc_questionmark.jpg",
                key: "",
                file_data_id: ""
              }
            ]
          }
        }
      })).data as BlizzardApiMedia

      const iconStrings = itemMedia.assets[0].value.split("/")
      item.icon = iconStrings[iconStrings.length - 1].substring(0, iconStrings[iconStrings.length - 1].length - 4)
      sortedEquipment[item.slot.type] = item;
    }
    return sortedEquipment
  }

  public static async getToken(token: String = null) {
    if (!token) {
      const url = "https://eu.battle.net/oauth/token"
      const result = await axios.post(url, null, {
        params: { grant_type: 'client_credentials' },
        auth: {
          username: process.env.REACT_APP_CLIENT_ID,
          password: process.env.REACT_APP_CLIENT_SECRET,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      token = result.data.access_token

    }
    this.token = token
  }

}
