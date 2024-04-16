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

const affixIcons = {
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
};

export function retrieveImage(path) {
  return affixIcons[path];
}
