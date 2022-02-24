interface ConfigInitProps {
    setTipo: (value: string) => void
    setComPeso: (value: boolean) => void
    comPeso: boolean
    setInicial: (value: boolean) => void
}

export default function ConfigInit(props: ConfigInitProps) {
    return (
        <div>
                <label className="flex justify-center uppercase tracking-wide text-gray-700 text-md font-bold mb-2">
                  Configurações Iniciais
                </label>
                <div className="flex justify-center">
                    <div className="mb-3 xl:w-96">
                      <select onChange={(e: any) => props.setTipo(e.target.value)} className="form-select appearance-none
                        block w-full px-3 py-1.5 text-base font-normal text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded transition ease-in-out m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                          <option disabled>Selecione o tipo de grafo</option>
                          <option value="grafo">Grafo não direcional</option>
                          <option value="dígrafo">Grafo direcional (dígrafo)</option>
                      </select>
                    </div>
                    <button type="button"  onClick={() => props.setComPeso(!props.comPeso)}
                    className="ml-2 mb-4 inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">
                      {props.comPeso ? "Com Peso" : "Sem Peso"}</button>

                  </div>

                <div className='flex justify-center'>
                <button type="button" onClick={() => props.setInicial(false)}
                 className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
                  Iniciar</button>
                </div>

              </div>
    )
}