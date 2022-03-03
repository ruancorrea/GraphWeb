import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IconArrow, IconAtualizar, IconConfig, IconX } from "./Icons"
import ModalCard from "./ModalCard";

interface SidebarProps {
    qtdvertices: number
    qtdarestas: number
    setInicial: (b: boolean) => void
    reinitSystem: () => void
    setSidebar: (b: boolean) => void
}

export default function Sidebar(props: SidebarProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [modalSistemaVisivel, setModalSistemaVisivel] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    
    return (
        <div className="sm:block hidden h-screen">
            <aside className="w-52" aria-label="Sidebar">
                <div className="px-3 pt-4 overflow-y-auto rounded h-screen bg-gray-50 dark:bg-gray-900">
                    <a className="flex pl-2.5 mb-5 justify-between">
                        <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">GraphWeb</span>
                        <a type="button" className="cursor-pointer self-center text-lg font-semibold whitespace-nowrap dark:text-white" onClick={() => props.setSidebar(false)}>
                            {IconX}
                        </a>
                    </a>
                    
                    <ul className="space-y-2">
                        
                        <li>
                            <a className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <span className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                                {IconArrow}
                                </span>
                                <span className="flex-1 ml-3 whitespace-nowrap">Vértices: {props.qtdvertices}</span>
                            </a>
                        </li>
                        <li>
                            <a className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <span className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                                {IconArrow}
                                </span>
                                <span className="flex-1 ml-3 whitespace-nowrap">Arestas: {props.qtdarestas}</span>
                            </a>
                        </li>
                        
                    </ul>
                    <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
                        <li>
                            <a type='button' onClick={() => { props.setInicial(true)}}  className="flex items-center cursor-pointer p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <span className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                                    {IconConfig}
                                </span>
                                <span className="flex-1 ml-3 whitespace-nowrap">Configurações</span>
                            </a>
                        </li>
                        <li>
                            <a type='button' title="Reiniciar sistema" onClick={() => {setModalSistemaVisivel(true);}} className="flex cursor-pointer items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <span className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" >
                                {IconAtualizar}
                                </span>
                                <span className="flex-1 ml-3 whitespace-nowrap">Reiniciar Sistema</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="flex p-2 cursor-pointer items-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            {mounted && (
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                            className="w-6 h-6 text-black dark:text-gray-50"
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
                            <span className="flex-1 ml-3 whitespace-nowrap">{theme == "dark" ? "Modo Light" : "Modo Dark" }</span>
                            </a>
                        </li>
                       {/*
                        <li>
                           <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                                <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clip-rule="evenodd"></path></svg>
                                <span className="ml-3">Help</span>
                            </a>
                        </li>
                       */}
                    </ul>
                </div>
            <ModalCard setModalVisivel={setModalSistemaVisivel} function={props.reinitSystem} modalVisivel={modalSistemaVisivel} text={"Ao reiniciar o sistema, você perderá o grafo criado e voltará para tela de configuração inicial. Deseja realmente reiniciar o sistema?"} />
            </aside>

        </div>
    )
}