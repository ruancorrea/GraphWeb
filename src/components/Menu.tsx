import { useEffect, useState } from "react";
import ArestaAvulsa from "./ArestaAvulsa";
import Text from "./Text";

interface MenuProps {
    text: string
    setText: (t: string) => void
    tipo: string
    comPeso: boolean
    setOrigem: (value: any) => void
    setDestino: (value: any) => void
    setPeso: (value: any) => void
    aresta: () => void
    textCriarGrafo: () => void
    setDot: (value: string) => void
    setArestas: (value: []) => void
    setGraph: (value: []) => void
    setVertices: (value: any) => void
    setInicial: (value: boolean) => void
    verticesQtd: number
    arestasQtd: number
}

export default function Menu(props: MenuProps) {
    const [arestaAvulsa, setArestaAvulsa] = useState(true);
    const [addAresta, setAddAresta]= useState(false);
    const [addGrafo, setAddGrafo]  = useState(true);
    useEffect(() => {
      setAddAresta(arestaAvulsa)
      setAddGrafo(!arestaAvulsa)

    }, [arestaAvulsa])

    return (
        <div className="max-w-xl p-4">
          <label className="flex justify-center uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
            {props.tipo} {props.comPeso ? "com peso" : "sem peso"}
          </label>

          <ul className="flex border-b my-2">
            <li className="-mb-px mr-1">
              <button type="button" onClick={()=>setArestaAvulsa(true)} disabled={addAresta} 
              className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold">
               <small>Add uma aresta</small>
                </button>
            </li>
            <li className="mr-1">
              <button type="button" onClick={()=>setArestaAvulsa(false)} disabled={addGrafo}
              className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold">
                <small>Add grafo por texto</small>
                </button>
            </li>
          </ul>

            {
              arestaAvulsa ?
              
              <ArestaAvulsa 
              comPeso ={props.comPeso}
              aresta={props.aresta}  
              setDestino={props.setDestino} 
              setOrigem={props.setOrigem} 
              setPeso={props.setPeso} 
              />
              :
              <Text text={props.text} setText={props.setText} textCriarGrafo={props.textCriarGrafo}/>
            }

            <div className='flex justify-center mt-6'>
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