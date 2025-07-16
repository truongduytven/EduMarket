import type { Product } from "../types";
import eduMarketAPI from "./configAPI";

export const getAllProduct = async () =>{
  const { data } = await eduMarketAPI.get<Product[]>("/CourseProduct");
  return data;
}
