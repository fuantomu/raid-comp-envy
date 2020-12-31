import { Errors } from "typescript-rest";
import { GroupId, InviteStatus, WarcraftPlayerClass, WarcraftPlayerSpec } from "../../src/consts";
import { BuildPlayer } from "../../src/types";

export abstract class PlayerUtil {
  public static sanitizePlayer(player: BuildPlayer): BuildPlayer {
    const { name, status, class: className, spec, group, realm } = player;
    if (
      !className ||
      !Object.values(WarcraftPlayerClass).includes(className as WarcraftPlayerClass)
    ) {
      throw new Errors.BadRequestError(`${className} not a valid WarcraftPlayerClass`);
    }
    if (spec && !Object.values(WarcraftPlayerSpec).includes(spec as WarcraftPlayerSpec)) {
      throw new Errors.BadRequestError(`${spec} not a valid WarcraftPlayerSpec`);
    }
    if (status && !Object.values(InviteStatus).includes(status as InviteStatus)) {
      throw new Errors.BadRequestError(`${status} not a valid InviteStatus`);
    }

    return {
      name: (name ?? "").substr(0, 30),
      class: className,
      spec,
      status: status ?? InviteStatus.Unknown,
      group: !(group in GroupId) ? GroupId.NONE : group,
      realm: (realm ?? "").substr(0, 30),
    };
  }

  public static splitFullName(
    fullName: string
  ): {
    name: string;
    realm: string;
  } {
    return (fullName ?? "").match(/^(?<name>.*?)(?:-(?<realm>\w.*))?$/)?.groups as {
      name: string;
      realm: string;
    };
  }
}
