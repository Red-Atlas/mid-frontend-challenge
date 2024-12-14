import { Form, Image, Layout } from "../../components";

import { useFormCreate } from "./hooks/useFormCreate";
import { Title } from "./components";

export default function CreateView() {
  const { control, isLoading, onSubmit, isSuccess } = useFormCreate();

  return (
    <Layout>
      <div className="flex h-full gap-4 w-full my-2">
        <picture className="hidden sm:block sm:flex-1 m-auto">
          <Image
            src="https://images.unsplash.com/photo-1613310023042-ad79320c00ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="edificios"
            className="rounded-md shadow-md"
          />
        </picture>

        <section className="flex-1 m-auto">
          <div className="bg-white rounded-md shadow-md p-4">
            <Title isSuccess={isSuccess} />

            <Form control={control} isLoading={isLoading} onSubmit={onSubmit} />
          </div>
        </section>
      </div>
    </Layout>
  );
}
