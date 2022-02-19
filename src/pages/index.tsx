import { useEffect, useState } from 'react';
import GraphViz from '../components/GraphViz';
import { IconAdd, IconDelete, IconDownload } from '../components/Icons';
import Input from '../components/Input';
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';

export default function Home() {
  const [origem, setOrigem] = useState("")
  const [destino, setDestino] = useState("")
  const [peso, setPeso] = useState(0)
  const [dot, setDot] = useState('')
  const [arestas, setArestas] = useState('')
  const [graph, setGraph] = useState([])
  const [vertices, setVertices] = useState([])
  const [tipo, setTipo] = useState("digraph")


  function aresta(){
    setGraph ( prev => {
      return [...prev, [origem, destino, peso]]
    })

    if(vertices.indexOf(origem) == -1){
      setVertices ( prev => {
        return [...prev, origem]
      })
    }

    if(vertices.indexOf(destino) == -1){
      setVertices ( prev => {
        return [...prev, destino]
      })
    }

    const novaAresta = `${origem} -> ${destino}[label="${peso}",weight="${peso}"];\n`
    setArestas(arestas + novaAresta);
    setDot(`digraph{${arestas + novaAresta}}`)
  }


  function Download() {
    htmlToImage.toPng(document.getElementById("#capture"))
    .then(function (dataUrl) {
      saveAs(dataUrl, 'my-node.png');
    });
  }

  


  return (
    <div>
       <div className="flex w-full items-center flex-shrink-0 text-white mr-6 p-6 bg-slate-700 mb-3">
        <span className="font-semibold text-xl tracking-tight ml-2">Gerador de Grafos</span>
      </div>
      <div className='grid md:grid-cols-2 grid-cols-1 '>  
        <div className='flex w-full items-center justify-center bg-gray-100'>

            <div className="max-w-xl p-4">
              <label className="flex justify-center uppercase tracking-wide text-gray-700 text-md font-bold mb-2">
                Adicionando Aresta
              </label>
              
              <Input nome={"Origem"} fSet={setOrigem} type={"text"} step={"1"}/>
              <Input nome={"Destino"} fSet={setDestino} type={"text"} step={"1"}/>
              <Input nome={"Peso"} fSet={setPeso} type={"number"} step={"0.01"}/>
              <div className='flex justify-end'>
                <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded" type="button"
                onClick={aresta}>
                  {IconAdd}
                </button>
              </div>
              <div className='flex justify-center mt-4'>
                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">N° Vértices: {vertices.length}</label>
                <label className="ml-4 block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">N° Arestas: {graph.length}</label>
              </div>
            </div>

          </div>
        {
          dot ? 
          <div className='p-4'>
            <label className="flex justify-center uppercase tracking-wide text-gray-700 text-md font-bold mb-2">
                Grafo
              </label>
            <div id="#capture">
              <GraphViz dot = {dot}/>
            </div>
            <div className='flex justify-center p-2'>
              <button className="ml-2 shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded" type="button"
                onClick={Download}>
                {IconDownload}
              </button>
              <button className="ml-2 shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded" type="button"
                onClick={() => {
                  setDot("");
                  setArestas("")
                  setGraph([])
                  setVertices([])
                }}>
                {IconDelete}
              </button>
            </div>
          </div>
          :
          <div className='flex w-full items-center justify-center'>
            <p className="text-red-500 text-xs italic">Adicione uma aresta para iniciar o grafo.</p>
          </div>
        }

      </div>
    </div>
  )
}

