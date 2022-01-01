import { EventEmitter } from "events";
import { RetrieveRestaurantListInterface } from "../interface/retrieveRestaurantListInterface";
import { Database } from "../../utils/externalDependencies/database";
import { Restaurant } from "../../utils/models/restaurant";

export class ProxyRetrieve implements RetrieveRestaurantListInterface {
  private logger: EventEmitter = new EventEmitter();
  private cachedList: Restaurant[] = [];

  constructor(private database: Database) {
    this.prepareLogger();
    this.prepareCache();
  }

  private prepareCache() {
    this.cachedList = this.database.retrieveList();
  }

  private prepareLogger() {
    this.logger.on("retrieved", (isCacheUsed: boolean) => {
      console.log(`someone retrieve list using cache: ${isCacheUsed}`);
    });
  }

  execute(): Restaurant[] {
    let result: Restaurant[];
    if (this.isServiceAvailable()) {
      result = this.database.retrieveList();
      this.logger.emit("retrieved", false);
    } else {
      result = this.cachedList;
      this.logger.emit("retrieved", true);
    }
    return result;
  }

  private isServiceAvailable() {
    return this.database.isAvailable;
  }
}
