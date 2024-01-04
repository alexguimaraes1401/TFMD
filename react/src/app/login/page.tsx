"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Page() {
  const [form, setForm] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [cadastrar, setCadastrar] = useState<boolean>(false);
  const { push } = useRouter();

  const valitionForm = () => {
    let errs: any = {};
    // Name
    if (!form.name) {
      errs.name = "Campo Obrigatório!";
    } else if (form.name.length < 3) {
      errs.name = "É preciso ter mais de 3 caracteres!";
    }

    // Senha
    if (!form.senha) {
      errs.senha = "Campo Obrigatório!";
    } else if (form.senha.length < 3) {
      errs.senha = "É preciso ter mais de 3 caracteres!";
    }

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      return true;
    }
    return false;
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(valitionForm());
    if (valitionForm()) {
      try {
        const response = await api.post(
          `user/${cadastrar ? "register" : "login"}`,
          form
        );
        if (cadastrar) {
          alert("Usuário cadastrado com sucesso!");
        } else {
          sessionStorage.setItem("token", response.data.token)
          location.reload()
        }
        clearForm();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const clearForm = () => {
    setForm({});
  };

  const handleValue = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if(sessionStorage.getItem("token")){
      push("adm");
    }
  }, [])

  return (
    <main className="h-screen flex items-center justify-center">
      <form>
        <div className="flex flex-col p-4 bg-slate-300 dark:bg-slate-800 w-auto h-auto rounded-xl gap-6">
          <h1 className="text-center text-3xl">
            {cadastrar ? "Cadastro" : "Login"}
          </h1>
          <div className="flex flex-col gap-1">
            <input
              onChange={handleValue}
              className="bg-gray-600 text-white p-2 rounded"
              name="name"
              type="text"
              placeholder="Nome"
              value={form["name"] || ""}
            />
            <label className="text-red-500">{errors["name"] || ""}</label>
          </div>
          <div className="flex flex-col gap-1">
            <input
              className="bg-gray-600 text-white p-2 rounded"
              onChange={handleValue}
              name="senha"
              type="password"
              placeholder="Senha"
              value={form["senha"] || ""}
            />
            <label className="text-red-500">{errors["senha"] || ""}</label>
          </div>
          <div className="flex flex-col gap-5">
            <button className="bg-indigo-600 rounded-lg p-1 text-white dark:text-black" onClick={onSubmit}>
              Enviar
            </button>
            <button
              className={`bg-${
                cadastrar ? "green" : "orange"
              }-500 rounded-lg p-1 text-center text-white dark:text-black`}
              onClick={(e) => {
                e.preventDefault();
                setCadastrar(!cadastrar);
              }}
            >
              {cadastrar ? "Já tenho cadastro" : "Cadastrar"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
