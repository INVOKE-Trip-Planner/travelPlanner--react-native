import auth from "./auth";
import trip from "./trip";
import profile from "./profile";
import acc from "./acc";
import transport from "./transport";
import itinerary from "./itinerary";
import destination from "./destination";
import schedule from "./schedule";


export default {
  ...auth,
  ...trip,
  ...profile,
  ...acc,
  ...transport,
  ...itinerary,
  ...schedule,
  ...destination

  
};
