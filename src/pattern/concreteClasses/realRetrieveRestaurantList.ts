import { RetrieveRestaurantListInterface } from "../interface/retrieveRestaurantListInterface";
import { Database } from "../../utils/externalDependencies/database";

export class RealRetrieveRestaurantList implements RetrieveRestaurantListInterface {
  constructor(private database: Database) {
  }

  execute() {
    return this.database.retrieveList();
  }
}
