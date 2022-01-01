import { Restaurant } from "../../utils/models/restaurant";

export interface RetrieveRestaurantListInterface {
  execute(): Restaurant[];
}
