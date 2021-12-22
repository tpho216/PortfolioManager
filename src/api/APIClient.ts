import axios from "axios";
import PortfolioDataService from "./PortfolioDataService";

class APIClient {
  public readonly portfolioDataService : PortfolioDataService;
  private readonly DEVELOPMENT_BASE_URL = "http://192.168.1.104"
  private readonly PRODUCTION_BASE_URL = "https://tphoportfolioapi.azurewebsites.net"

  constructor() {
    const axiosInstance = axios.create({
      baseURL: this.DEVELOPMENT_BASE_URL,
    });
    this.portfolioDataService = new PortfolioDataService(axiosInstance);
  }

}

export default APIClient;
