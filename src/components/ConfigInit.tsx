import { IconOk } from "./Icons";

 

interface ConfigInitProps {
    setTipo: (value: string) => void
    setComPeso: (value: boolean) => void
    comPeso: boolean
    setInicial: (value: boolean) => void
}

export default function ConfigInit(props: ConfigInitProps) {
    return (
        <div>
                <label className="flex dark:text-gray-300 py-4 justify-center uppercase tracking-wide text-gray-700 text-3xl font-bold mb-2">
                  Configurações
                </label>

                <div className="flex toggle items-center justify-center w-full mb-2 mt-4">
  
                  <label 
                    htmlFor="toogleA"
                    className="flex items-center cursor-pointer"
                  >
                    <div className="relative">
                      <input id="toogleA" onClick={() => props.setComPeso(!props.comPeso)} type="checkbox" className="dot sr-only" />
                      <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                      {
                        props.comPeso ?
                          <div className="dot absolute w-6 h-6 bg-green-600 rounded-full shadow -left-1 -top-1 transition"></div>
                        :
                        <div className="dot absolute w-6 h-6 bg-red-600 rounded-full shadow -left-1 -top-1 transition translate-x-5"></div>
                      }
                    </div>
                    <div className="ml-4 dark:text-gray-200 uppercase text-gray-700 font-medium">
                      {props.comPeso ? "Com Peso" : "Sem Peso"}
                    </div>
                  </label>

                </div> 

                <div className="flex justify-center mt-4">
                    <div className="mb-14 xl:w-96">
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium">Selecione o tipo de grafo</label>
                      <select onChange={(e: any) => props.setTipo(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                          <option value="grafo">Grafo não direcional</option>
                          <option value="digrafo">Grafo direcional (dígrafo)</option>
                      </select>
                      
                    </div>
                   
                  </div>

                <div className='flex justify-center'>
                <button type="button" onClick={() => props.setInicial(false)}
                 className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
                  <small className="flex items-center text-lg">{IconOk} Iniciar</small></button>
                </div>

              </div>
    )
}