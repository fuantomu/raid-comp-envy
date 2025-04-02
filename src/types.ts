import {
  InviteStatus,
  WarcraftPlayerClass,
  WarcraftPlayerRace,
  WarcraftPlayerRole,
  WarcraftPlayerSpec
} from "./consts";
import { WarcraftRole } from "./utils/RoleProvider/consts";

export type AppErrorData = {
  action?: string;
  message: string;
  name: string;
  onRetry: () => void;
};

export type BuildId = string;
export type GroupId = 1 | 2 | 3 | 4 | 5 | "roster" | "bench";

export type BuildPlayer = {
  id: string;
  name: string;
  class_name: WarcraftPlayerClass;
  spec: WarcraftPlayerSpec;
  race: WarcraftPlayerRace;
  role?: WarcraftPlayerRole;
  swap?: WarcraftPlayerSpec;
  raid: string;
  status: InviteStatus;
  group_id?: GroupId;
  main?: string;
  alt?: string;
};

export type BuildPlayerResponse = {
  players: BuildPlayer[];
};

export type Build = {
  id: string;
  name: string;
  date: number;
  players: BuildPlayer[];
  raid_id?: number;
  instance?: string;
  build_id: number;
};

export type BuildResponse = {
  id: string;
  name: string;
  date: number;
  players: string;
  raid_id?: string;
  instance?: string;
};

export type BuildGroup = {
  group_id: GroupId;
  players: BuildPlayer[];
};

export type BuildGroups = {
  [group_id in GroupId]?: BuildGroup;
};

export type BuildRoles = {
  [role in WarcraftRole]: BuildPlayer[];
};

export type SelectOption = {
  value: string;
  label: string;
  date?: number;
};

export type AbsenceResponse = {
  id: string;
  player_id: string;
  start_date: number;
  end_date: number;
  reason?: string;
  uid: string;
};

export type Absence = {
  id: string;
  player: BuildPlayer;
  start_date: number;
  end_date: number;
  reason?: string;
  uid: string;
};

export type Login = {
  created_date: number;
  role: number;
  username: string;
};

export type UpdateResponse = {
  builds: BuildResponse[];
  players: BuildPlayer[];
  absences: AbsenceResponse[];
};

export type Update = {
  builds: Build[];
  players: BuildPlayer[];
  absences: Absence[];
};

export type WebSocketMessage = {
  socketId: string;
  message_type: string;
  data: PlayerData | BuildData | AbsenceData | string;
  date: number;
  id?: string;
  account_name: string;
  version?: string;
};

export type PlayerData = {
  player: BuildPlayer;
  build_id?: string;
  oldData?: BuildPlayer;
};

export type BuildData = {
  build: Build;
  oldData?: Build;
};

export type AbsenceData = {
  start_date: number;
  end_date: number;
  player_id: string;
  reason: string;
};

export type Message = {
  type: string;
  from: string;
  date: number;
  changes: Difference[];
  buildId?: string;
  version?: string;
};

export type Difference = {
  key: string;
  objectType: string;
  objectName?: string;
  propertyType: string;
  propertyName: string;
  old?: any;
  new: any;
};

export type MessageData = {
  socketId: string;
  message_type: string;
  data: any;
  account_name: string;
  date: number;
  version: string;
};

export type LoggedInUser = {
  host: string;
  username: string;
};

export type DiscordMessage = {
  messageId: string;
  buildId: string;
  note?: string;
};

export type DiscordMessageResponse = {
  messageId: string;
  buildId: string;
  note?: string;
};

export type LootHistoryResponse = {
  history: Item[];
};

export type Item = {
  di: string;
  player: string;
  date: string;
  time: string;
  id: string;
  item: string;
  itemid: string;
  itemstring?: string;
  response: string;
  votes?: string;
  class_: string;
  instance: string;
  boss: string;
  difficultyid: string;
  mapid: string;
  groupsize: string;
  gear1?: string;
  gear2?: string;
  responseid: string;
  isawardreason: string;
  subtype: string;
  equiploc: string;
  note?: string;
  owner: string;
  timestamp?: Date;
};

export type BlizzardApiItem = {
  key: {
    href: string
  },
  id: number
  name?: string,
  is_equipped?: boolean
}

export type BlizzardApiType = {
  type: string,
  name: string
}

export type BlizzardApiStats = {
  value: number,
  display: {
    display_string: string,
    color: {
      r: number,
      g: number,
      b: number,
      a: 1
    }
  },
  type?: BlizzardApiType,
  is_equip_bonus?: boolean,
}

export type BlizzardApiEnchantment = {
  display_string: string,
  source_item: BlizzardApiItem,
  enchantment_id?: number,
  enchantment_slot?: {
    id: number,
    type?: string
  }
}

export type BlizzardEquippedItem = {
  item: BlizzardApiItem,
  enchantments: BlizzardApiEnchantment[],
  slot: BlizzardApiType,
  quantity: number,
  quality: BlizzardApiType,
  name: string,
  media: BlizzardApiItem,
  item_class: BlizzardApiItem,
  item_subclass: BlizzardApiItem,
  inventory_type: BlizzardApiType,
  binding: BlizzardApiType,
  armor: BlizzardApiStats,
  stats: BlizzardApiStats
  sell_price: {
    value: number,
    display_strings: {
      header: string,
      gold: string,
      silver: string,
      copper: string
    }
  },
  requirements: {
    level: {
      value: number,
      display_string: string
    },
    playable_classes: {
      links: BlizzardApiItem[],
      display_string: string
    }
  },
  set: {
    item_set: BlizzardApiItem,
    items: BlizzardApiItem[],
    effects: {
      display_string: string,
      required_count: number,
      is_active: boolean
    }[],
    display_string: string
  },
  transmog: {
    item: BlizzardApiItem,
    display_string: string,
    item_modified_appearance_id: number
  },
  durability: {
    value: number,
    display_string: string
  },
  limit_category?: string,
  spells?: {
    spell: BlizzardApiItem,
    description: string
  }[],
  is_subclass_hidden?: boolean,
  weapon: {
    damage: {
      min_value: number,
      max_value: number,
      display_string: string,
      damage_class: BlizzardApiType
    },
    attack_speed: {
      value: number,
      display_string: string,
    },
    dps: {
      value: number,
      display_string: string
    }
  },
  link?: string,
  gems?: any,
  icon?: string,
}

export type Enchant = {
  id: number,
  tier: number,
  name: string,
  itemid: number,
  role?: string,
  type?: string,
  stats: string,
  statsDE: string,
  version?: string
}

export type EnchantSlots = {
  0: Enchant[],
  1: Enchant[],
  2: Enchant[],
  3: Enchant[],
  4: Enchant[],
  5: Enchant[],
  6: Enchant[],
  7: Enchant[],
  8: Enchant[],
  9: Enchant[],
  10: Enchant[],
  11: Enchant[],
  12: Enchant[],
  13: Enchant[],
  14: Enchant[],
  15: Enchant[],
  16: Enchant[],
  17: Enchant[]
}

export type AffixPhase = {
  P1: {
    ids: number[],
    affix: {
      [key: string]: {
        name: string,
        stats: string[]
      }
    }
  }
}

export type Affixes = {
  WAIST: AffixPhase,
  WEAPON: AffixPhase,
  LEGS: AffixPhase,
  CLOAK: AffixPhase,
  FINGER: AffixPhase,
  NECK: AffixPhase
}

export type BlizzardApiMedia = {
  _links: {
    self: {
      href: string
    }
  },
  assets: {
    [key: number]: {
      key: string,
      value: string,
      file_data_id: number
    }
  },
  id: number
}
