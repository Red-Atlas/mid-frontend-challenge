import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useQueryProperty } from "../../services/property/useQueryProperty";
import { useMutationAddProperty } from "../../services/property/useMutationAddProperty";
import { Property } from "../../services/_types";
import { useMutationEditProperty } from "../../services/property/useMutationEditProperty";
import "./styles.scss";

export const NewProperty = () => {
  const { id } = useParams();
  const { data: property, isLoading } = useQueryProperty(id);

  const addPropertyMutation = useMutationAddProperty();
  const editPropertyMutation = useMutationEditProperty();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("El título es obligatorio"),
    address: Yup.string().required("La dirección es obligatoria"),
    description: Yup.string().required("La descripción es obligatoria"),
    location: Yup.string().required("La ubicación es obligatoria"),
    type: Yup.string().required("El tipo es obligatorio"),
    status: Yup.string().required("El estado es obligatorio"),
    price: Yup.number()
      .required("El precio es obligatorio")
      .positive("El precio debe ser un número positivo"),
    area: Yup.number().nullable(),
    images: Yup.string().required("Debe ser una URL válida"),
    isActive: Yup.boolean().required("El estado de actividad es obligatorio"),
  });

  const initialValues = useMemo(
    () => ({
      title: property ? property.title : "",
      address: property ? property.address : "",
      description: property ? property.description : "",
      location: property ? property.address : "",
      type: property ? property.type : "",
      status: property ? property.status : "",
      price: property ? property.price : "",
      area: property ? property.area : "",
      images: property ? property.images[0] : "",
      owner: property ? property.owner.name : "",

      isActive: property ? property.isActive : true,
    }),
    [property, id, isLoading]
  );
  console.log(id, property, initialValues);

  const handleSubmit = async (values: CreateProperty) => {
    const formattedValues = {
      ...values,
      images: [values.images],
    };
    if (!property && !id) {
      const response = await addPropertyMutation.mutateAsync({
        ...formattedValues,
        images: formattedValues.images[0],
      });
      return response;
    } else {
      if (id) {
        const response = await editPropertyMutation.mutateAsync({
          values: {
            ...formattedValues,
            images: formattedValues.images[0],
          },
          id,
        });
        return response;
      }
    }
  };

  return (
    <main className="newProperty">
      <section className="newPropertyHead">
        <h2>{property ? `Editar propiedad #${id}` : "Nueva propiedad"}</h2>
      </section>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form>
            <h4>Complete el formulario</h4>
            <div>
              <label>Título:</label>
              <Field
                type="text"
                name="title"
              />
              <ErrorMessage
                name="title"
                component="span"
              />
            </div>
            <div>
              <label>Dirección:</label>
              <Field
                type="text"
                name="address"
              />
              <ErrorMessage
                name="address"
                component="span"
              />
            </div>
            <div>
              <label>Descripción:</label>
              <Field
                type="text"
                name="description"
              />
              <ErrorMessage
                name="description"
                component="span"
              />
            </div>
            <div>
              <label>Ubicación:</label>
              <Field
                type="text"
                name="location"
              />
              <ErrorMessage
                name="location"
                component="span"
              />
            </div>
            <div>
              <label>Tipo:</label>
              <Field
                type="text"
                name="type"
              />
              <ErrorMessage
                name="type"
                component="span"
              />
            </div>
            <div>
              <label>Estado:</label>
              <Field
                type="text"
                name="status"
              />
              <ErrorMessage
                name="status"
                component="span"
              />
            </div>
            <div>
              <label>Precio:</label>
              <Field
                type="text"
                name="price"
              />
              <ErrorMessage
                name="price"
                component="span"
              />
            </div>
            <div>
              <label>Área:</label>
              <Field
                type="text"
                name="area"
              />
              <ErrorMessage
                name="area"
                component="span"
              />
            </div>
            <div>
              <label>Área:</label>
              <Field
                type="text"
                name="owner"
              />
              <ErrorMessage
                name="owner"
                component="span"
              />
            </div>
            <div>
              <label>Imágenes (URLs):</label>
              <Field
                type="text"
                name="images"
              />
              <ErrorMessage
                name="images"
                component="span"
              />
            </div>
            <div className="checkbox">
              <label>Activo:</label>
              <Field
                type="checkbox"
                name="isActive"
              />
              <ErrorMessage
                name="isActive"
                component="span"
              />
            </div>
            <button
              type="submit"
              disabled={
                editPropertyMutation.isPending || addPropertyMutation.isPending
              }
            >
              {!editPropertyMutation.isPending && !addPropertyMutation.isPending
                ? "Guardar Propiedad"
                : "Guardando..."}
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};
