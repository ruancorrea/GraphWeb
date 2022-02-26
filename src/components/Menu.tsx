import { useEffect, useState } from "react";
import ArestaAvulsa from "./ArestaAvulsa";
import { IconAtualizar, IconConfig } from "./Icons";
import ModalCard from "./ModalCard";
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
    textExamplePlaceholder: string
    reinitSystem: () => void
}

export default function Menu(props: MenuProps) {
    const [arestaAvulsa, setArestaAvulsa] = useState(true);
    const [addAresta, setAddAresta]= useState(false);
    const [addGrafo, setAddGrafo]  = useState(true);
    const [modalSistemaVisivel, setModalSistemaVisivel] = useState(false)
    useEffect(() => {
      setAddAresta(arestaAvulsa)
      setAddGrafo(!arestaAvulsa)

    }, [arestaAvulsa])

    return (
        <div className="max-w-xl p-4">
          <label className="flex dark:text-gray-300 justify-center uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
            {props.tipo} {props.comPeso ? "com peso" : "sem peso"}
          </label>

          <div style={{width: '160px'}} className="border-b m-auto border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              { addAresta ?
              <>
                <li className="mr-2">
                  <button type="button" title="Adicionar uma aresta por vez" onClick={()=>setArestaAvulsa(true)} disabled={addAresta} className="inline-block py-4 px-4 text-sm font-medium text-center text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500" aria-current="page">Aresta</button>
                </li>
                <li className="mr-2">
                    <button type="button" title="Adicionar arestas como texto" onClick={()=>setArestaAvulsa(false)} disabled={addGrafo} className="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300">Grafo</button>
                </li> 
              </>
            :
                    <>
                <li className="mr-2">
                    <button type="button" title="Adicionar uma aresta por vez" onClick={()=>setArestaAvulsa(true)} disabled={addAresta} className="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300">Aresta</button>
                </li>
                <li className="mr-2">
                    <button type="button" title="Adicionar arestas como texto" onClick={()=>setArestaAvulsa(false)} disabled={addGrafo} className="inline-block py-4 px-4 text-sm font-medium text-center text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500" aria-current="page">Grafo</button>
                </li>
                    </>
                }
            </ul>
        </div>
          <div className="mt-4">
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
              <Text 
              text={props.text} 
              setText={props.setText} 
              textCriarGrafo={props.textCriarGrafo}
              textExamplePlaceholder={props.textExamplePlaceholder}/>
            }
          </div>
        </div>
    )
}