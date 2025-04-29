import { WarcraftGameVersion } from "../RoleProvider/consts";

export const openWowheadLink = (id: string, type?: string, version?: string) => {
  return window.open(
    `https://www.wowhead.com/${WarcraftGameVersion[version]}/${type ?? "item"
    }=${id}/`,
    "_blank"
  );
};
