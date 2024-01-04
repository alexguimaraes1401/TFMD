"use client";

import { useEffect, useState } from "react";
import api from "../services/api";
import { useRouter } from "next/navigation";

export default function Page() {
  const [fullList, setFullList] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const { push } = useRouter();

  const maxPage = Math.ceil(fullList.length / 5);
  const list = fullList.filter((_: any, index: any) => {
    const range = [page * maxPage, page * maxPage + 5];
    if (index > range[0] && index <= range[1]) {
      return _;
    }
  });

  const changePage = (targetPage: number) => {
    if (targetPage <= maxPage && targetPage >= 0) {
      setPage(targetPage);
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      push("/");
    } else {
      api
        .get("contact", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setFullList(res.data);
        });
    }
  }, []);
  return (
    <main className="h-screen flex items-center justify-center">
      <div className="flex flex-col p-4 bg-slate-300 dark:bg-slate-800 w-10/12 h-auto rounded-xl gap-6">
        <h1 className="text-center text-3xl">Lista de mensagens</h1>
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3">
                  E-mail
                </th>
                <th scope="col" className="px-6 py-3">
                  Mensagem
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav
            className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Página{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {page + 1}
              </span>{" "}
              de{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {maxPage + 1}
              </span>
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <button
                  onClick={() => changePage(page - 1)}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Anterior
                </button>
              </li>
              <li>
                <button
                  onClick={() => changePage(page + 1)}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Próximo
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}
