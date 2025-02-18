export const openWowheadLink = (id: string, type?: string, version?: string) => {
  return window.open(
    `https://www.wowhead.com/${version === "cataclysm" ? "cata" : version ?? "cata"}/${
      type ?? "string"
    }=${id}/`,
    "_blank"
  );
};
