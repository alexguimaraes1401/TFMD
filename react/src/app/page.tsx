"use client";

import { useState } from "react";
import api from "./services/api";

export default function Home() {
  // const form = React

  const [form, setForm] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [disabled, setDisabled] = useState<boolean>(false);

  const emailValidation = (email: string) => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (form.email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  };

  const valitionForm = () => {
    let errs: any = {};
    // Name
    if (!form.name) {
      errs.name = "Campo Obrigatório!";
    } else if (form.name.length < 3) {
      errs.name = "É preciso ter mais de 3 caracteres!";
    }

    // Email
    if (!form.email) {
      errs.email = "Campo Obrigatório!";
    } else if (!emailValidation(form.email)) {
      errs.email = "Email inválido!";
    }

    if (!form.message) {
      errs.message = "Campo Obrigatório!";
    } else if (form.message.length < 10) {
      errs.message = "É preciso ter mais de 10 caracteres!";
    }

    setErrors(errs);
    if (!errs.length) {
      return true;
    }
    return false;
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (valitionForm()) {
      try {
        await api.post(`contact`, form).then((res) => {
          console.log(res);
        });
        clearForm();
        alert("Mensagem enviado com sucesso!");
      } catch (err) {
        console.log(err);
        alert("Erro ao enviar a mensagem!");
      }
    }
  };

  const clearForm = (e?: any) => {
    if (e) e.preventDefault();
    setForm({});
    setDisabled(false);
  };

  const handleValue = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className="h-screen flex items-center justify-center">
      <form>
        <div className="flex flex-col p-4 bg-slate-300 dark:bg-slate-800 w-auto h-auto rounded-xl gap-6">
          <div className="flex flex-col gap-1">
            <input
              onChange={handleValue}
              className="dark:bg-gray-600 bg-gray-100 dark:text-white p-2 rounded"
              name="name"
              type="text"
              disabled={disabled}
              placeholder="Nome"
              value={form["name"] || ""}
            />
            <label className="text-red-500">{errors["name"] || ""}</label>
          </div>
          <div className="flex flex-col gap-1">
            <input
              className="dark:bg-gray-600 bg-gray-100 dark:text-white p-2 rounded"
              onChange={handleValue}
              name="email"
              type="text"
              disabled={disabled}
              placeholder="Email"
              value={form["email"] || ""}
            />
            <label className="text-red-500">{errors["email"] || ""}</label>
          </div>
          <div className="flex flex-col gap-1">
            <textarea
              className="dark:bg-gray-600 bg-gray-100 dark:text-white p-2 rounded"
              placeholder="Mensagem"
              disabled={disabled}
              onChange={handleValue}
              name="message"
              value={form["message"] || ""}
            />
            <label className="text-red-500">{errors["message"] || ""}</label>
          </div>
          <div className="grid gap-6 grid-cols-2">
            <button className="bg-indigo-600 text-white rounded-lg p-1" onClick={onSubmit}>
              Enviar
            </button>
            <button className="bg-red-500 text-white rounded-lg p-1" onClick={clearForm}>
              Limpar
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
