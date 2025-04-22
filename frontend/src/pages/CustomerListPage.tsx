import api from "../services/api";
import { AxiosResponse } from 'axios';

export const getLists = async (): Promise<any[]> => {  // 戻り値の型を設定
  try {
    const response: AxiosResponse<any[]> = await api.get("/customers");
    return response.data;
  } catch (error) {
    console.error("Error fetching customer data", error);
    throw error;
  }
};

export default getLists;

