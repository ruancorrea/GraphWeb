import Aresta from "../../core/Aresta";

export default function Dijkstra(
    verticeInicial: string, 
    verticeFinal: string,
    tipo: string,
    comPeso: boolean,
    arestas: Aresta[],
    vertices: any[],
    setDot: (graph: string) => void,
    setErro: (text: string) => void,
    setModalVisivel:(v: boolean) => void 
) {
    if(vertices.indexOf(verticeInicial) == -1 || vertices.indexOf(verticeFinal) == -1) {
        setErro("Dijkstra: Algum vértice informado não está presente entre os vértices adicionados no grafo.");
        setModalVisivel(true);
        return
      }
      if(tipo == "digrafo" && comPeso){

        const Graph = require('node-dijkstra')
        var newMap = []
        const graph = new Map()
        
        for(var i=0;i<vertices.length;i++){
          newMap.push(new Map())
        }
        
        for(var j=0; j< arestas.length;j++){
          for(var i=0;i<vertices.length;i++){
            if(arestas[j].from == vertices[i] && arestas[j].weight >= 0){
              //console.log("arestas[j]",arestas[j])
              var pesoAux = arestas[j].weight.toString()

              newMap[i].set(arestas[j].to, parseInt(pesoAux));
            }else if(arestas[j].weight < 0){
              setErro("Dijkstra: Peso negativo encontrado.");
              setModalVisivel(true);
              return
            }
          }
        }
        
        for(var i=0;i<vertices.length;i++) graph.set(vertices[i], newMap[i])

        //console.log("inicial",verticeInicial)
        //console.log("final",verticeFinal)

        const route = new Graph(graph)
        const path = route.path(verticeInicial, verticeFinal)
        var redsArestas = []
        var construindoGrafo = ""
        
        //console.log("Path", path) // se o path dar null entao nao há solução
        if(path != null){
          
          for(var i=0;i<path.length;i++){
            if (i+1 <= path.length) {
              for(var j=0;j<arestas.length;j++){
                if(arestas[j].from == path[i] && arestas[j].to == path[i+1]) redsArestas.push(j)
              }
            }
          }
          for(var j=0;j<arestas.length;j++) {
            if(redsArestas.indexOf(j) != -1) {
              construindoGrafo += `${arestas[j].from} -> ${arestas[j].to}[label="${arestas[j].weight}",weight="${arestas[j].weight}"][color=red,penwidth=3.0];\n`
            } else construindoGrafo += `${arestas[j].from} -> ${arestas[j].to}[label="${arestas[j].weight}",weight="${arestas[j].weight}"];\n`
            
          }
          
          if(construindoGrafo != "") setDot(`digraph{${construindoGrafo}}`)
        } else {
          setErro("Dijkstra: Menor caminho não encontrado.");
          setModalVisivel(true);
        }
      }else {
          setErro("Dijkstra: Erro encontrado. Grafo precisa ser direcionado (digrado) e é necessário ter peso positivo.");
          setModalVisivel(true);
      }
}