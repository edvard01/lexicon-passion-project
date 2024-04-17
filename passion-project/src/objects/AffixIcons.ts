import afflictedIcon from "../assets/afflicted.jpg";
import bolsteringIcon from "../assets/bolstering.jpg";
import burstingIcon from "../assets/bursting.jpg";
import entanglingIcon from "../assets/entangling.jpg";
import fortifiedIcon from "../assets/fortified.jpg";
import incorporealIcon from "../assets/incorporeal.jpg";
import ragingIcon from "../assets/raging.jpg";
import sanguineIcon from "../assets/sanguine.jpg";
import spitefulIcon from "../assets/spiteful.jpg";
import stormingIcon from "../assets/storming.jpg";
import tyrannicalIcon from "../assets/tyrannical.jpg";
import volcanicIcon from "../assets/volcanic.jpg";

import allianceCrest from "../assets/alliance-crest.png";
import hordeCrest from "../assets/horde-crest.png";

type AffixKey = keyof typeof affixIcons;
type CrestKey = keyof typeof crestIcons;

export interface ICrestIcons {
  alliance: string;
  horde: string;
}

export const crestIcons = {
  alliance: allianceCrest,
  horde: hordeCrest,
};

export interface IAffixIcons {
  bolstering: string;
  afflicted: string;
  bursting: string;
  entangling: string;
  fortified: string;
  incorporeal: string;
  raging: string;
  sanguine: string;
  spiteful: string;
  tyrannical: string;
  volcanic: string;
  storming: string;
}

export const affixIcons = {
  bolstering: bolsteringIcon,
  afflicted: afflictedIcon,
  bursting: burstingIcon,
  entangling: entanglingIcon,
  fortified: fortifiedIcon,
  incorporeal: incorporealIcon,
  raging: ragingIcon,
  sanguine: sanguineIcon,
  spiteful: spitefulIcon,
  tyrannical: tyrannicalIcon,
  volcanic: volcanicIcon,
  storming: stormingIcon,
};

export function retrieveImage(path: AffixKey): string {
  return affixIcons[path];
}

export function retrieveCrest(path: CrestKey): string {
  return crestIcons[path];
}
