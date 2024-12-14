import axios from "axios";
import { axiosInstance } from "./axios-instance";

export async function deleteProperty(id: string) {
  try {
    await axiosInstance.delete(`/properties/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error fetching properties"
      );
    } else {
      throw new Error("Error fetching properties");
    }
  }
}
