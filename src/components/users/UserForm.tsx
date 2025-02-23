import React, { useState, useEffect } from "react";
import { User, UserFormData, changeData, userCreate } from "@/api/userService";

type FormType = "Create" | "Edited";

interface UserFormProps {
  mode: FormType;
  user?: User | null;
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
  setOpenModal: (value: React.SetStateAction<FormType | false>) => void;
}

const UserForm: React.FC<UserFormProps> = ({
  mode,
  user,
  setLoading,
  setToast,
  fetchData,
  setOpenModal,
}) => {
  const formReset: UserFormData = {
    id: "",
    name: "",
    surname: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState<UserFormData>(formReset);

  useEffect(() => {
    if (mode === "Edited" && user) {
      setFormData(user);
    } else {
      setFormData(formReset);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      if (mode === "Create") {
        await userCreate(formData);
        setToast({ message: "Usuario creado correctamente", type: "positive" });
      } else {
        await changeData(formData);
        setToast({
          message: "Usuario editado correctamente",
          type: "positive",
        });
      }
      fetchData();
      setOpenModal(false);
    } catch (error) {
      setToast({ message: `Error: ${error}`, type: "negative" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-4">
      <h3 className="font-extrabold">
        {mode === "Create" ? "Crear Usuario" : "Editar Usuario"}
      </h3>
      <hr className="my-4 border-t w-1/2 mx-auto" />
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <input
          placeholder="Nombre"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border-b-2 bg-inherit"
          required
          maxLength={50}
        />
        <input
          placeholder="Apellido"
          type="text"
          value={formData.surname}
          onChange={(e) =>
            setFormData({ ...formData, surname: e.target.value })
          }
          className="w-full px-4 py-2 border-b-2 bg-inherit"
          required
          maxLength={50}
        />
        {mode === "Create" && (
          <>
            <input
              placeholder="Correo Electrónico"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 border-b-2 bg-inherit"
              required
              maxLength={50}
            />
            <input
              placeholder="Contraseña"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2 border-b-2 bg-inherit"
              required={mode === "Create"}
              maxLength={20}
            />
          </>
        )}
        <button type="submit" className="w-full p-2 rounded lg:col-span-2">
          {mode === "Create" ? "Crear" : "Editar"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
