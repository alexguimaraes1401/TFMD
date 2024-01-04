"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const { push } = useRouter();
  const [logado, setLogado] = useState<boolean>(false);

  const changeLogar = () => {
    if (logado) {
      sessionStorage.removeItem("token");
      setLogado(false);
      push("/");
    } else {
      push("login");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLogado(true);
    } else {
      setLogado(false);
    }
  }, []);

  return (
    <div className="static h-14 dark:bg-slate-800 bg-slate-300 grid grid-cols-3">
      <div className="flex justify-left p-2">
        <button
          className="dark:bg-slate-700 bg-slate-400 p-2 rounded-md"
          onClick={() => push("/")}
        >
          Página Inicial
        </button>
      </div>
      <div className="flex justify-center gap-2">
        <button onClick={() => push("/")} className="p-2">
          Início
        </button>
        {logado && (
          <button onClick={() => push("adm")} className="p-2">
            Listagem
          </button>
        )}
      </div>
      <div className="flex justify-end px-8 py-2">
        <button
          className="dark:bg-slate-800 bg-slate-400 p-2 rounded-md"
          onClick={changeLogar}
        >
          {logado ? "Sair" : "Logar"}
        </button>
      </div>
    </div>
  );
};

export default Header;
