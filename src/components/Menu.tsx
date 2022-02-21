import { IconAdd } from "./Icons";
import Input from "./Input";

interface MenuProps {
    tipo: string
    comPeso: boolean
    setOrigem: (value: any) => void
    setDestino: (value: any) => void
    setPeso: (value: any) => void
    aresta: () => void
    setDot: (value: string) => void
    setArestas: (value: []) => void
    setGraph: (value: []) => void
    setVertices: (value: []) => void
    setInicial: (value: boolean) => void
    verticesQtd: number
    arestasQtd: number
}

export default function Menu(props: MenuProps) {
    return (
        <div className="max-w-xl p-4">
              <label className="flex justify-center uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                {props.tipo} {props.comPeso ? "com peso" : "sem peso"}
              </label>
              <label className="flex justify-center uppercase tracking-wide text-gray-700 text-md font-bold mb-2">
                Adicionando Aresta
              </label>
              
              <Input nome={"Origem"} fSet={props.setOrigem} type={"text"} step={"1"}/>
              <Input nome={"Destino"} fSet={props.setDestino} type={"text"} step={"1"}/>
              {
                props.comPeso ?
                <Input nome={"Peso"} fSet={props.setPeso} type={"number"} step={"0.01"}/>
                :
                <></>
              }
              <div className='flex justify-end'>
                <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded" type="button"
                onClick={props.aresta}>
                  {IconAdd}
                </button>
              </div>
              <div className='flex justify-center mt-4'>
                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">N° Vértices: {props.verticesQtd}</label>
                <label className="ml-4 block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">N° Arestas: {props.arestasQtd}</label>
              </div>
              <div className='flex justify-center'>
                <button type='button'
                  className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => {
                    props.setInicial(true)
                }}>Reiniciar configurações</button>
              </div>
            </div>
    )
}