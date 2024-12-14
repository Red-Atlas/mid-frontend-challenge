import axios from "axios";
import { axiosInstance } from "./axios-instance";
import { IPostProperty } from "../interfaces";

export async function postProperty(data: IPostProperty) {
  try {
    await axiosInstance.post("/properties", data, {
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
        error.response?.data?.message || "Error fetching properties"
      );
    } else {
      throw new Error("Error fetching properties");
    }
  }
}
