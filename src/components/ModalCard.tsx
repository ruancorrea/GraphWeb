import { useState } from "react"

interface ModalCardProps {
    modalVisivel: boolean
    setModalVisivel: (b: boolean) => void
    function?: () => void
    text: string
    dijkstra?: (inicial: string, final: string) => void
}

export default function ModalCard (props: ModalCardProps) {
    const [verticeOrigem, setVerticeOrigem] = useState("");
    const [verticeDestino, setVerticeDestino] = useState("")
    return (
        <div className="flex w-screen h-full items-center justify-center">
            {
                props.modalVisivel ?
                
                <div className="overflow-y-auto overflow-x-hidden flex fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full" id="popup-modal">
                    <div className="relative px-4 w-full max-w-md h-full md:h-auto">
                        {/*<!-- Modal content -->*/}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* <!-- Modal header -->*/}
                            <div className="flex justify-end p-2">
                                <button onClick={() => {props.setModalVisivel(false)}}
                                 type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                                </button>
                            </div>
                            {/* <!-- Modal body -->*/}
                            <div className="p-6 pt-0 text-center">
                                <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <h3 className="mb-5 text-lg font-bold text-gray-500 dark:text-gray-400">{props.text}</h3>

                                    {
                                        props.dijkstra ?
                                        <>
                                            <div className="grid xl:grid-cols-2 xl:gap-6">
                                                <div className="relative z-0 mb-6 w-full group">
                                                    <input  onChange={(e) => {setVerticeOrigem(e.target.value)}} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                    <label htmlFor="floating_first_name" className="absolute left-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Vértice origem</label>
                                                </div>
                                                <div className="relative z-0 mb-6 w-full group">
                                                    <input onChange={(e) => {setVerticeDestino(e.target.value)}} type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                    <label htmlFor="floating_last_name" className="absolute left-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Vértice Destino</label>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2 justify-center">
                                                <button onClick={() => {
                                                    props.setModalVisivel(false);
                                                    props.dijkstra(verticeOrigem, verticeDestino);
                                                }}
                                                data-modal-toggle="popup-modal" type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                                    Aplicar Dijkstra
                                                </button>
                                                <button onClick={() => {
                                                    props.setModalVisivel(false);
                                                }}
                                                data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                                    Cancelar
                                                </button>
                                            </div>
                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                    
                                    {
                                        props.function  ?
                                        <div className="flex space-x-2 justify-center">
                                            <button onClick={() => {
                                                props.setModalVisivel(false);
                                                props.function();
                                            }}
                                            data-modal-toggle="popup-modal" type="button" className="text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                                Reiniciar sistema!
                                            </button>
                                            <button onClick={() => {
                                                props.setModalVisivel(false);
                                            }}
                                            data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                                Cancelar
                                            </button>
                                        </div>
                                        :

                                        <></>

                                    }

                                    {
                                        !props.function && !props.dijkstra ?

                                        <button onClick={() => {
                                            props.setModalVisivel(false);
                                        }}
                                        data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                            Entendi!
                                        </button>
                                        :
                                        <></>
                                    }


                                    
                            </div>
                        </div>
                    </div>
                </div>
                :
                <></>
            }
        </div>
    )
}