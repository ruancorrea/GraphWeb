import { useEffect, useState } from 'react';
import GraphViz from '../components/GraphViz';
import { IconDelete, IconDownload } from '../components/Icons';
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';
import ConfigInit from '../components/ConfigInit';
import useGraph from '../hooks/useGraph';
import Menu from '../components/Menu';
import ModalCard from '../components/ModalCard';

export default function Home() {
  const { dot, vertices, tipo, arestas, comPeso, inicial, click, textGraph, erro, modalVisivel,
          setOrigem, setDestino, setPeso, setDot, setGraph, setVertices, setTipo, setArestas, setComPeso, setInicial,
          selecionandoGrafo, aresta, setTextGraph, textCriarGrafo, setModalVisivel
        }
        = useGraph();


  useEffect(() => {
    selecionandoGrafo();
  },[click])


  function Download() {
    htmlToImage.toPng(document.getElementById("#capture"))
    .then(function (dataUrl) {
      saveAs(dataUrl, 'my-node.png');
    });
  }

  


  return (
    <div>
       <div className="flex w-full items-center flex-shrink-0 text-white mr-6 p-6 bg-slate-700 mb-1">
        <span className="font-semibold text-xl tracking-tight ml-2">Criador de Grafos</span>
      </div>
      <div className='grid md:grid-cols-2 grid-cols-1 '>  
        <div className='flex min-h-screen w-full items-center justify-center bg-gray-100 p-4'>
          {
            inicial 
            ?
            <ConfigInit setComPeso={setComPeso} setInicial={setInicial} comPeso={comPeso} setTipo={setTipo} />
            :
            <Menu tipo={tipo} comPeso={comPeso} setOrigem={setOrigem} setDestino={setDestino} setPeso={setPeso}
              aresta={aresta} setDot={setDot} setArestas={setArestas} setGraph={setGraph} setVertices={setVertices}
              setInicial={setInicial} verticesQtd={vertices.length} arestasQtd={arestas.length} text={textGraph} 
              setText={setTextGraph} textCriarGrafo={textCriarGrafo}
            />
          }
          </div>

          
        {
          dot ? 
          <div className='p-4'>
            <label className="flex justify-center items-end uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                Grafo
              </label>
            <div id="#capture">
              <GraphViz dot = {dot}/>
            </div>
            <div className='flex justify-center p-2'>
              <button className="ml-2 shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded" type="button"
                onClick={Download}>
                <small className='flex items-center'>
                  {IconDownload} Download
                </small>
              </button>
              <button className="ml-2 shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded" type="button"
                onClick={() => {
                  setDot("");
                  setArestas([])
                  setVertices([])
                }}>
                  <small className='flex items-center'>
                    {IconDelete} Apagar 
                  </small>
              </button>
            </div>
          </div>
          :
          <div className='flex w-full items-center justify-center'>
            <p className="text-red-500 text-xs italic">Adicione uma aresta para iniciar o grafo.</p>
          </div>
        }

      </div>
      <ModalCard modalVisivel={modalVisivel} setModalVisivel={setModalVisivel} text={erro}/>
    </div>
  )
}

