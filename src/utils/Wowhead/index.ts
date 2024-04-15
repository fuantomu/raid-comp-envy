export const openWowheadLink = (id: string, type?: string, version?: string) => {
  return window.open(
    `https://www.wowhead.com/${version === "cataclysm" ? "cata" : version ?? "wotlk"}/${
      type ?? "string"
    }=${id}/`,
    "_blank"
  );
};
