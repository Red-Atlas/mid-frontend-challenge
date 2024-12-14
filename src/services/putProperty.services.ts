import axios from "axios";
import { axiosInstance } from "./axios-instance";
import { IPostProperty } from "../interfaces";

export async function putProperty(data: Partial<IPostProperty>, id: string) {
  try {
    await axiosInstance.put(`/properties/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      status: "ok",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error updating properties"
      );
    } else {
      throw new Error("Error updating properties");
    }
  }
}
