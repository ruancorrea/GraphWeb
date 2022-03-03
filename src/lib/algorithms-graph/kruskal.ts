import { kruskal } from "kruskal-mst/dist";
import Aresta from "../../core/Aresta";

export default function Kruskal (
    tipo: string,
    comPeso: boolean,
    arestas: Aresta[],
    vertices: any[],
    setDot: (graph: string) => void,
    setErro: (text: string) => void,
    setModalVisivel:(v: boolean) => void
)
{
    var verticesVerificados = [] // ainda com erro
      if(tipo == "grafo" && comPeso){
        const spanningTree = kruskal(arestas);
        var construindoGrafo = ""
        for(var j=0;j<arestas.length;j++) {
          var flag = false
          for(var i=0; i<spanningTree.length;i++) {
            if(spanningTree[i] == arestas[j]) {
              construindoGrafo += `${arestas[j].from} -- ${arestas[j].to}[label="${arestas[j].weight}",weight="${arestas[j].weight}"][color=red,penwidth=3.0];\n`
              flag = true
              if(verticesVerificados.indexOf(arestas[j].from) == -1) verticesVerificados.push(arestas[j].from)  
              if(verticesVerificados.indexOf(arestas[j].to) == -1) verticesVerificados.push(arestas[j].to)  
            }
          }
          if(!flag) construindoGrafo += `${arestas[j].from} -- ${arestas[j].to}[label="${arestas[j].weight}",weight="${arestas[j].weight}"];\n`
        }
        if(vertices.length == verticesVerificados.length) {
          if(construindoGrafo != "") setDot(`graph{${construindoGrafo}}`)
        } else {
          setErro("Kruskal: Erro encontrado. MST não encontrado.");
          setModalVisivel(true);
        }
      }else {
        setErro("Kruskal: Erro encontrado. Grafo precisa ser não direcionado e é necessário ter peso.");
        setModalVisivel(true);
      }
}