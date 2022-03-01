import { IconAdd } from "./Icons";
import Input from "./Input";

interface ArestaAvulsaProps {
    comPeso: boolean
    setOrigem: (value: any) => void
    setDestino: (value: any) => void
    setPeso: (value: any) => void
    aresta: () => void
    origem: string
    destino: string
    peso: number
}

export default function ArestaAvulsa(props: ArestaAvulsaProps) {
    return (
        <div>
            <label className="flex dark:text-gray-300 justify-center uppercase tracking-wide text-gray-700 text-md font-bold mb-2">
                Adicionando uma Aresta
              </label>
              <div className="h-96 p-4 justify-center items-center">
                  <Input nome={"Origem"} fSet={props.setOrigem} type={"text"} step={"1"} value={props.origem}/>
                  <Input nome={"Destino"} fSet={props.setDestino} type={"text"} step={"1"} value={props.destino}/>
                {
                  props.comPeso ?
                  <Input nome={"Peso"} fSet={props.setPeso} type={"number"} step={"0.01"} value={props.peso} />
                  :
                  <></>
                }
              </div>
              <div className='flex py-4 justify-center'>
                <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded" type="button"
                onClick={props.aresta}>
                <small className='flex items-center'>
                    {IconAdd} Adicionar 
                </small>
                </button>
              </div>
        </div>
    )
}