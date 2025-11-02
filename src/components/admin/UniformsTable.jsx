import SearchBar from "./SearchBar";
import { useAppQuery } from "../../hooks/useAppQuery";
import { useState } from "react";
import { useDebounce } from "../../utils/useDebounce";
import Modal from "../Modal";
import { useAppMutation } from "../../hooks/useAppMutation";
import { useQueryClient } from "@tanstack/react-query";
import formatDate from "../../utils/formatDate";
import { toast } from "react-toastify";
import { Delete, Edit, Trash } from "lucide-react";

export default function UniformsTable({ title }) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sizes, setSizes] = useState([{ name: "", price: "" }]);
  const [errors, setErrors] = useState({});

  const [uniform, setUniform] = useState(null);

  const { data, isLoading } = useAppQuery({
    queryKey: ["uniforms", debouncedSearch],
    url: "/api:teW9LUt8/uniform",
    params: { search: debouncedSearch },
    isPrivate: true,
  });

  const { mutate, isPending } = useAppMutation({
    url: "/api:teW9LUt8/uniform",
    method: "post",
  });

  const { mutate: deleteUniform, isPending: isDeleting } = useAppMutation({
    url: "/api:teW9LUt8/uniform",
    method: "delete",
  });

  const { mutate: updateUniform, isPending: isUpdating } = useAppMutation({
    url: `/api:teW9LUt8/uniform/update`,
    method: "put",
  });

  const { mutate: uploadImage, isPending: isUploading } = useAppMutation({
    url: "/api:teW9LUt8/uniform/upload/image",
    method: "post",
  });

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const addSize = () => setSizes([...sizes, { name: "", price: "" }]);
  const removeSize = (index) => setSizes(sizes.filter((_, i) => i !== index));

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Uniform name is required.";
    if (!image && !preview) newErrors.image = "Image is required.";
    if (sizes.length === 0) {
      newErrors.sizes = "At least one size is required.";
    } else {
      const invalidSize = sizes.some(
        (s) => !s.name.trim() || !s.price.toString().trim()
      );
      if (invalidSize)
        newErrors.sizes = "Each size must have both name and price filled in.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (uniform) => {
    setUniform(uniform);
    setName(uniform.name);
    setSizes(uniform.sizes_of_uniform);
    setPreview(uniform.image_url);
  };

  const openDeleteModal = (uniform) => {
    setUniform(uniform);
    setDeleteModalOpen(true);
  };

  const resetForm = () => {
    setUniform(null);
    setName("");
    setImage(null);
    setPreview(null);
    setSizes([{ name: "", price: "" }]);
    setErrors({});
    setModalOpen(false);
    setDeleteModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) return;
      const formData = new FormData();
      formData.append("content", image);

      await uploadImage(formData, {
        onSuccess: async (data) => {
          const image_url =
            "https://storage.googleapis.com/x8ki-letl-twmt.n7.xano.io" +
            data.path;
          await mutate(
            { sizes, name, image_url },
            {
              onSuccess: () => {
                resetForm();
                queryClient.invalidateQueries({
                  queryKey: ["uniforms", "count"],
                });
                toast.success("Uniform added successfully!");
              },
            }
          );
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      resetForm();
    }
  };

  const handleUpdate = async () => {
    try {
      if (!uniform) return;
      if (!validateForm()) return;

      if (image != null) {
        const formData = new FormData();
        formData.append("content", image);

        await uploadImage(formData, {
          onSuccess: async (data) => {
            const image_url =
              "https://storage.googleapis.com/x8ki-letl-twmt.n7.xano.io" +
              data.path;
            await updateUniform(
              { id: uniform.id, sizes, name, image_url },
              {
                onSuccess: () => {
                  resetForm();
                  queryClient.invalidateQueries({
                    queryKey: ["uniforms"],
                  });
                  toast.success("Uniform updated successfully!");
                },
              }
            );
          },
        });
      } else {
        await updateUniform(
          {
            id: uniform.id,
            sizes,
            name,
            image_url: preview,
          },
          {
            onSuccess: () => {
              resetForm();
              queryClient.invalidateQueries({
                queryKey: ["uniforms"],
              });
              toast.success("Uniform updated successfully!");
            },
          }
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      resetForm();
    }
  };

  const handleDelete = () => {
    if (!uniform) return;

    deleteUniform(
      { uniform_id: uniform.id },
      {
        onSuccess: () => {
          resetForm();
          queryClient.invalidateQueries({ queryKey: ["uniforms", "count"] });
          toast.success("Uniform deleted successfully!");
        },
      }
    );
  };

  return (
    <>
      <SearchBar
        search={search}
        placeholder="Search uniform name..."
        onSearch={setSearch}
        onAction={() => setModalOpen(true)}
      />

      <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Uniform ID
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Sizes
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date Added
                </th>

                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No uniforms found.
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-700 text-sm text-nowrap">
                      #CCA-U{item.id}
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm text-nowrap">
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm text-nowrap ">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm text-nowrap">
                      {item.sizes_of_uniform
                        .map((size) => `${size.name}`)
                        .join(", ")}
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm text-nowrap">
                      {formatDate(item.created_at)}
                    </td>

                    <td className="px-6 py-4 text-gray-700 text-xs">
                      <div className="flex items-center gap-x-2 ">
                        <button
                          className="text-emerald-500 hover:underline"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => openDeleteModal(item)}
                        >
                          <Trash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen || (!deleteModalOpen && uniform !== null)}
        onClose={() => {
          setModalOpen(false);
          resetForm();
        }}
        title={uniform ? "Edit Uniform" : "Add New Uniform"}
      >
        <div className="space-y-6 max-h-[80vh] flex flex-col">
          {/* Scrollable content */}
          <div className=" pr-2 space-y-6 flex-1">
            {/* Uniform Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Uniform
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white text-black ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter uniform name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={`block w-full text-sm text-gray-700 border rounded-lg cursor-pointer focus:outline-none bg-white p-2 ${
                  errors.image ? "border-red-500" : "border-gray-300"
                }`}
              />
              {preview && (
                <div className="mt-3">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">{errors.image}</p>
              )}
            </div>

            {/* Sizes Section */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Sizes
                </label>
                <button
                  type="button"
                  onClick={addSize}
                  className="text-sm text-teal-600 font-medium hover:underline"
                >
                  + Add Size
                </button>
              </div>

              <div
                className={`space-y-3 border p-3 rounded-lg max-h-56 overflow-y-auto ${
                  errors.sizes ? "border-red-500" : "border-gray-200"
                }`}
              >
                {sizes.map((size, index) => (
                  <div key={index} className="flex space-x-3 items-center">
                    <input
                      type="text"
                      value={size.name}
                      onChange={(e) =>
                        handleSizeChange(index, "name", e.target.value)
                      }
                      placeholder="Size Name (e.g. Small, Medium)"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white text-black"
                    />
                    <input
                      type="number"
                      value={size.price}
                      onChange={(e) =>
                        handleSizeChange(index, "price", e.target.value)
                      }
                      placeholder="Price"
                      className="w-32 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white text-black"
                    />
                    {sizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSize(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {errors.sizes && (
                <p className="text-red-500 text-xs mt-1">{errors.sizes}</p>
              )}
            </div>
          </div>

          {/* Sticky footer */}
          <div className="pt-4 border-t">
            {uniform ? (
              <button
                type="submit"
                disabled={isUpdating || isUploading}
                className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm"
                onClick={handleUpdate}
              >
                {isUpdating || isUploading ? "Updating..." : "Update Uniform"}
              </button>
            ) : (
              <button
                type="submit"
                disabled={isPending || isUploading}
                className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm"
                onClick={handleSubmit}
              >
                {isPending || isUploading ? "Saving..." : "Save Uniform"}
              </button>
            )}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={deleteModalOpen && uniform !== null}
        onClose={() => {
          resetForm();
        }}
        title={"Delete Uniform"}
      >
        <div className="space-y-6 max-h-[80vh] flex flex-col">
          {/* Scrollable content */}
          <div className=" pr-2 space-y-6 flex-1 text-black">
            Are you sure you want to delete this uniform? This action cannot be
            undone.
          </div>

          {/* Sticky footer */}
          <div className="flex justify-between gap-2 pt-4 border-t">
            <button
              type="submit"
              disabled={isPending || isUploading}
              className="w-fit px-4 py-2 border border-teal-600 text-teal-600 rounded-lg hover:border-teal-700 text-sm"
              onClick={resetForm}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || isUploading}
              className="w-fit px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
              onClick={handleDelete}
            >
              {isDeleting ? "Deleting..." : "Delete Uniform"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
