import Aresta from "../../core/Aresta";

export default function Prim(
    tipo: string,
    comPeso: boolean,
    arestas: Aresta[],
    vertices: any[],
    setDot: (graph: string) => void,
    setErro: (text: string) => void,
    setModalVisivel:(v: boolean) => void) 
    {

    var verticesVerificados = []

    if(tipo == "grafo" && comPeso){
      var prim = require('prim-mst');
      var graph = []
      
      for(var i=0; i<arestas.length;i++) graph.push([arestas[i].from, arestas[i].to, arestas[i].weight])
      
      const spanningTree = prim(graph)
      //console.log("prim", spanningTree)
      for(var i=0; i<spanningTree.length;i++) {       
        //console.log(spanningTree[i][0],",",spanningTree[i][1], ",",spanningTree[i][2])
      }  
      var construindoGrafo = ""
      for(var j=0;j<arestas.length;j++) {
        var flag = false
        for(var i=0; i<spanningTree.length;i++) {
          if(spanningTree[i][0] == arestas[j].to && spanningTree[i][1] == arestas[j].from ||
            spanningTree[i][1] == arestas[j].to && spanningTree[i][0] == arestas[j].from ) {
            //console.log("entrou")
            if(verticesVerificados.indexOf(arestas[j].from) == -1) verticesVerificados.push(arestas[j].from)  
            if(verticesVerificados.indexOf(arestas[j].to) == -1) verticesVerificados.push(arestas[j].to)  
            construindoGrafo += `${arestas[j].from} -- ${arestas[j].to}[label="${arestas[j].weight}",weight="${arestas[j].weight}"][color=red,penwidth=3.0];\n`
            flag = true
          }
        }
        if(!flag) construindoGrafo += `${arestas[j].from} -- ${arestas[j].to}[label="${arestas[j].weight}",weight="${arestas[j].weight}"];\n`
      }
      if(vertices.length == verticesVerificados.length) {
        if(construindoGrafo != "") setDot(`graph{${construindoGrafo}}`)
      } else {
        setErro("Prim: MST não encontrado. Provavel problema: grafo é não conexo.");
        setModalVisivel(true);
      }
    } else{
        setErro("Prim: Erro encontrado. Grafo precisa ser não direcionado e é necessário ter peso.");
        setModalVisivel(true);
    }
  }