import * as getAll from "./getAll";
import * as create from "./create";
import * as deleteTrip from "./deleteTrip";
import * as updateTrip from "./updateTrip";

export default {
    ...getAll,
    ...create,
    ...deleteTrip,
    ...updateTrip,
}


