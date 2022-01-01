import {
  ClientCode,


} from "../src/restaurant";
import { ProxyRetrieve } from "../src/pattern/concreteClasses/proxyRetrieve";
import { RealRetrieveRestaurantList } from "../src/pattern/concreteClasses/realRetrieveRestaurantList";
import { RetrieveRestaurantListInterface } from "../src/pattern/interface/retrieveRestaurantListInterface";
import { Database } from "../src/utils/externalDependencies/database";
import { Restaurant } from "../src/utils/models/restaurant";

describe("Design Pattern Proxy Example", () => {
  const sushiTropBon = new Restaurant("Sushi trop bon");
  let database: Database;

  beforeEach(function() {
    database = new Database();
  });

  test.each([
    {
      restaurantsAvailable: [],
      expectedList: [],
      databaseAvailable: true,
    },
    {
      restaurantsAvailable: [sushiTropBon],
      expectedList: [sushiTropBon],
      databaseAvailable: true,
    },
    {
      restaurantsAvailable: [sushiTropBon],
      expectedList: [sushiTropBon],
      databaseAvailable: false,
    },
  ])("it should display a list of restaurant available now: '$restaurantsAvailable'", async (cases) => {
    // Arrange
    const { restaurantsAvailable, expectedList, databaseAvailable } = cases;
    database.feedWith(restaurantsAvailable);
    database.isAvailable = databaseAvailable;
    // Real Arrange
    const retrieveRestaurantList: RetrieveRestaurantListInterface = new RealRetrieveRestaurantList(database);
    const clientCode = new ClientCode(retrieveRestaurantList);
    // Proxy Arrange
    const proxyRetrieve: RetrieveRestaurantListInterface = new ProxyRetrieve(database);
    const clientCodeProxy = new ClientCode(proxyRetrieve);

    // Act
    const list: Restaurant[] = clientCode.execute();
    const listProxy: Restaurant[] = clientCodeProxy.execute();

    // Assert
    expect(list).toEqual(expectedList);
    expect(list).toEqual(listProxy);
  });
});
