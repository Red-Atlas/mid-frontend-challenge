import { useParams } from "react-router-dom";
import { useGetProperty } from "../../hooks";
import { Cta } from "./components/Cta";
import { Layout } from "../../components";

export default function PropertyView() {
  const params = useParams();

  const { data, isLoading } = useGetProperty({ id: params.id || "" });

  return (
    <Layout className="bg-white" isLoading={isLoading}>
      <div className="h-full w-full flex flex-col justify-center">
        <Cta property={data} isLoading={isLoading} />
      </div>
    </Layout>
  );
}
