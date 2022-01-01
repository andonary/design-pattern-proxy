import { RetrieveRestaurantListInterface } from "./pattern/interface/retrieveRestaurantListInterface";

export class ClientCode {
  constructor(private retrieveRestaurantList: RetrieveRestaurantListInterface) {
  }

  execute() {
    return this.retrieveRestaurantList.execute();
  }
}

