import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IconAtualizar, IconConfig } from "./Icons";
import ModalCard from "./ModalCard";

interface NavbarProps {
    qtdvertices: number
    qtdarestas: number
    setInicial: (b: boolean) => void
    reinitSystem: () => void
}

export default function Navbar(props: NavbarProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [modalSistemaVisivel, setModalSistemaVisivel] = useState(false)

    useEffect(() => {
        setMounted(true);
    }, []);

    return(
        <div className="w-full sm:hidden block  dark:text-gray-300 text-gray-800 mr-6 p-6 bg-gray-300 dark:bg-slate-900 mb-1">
            <div className="flex md:flex-row justify-between items-center">

                <span className="font-semibold text-xl tracking-tight md:ml-2">GraphWeb</span>

                <div className="hidden space-x-4 md:block">
                    <label title="Número de vertices adicionados" className="uppercase tracking-wide text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Vértices: {props.qtdvertices}</label>
                    <label title="Número de vertices adicionados" className="ml-4 uppercase tracking-wide text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Arestas: {props.qtdarestas}</label>
                </div>
                
                <div className="flex space-x-4 flex-row">
                    <button type='button' title="Reiniciar configurações"
                        className="text-base font-normal text-red-600 dark:text-red-300" onClick={() => {
                        props.setInicial(true)
                    }}> <small className="flex items-center">{IconConfig}</small>
                    </button>
                    
                    <button type='button' title="Reiniciar sistema"
                        className="text-base font-normal text-red-600 dark:text-red-300" onClick={() => {
                        setModalSistemaVisivel(true);
                    }}> <small className="flex items-center">{IconAtualizar}</small>
                    </button>
                    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {mounted && (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        className="w-4 h-4 text-black dark:text-gray-50"
                        >
                            {theme === "dark" ? (
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                                ) : (
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                    )}
                        </svg>
                    )}
                    </button>
                </div>
            </div>
            <div className="block justify-center text-sm md:hidden mt-4">
                <label className="uppercase tracking-wide text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Vértices: {props.qtdvertices}</label>
                <label className="ml-4 uppercase tracking-wide text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Arestas: {props.qtdarestas}</label>
            </div>
            <ModalCard setModalVisivel={setModalSistemaVisivel} function={props.reinitSystem} modalVisivel={modalSistemaVisivel} text={"Ao reiniciar o sistema, você perderá o grafo criado e voltará para tela de configuração inicial. Deseja realmente reiniciar o sistema?"} />

        </div>
    )
}