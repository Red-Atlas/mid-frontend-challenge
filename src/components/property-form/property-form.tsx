import CreateIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { usePropertyForm } from "../../hooks/usePropertyForm";
import "./property-form.css";

function PropertyForm() {
  const {
    control,
    handleSubmit,
    onSubmit,
    properties,
    isEditing,
    toggleEditMode,
    handlePropertyChange,
    loading,
    isValid,
    closeDialog,
  } = usePropertyForm();

  return (
    <Dialog open={true} onClose={closeDialog} fullWidth maxWidth="lg">
      <DialogTitle>
        <div className="title-bar">
          <Typography variant="h6">
            {isEditing ? "Edit Property" : "Create Property"}
          </Typography>
          <button className="button-edit-form-dialog" onClick={toggleEditMode}>
            {isEditing ? <CreateIcon /> : <EditIcon />}
            {isEditing ? "Switch to Create" : "Switch to Edit"}
          </button>
        </div>
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <div className="loading-container">
            <CircularProgress />
            <p>Loading...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="property-form-grid">
            {isEditing && (
              <Controller
                name="id"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Select Property ID"
                    fullWidth
                    onChange={(event) => {
                      field.onChange(event);
                      handlePropertyChange(event.target.value);
                    }}
                  >
                    {properties.map((property: any) => (
                      <MenuItem key={property.id} value={property.id}>
                        {property.id}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            )}

            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required", minLength: 3 }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Title"
                  fullWidth
                  required
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Address"
                  fullWidth
                  required
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required", minLength: 10 }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Type" select fullWidth>
                  <MenuItem value="apartment">Apartment</MenuItem>
                  <MenuItem value="house">House</MenuItem>
                  <MenuItem value="office">Office</MenuItem>
                  <MenuItem value="land">Land</MenuItem>
                </TextField>
              )}
            />

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Status" select fullWidth>
                  <MenuItem value="sale">Sale</MenuItem>
                  <MenuItem value="rent">Rent</MenuItem>
                </TextField>
              )}
            />

            <Controller
              name="price"
              control={control}
              rules={{
                required: "Price is required",
                min: { value: 1, message: "Price must be greater than 0" },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Price"
                  type="number"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="area"
              control={control}
              rules={{
                required: "Area is required",
                min: { value: 1, message: "Area must be greater than 0" },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Area"
                  type="number"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="location.lat"
              control={control}
              rules={{
                required: "Latitude is required",
                min: { value: -90, message: "Latitude must be >= -90" },
                max: { value: 90, message: "Latitude must be <= 90" },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Latitude"
                  type="number"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />

            <Controller
              name="location.lng"
              control={control}
              rules={{
                required: "Longitude is required",
                min: { value: -180, message: "Longitude must be >= -180" },
                max: { value: 180, message: "Longitude must be <= 180" },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Longitude"
                  type="number"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />

            <Controller
              name="owner.name"
              control={control}
              rules={{ required: "Owner name is required" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Owner Name"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />

            <Controller
              name="owner.contact"
              control={control}
              rules={{ required: "Owner contact is required" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Owner Contact"
                  fullWidth
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />


            <Controller
              name="images"
              control={control}
              rules={{
                validate: (value) =>
                  Array.isArray(value) && value.length > 0
                    ? true
                    : "At least one image URL is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Image URLs (comma-separated)"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    const imagesArray = value.split(",").map((url) => url.trim());
                    field.onChange(imagesArray);
                  }}
                />
              )}
            />

            <div className="form-buttons">
              <Button className="buttons-form" variant="outlined" color="secondary" onClick={closeDialog}>
                Cancel
              </Button>
              <Button className="buttons-form"
                variant="contained"
                color="primary"
                type="submit"
                disabled={!isValid}
                style={{ marginRight: "10px" }}
              >
                Save
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PropertyForm;
