import { useQuery } from "react-query";
import { getProperty } from "../services/getProperty.services";
import { KEY_PROPERTY } from "../interfaces";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
};

export function useGetProperty({ id }: Props) {
  const navigate = useNavigate();

  return useQuery({
    queryKey: KEY_PROPERTY,
    queryFn: () => getProperty(id),
    onError: () => navigate("/error"),
  });
}
