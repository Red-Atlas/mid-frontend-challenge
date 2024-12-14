import { useParams } from "react-router-dom";
import { useGetProperty } from "../../hooks";
import { Form, Image, Layout } from "../../components";
import { useFormEdit } from "./hooks/useFormEdit";

export default function EditView() {
  const params = useParams();

  const { data, isLoading } = useGetProperty({ id: params.id || "" });

  const { control, isLoadingEdit, onSubmit } = useFormEdit({
    data,
    id: params.id || "",
  });

  console.log(data);

  return (
    <Layout className="bg-white" isLoading={isLoading || isLoadingEdit}>
      <div className="flex h-full gap-4 w-full my-2">
        <picture className="hidden sm:block sm:flex-1 m-auto">
          <Image
            src={data?.image || ""}
            alt="edificios"
            className="rounded-md"
          />
        </picture>

        <section className="flex-1 m-auto">
          <div className="bg-white rounded-md shadow-md p-4">
            <p className="text-2xl pb-8">Edición de propiedades</p>
            <Form control={control} isLoading={isLoading} onSubmit={onSubmit} />
          </div>
        </section>
      </div>
    </Layout>
  );
}
