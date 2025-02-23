import React, { useState } from "react";
import { UserFormData, userCreate } from "@/api/userService";

type FormType = "Create" | "Edited" | false;
interface FormCreateUserProps {
  // eslint-disable-next-line no-unused-vars
  setLoading: (state: boolean) => void;
  setToast: (
    // eslint-disable-next-line no-unused-vars
    value: React.SetStateAction<{
      message: string;
      type: "negative" | "positive" | "information";
    } | null>
  ) => void;
  fetchData: () => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  setOpenModal: (value: React.SetStateAction<FormType>) => void;
}

const FormCreateUser: React.FC<FormCreateUserProps> = ({
  setLoading,
  setToast,
  fetchData,
  setOpenModal
}) => {
  const formReset = {
    id: "",
    name: "",
    surname: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState<UserFormData>(formReset);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    if (!form.reportValidity()) {
      return;
    }
    setLoading(true);
    setToast(null);
    try {
      await userCreate(formData);
      fetchData();
      setToast({
        message: "Nuevo usuario creado correctamente",
        type: "positive",
      });
      setFormData(formReset);
      setOpenModal(false);
    } catch (error) {
      setToast({
        message: "Error al crear nuevo usuario. Intenta de nuevo." + error,
        type: "negative",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-4">
      <h3 className="font-extrabold">Crear nuevo usuario</h3>
      <hr className="my-4 border-t w-1/2 mx-auto" />
      <form
        onSubmit={handleCreate}
        className="p-6 space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <input
          placeholder="Name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border-b-2 bg-inherit"
          required
          maxLength={50}
        />
        <input
          placeholder="Surname"
          type="text"
          value={formData.surname}
          onChange={(e) =>
            setFormData({ ...formData, surname: e.target.value })
          }
          className="w-full px-4 py-2 border-b-2 bg-inherit"
          required
          maxLength={50}
        />
        <input
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border-b-2 bg-inherit"
          required
          maxLength={50}
        />
        <div className="relative flex items-center space-x-2">
          <input
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Password"
            type="text"
            className="w-full px-4 py-2 border-b-2 bg-inherit"
            required
            maxLength={20}
          />
        </div>
        <button type="submit" className="w-full p-2 rounded lg:col-span-2">
          Create
        </button>
      </form>
    </div>
  );
};

export default FormCreateUser;
