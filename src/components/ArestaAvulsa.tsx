import { IconAdd } from "./Icons";
import Input from "./Input";

interface ArestaAvulsaProps {
    comPeso: boolean
    setOrigem: (value: any) => void
    setDestino: (value: any) => void
    setPeso: (value: any) => void
    aresta: () => void
}

export default function ArestaAvulsa(props: ArestaAvulsaProps) {
    return (
        <div>
            <label className="flex justify-center uppercase tracking-wide text-gray-700 text-md font-bold mb-2">
                Adicionando uma Aresta
              </label>
              
              <Input nome={"Origem"} fSet={props.setOrigem} type={"text"} step={"1"}/>
              <Input nome={"Destino"} fSet={props.setDestino} type={"text"} step={"1"}/>
              {
                props.comPeso ?
                <Input nome={"Peso"} fSet={props.setPeso} type={"number"} step={"0.01"}/>
                :
                <></>
              }
              <div className='flex justify-center'>
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