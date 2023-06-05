import axios from "axios";
import { BaseUrl } from "../commons/consts/urls";

const BaseApi = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-type": "application/json"
  }
});

export { BaseApi }