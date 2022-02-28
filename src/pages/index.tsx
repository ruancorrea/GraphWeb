import { useEffect, useState } from 'react';
import GraphViz from '../components/GraphViz';
import { IconDelete, IconDownload, IconMenuHam } from '../components/Icons';
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';
import ConfigInit from '../components/ConfigInit';
import useGraph from '../hooks/useGraph';
import Menu from '../components/Menu';
import ModalCard from '../components/ModalCard';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const { dot, vertices, tipo, arestas, comPeso, inicial, click, textGraph, erro, modalVisivel, textExamplePlaceholder,
          setOrigem, setDestino, setPeso, setDot, setGraph, setVertices, setTipo, setArestas, setComPeso, setInicial,
          selecionandoGrafo, aresta, setTextGraph, textCriarGrafo, setModalVisivel, reinitSystem, 
          CaminhoDijkstra, CaminhoKruskal, CaminhoPrim
        }
        = useGraph();
  const [sidebar, setSidebar] = useState(true);

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
      <Navbar 
       setInicial={setInicial} 
       qtdvertices={vertices.length} 
       qtdarestas={arestas.length} 
       reinitSystem={reinitSystem} 
       /> 
      <div className='grid md:grid-cols-2 grid-cols-1 '>  
        <div className='flex md:grid-cols-2 min-h-screen w-full items-center sm:justify-between justify-center bg-gray-100 dark:bg-gray-800'>
          {
            sidebar ?
            <Sidebar 
            setInicial={setInicial} 
            qtdvertices={vertices.length} 
            qtdarestas={arestas.length} 
            reinitSystem={reinitSystem}
            setSidebar={setSidebar}   
            />
            :
            <a className='fixed cursor-pointer self-center text-lg font-semibold whitespace-nowrap dark:text-white px-3 pt-4 justify-center top-0 ' type='button' onClick={() => setSidebar(true)}>
              {IconMenuHam}
            </a>
        }
          {
            inicial 
            ?
            <div className='justify-center w-full'>
              <ConfigInit setComPeso={setComPeso} setInicial={setInicial} comPeso={comPeso} setTipo={setTipo} />
            </div>
            :
            <div className='justify-center w-full'>
              <Menu tipo={tipo} comPeso={comPeso} setOrigem={setOrigem} setDestino={setDestino} setPeso={setPeso}
                aresta={aresta} setDot={setDot} setArestas={setArestas} setGraph={setGraph} setVertices={setVertices}
                setInicial={setInicial} verticesQtd={vertices.length} arestasQtd={arestas.length} text={textGraph} 
                setText={setTextGraph} textCriarGrafo={textCriarGrafo} textExamplePlaceholder={textExamplePlaceholder}
                reinitSystem={reinitSystem}
              />
           </div>

          }
          </div>

          
        {
          dot ? 
          <div className='p-4'>
            <label className="flex dark:text-gray-300 justify-center items-end uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
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
              {comPeso ?
                <div className="flex rounded-md justify-center mt-2 shadow-sm" role="group">
                  <button type="button" onClick={() => selecionandoGrafo()} className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    Normal 
                  </button>
                  <button type="button" onClick={() => CaminhoDijkstra()} className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    Dijkstra
                  </button>
                  <button type="button" onClick={() => CaminhoKruskal()} className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    Kruskal
                  </button>
                  <button type="button" onClick={() => CaminhoPrim()} className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    Prim
                  </button>
                </div>
              :
                <></>
              }
          </div>
          :
          <div className='flex w-full items-center justify-center'>
            <p className="text-red-500 text-xs italic">Adicione uma aresta para iniciar o grafo.</p>
          </div>
        }

        <ModalCard modalVisivel={modalVisivel} setModalVisivel={setModalVisivel} text={erro}/>
      </div>
    </div>
  )
}

