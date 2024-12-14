import { useQuery, useQueryClient } from "react-query";
import { getProperties } from "../services";
import { KEY_PROPERTIES } from "../interfaces";
import { useNavigate } from "react-router-dom";

type Props = {
  page?: number;
};

export function useGetProperties({ page = 1 }: Props) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [KEY_PROPERTIES, page],
    queryFn: () => getProperties({ page }),
    onSuccess: (data) => {
      queryClient.setQueryData([KEY_PROPERTIES, page], data);
    },
    onError: () => navigate("/error"),
  });
}
