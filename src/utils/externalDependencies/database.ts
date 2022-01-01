import { Restaurant } from "../models/restaurant";

export class Database {
  private list: Restaurant[] = [];
  public isAvailable: boolean = true;

  feedWith(restaurantsAvailable: Restaurant[]) {
    this.list = restaurantsAvailable;
  }

  retrieveList() {
    return this.list;
  }
}
