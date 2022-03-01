import { useEffect, useState } from "react"
import Aresta from "../core/Aresta"
import { kruskal, Edge } from 'kruskal-mst';

export default function useGraph() {
    const [origem, setOrigem] = useState("")
    const [destino, setDestino] = useState("")
    const [peso, setPeso] = useState<number>()
    const [dot, setDot] = useState('')
    const [graph, setGraph] = useState([])
    const [vertices, setVertices] = useState([])
    const [tipo, setTipo] = useState("digrafo")
    const [arestas, setArestas] = useState([])
    const [comPeso, setComPeso] = useState(true)
    const [inicial, setInicial] = useState(true)
    const [click, setClick] = useState(0)
    const [textGraph, setTextGraph] = useState("")
    const [modalVisivel, setModalVisivel] = useState(false);
    const [erro, setErro] = useState("");
    const [textExamplePlaceholder, setTextExamplePlaceholder] = useState("Exemplo:\n0 1\n0 2\n1 2\n2 3")

    useEffect(() => {
      setTextExamplePlaceholder(comPeso ?"Exemplo:\n0 1 2\n0 2 3\n1 2 4\n2 3 2" :"Examplo:\n0 1\n0 2\n1 2\n2 3")
    },[comPeso])

    function reinitSystem() {
      setOrigem("")
      setDestino("")
      setPeso()
      setDot('')
      setGraph([])
      setVertices([])
      setTipo('digrafo')
      setArestas([])
      setComPeso(true)
      setInicial(true)
      setClick(0)
      setTextGraph('')
      setModalVisivel(false)
      setErro("")
    }

    function textCriarGrafo(){
     
      if(textGraph.length > 0) {
        const copyText = textGraph.split("/n");
        const text = copyText[0].split("\n")
        var vertices2 = []

        console.log(text)
        for(var i=0; i<text.length; i++) {
          var aresta = text[i].split(" ")
          var qtd = aresta.length
          if(qtd==1 && aresta[0] == '') continue;

          if(aresta[aresta.length-1] == '') qtd = qtd-1
         // console.log("aresta", aresta)

          if(qtd == 3 && comPeso){
            const o = aresta[0].toString()
            const d = aresta[1].toString()
            const p = parseInt(aresta[2])
            var flag = true
            for(var j=0; j<arestas.length;j++){
              if(arestas[j].from == o && arestas[j].to == d){
                var peso_aux = peso.toString()
                const novoPeso: number = parseInt(arestas[j].weight) + p
                arestas[j].setWeight = (novoPeso)
                flag = false
                setArestas(arestas)
              }
            }

            if(flag) setArestas(prev => { return [...prev, new Aresta(o, d, p, `${arestas.length+1}`)]})

            if(vertices2.indexOf(o) == -1) vertices2.push(o);
        
            if(vertices2.indexOf(d) == -1) vertices2.push(d);  


            setClick(click + 1)
            setVertices(vertices2)
            console.log("VERTICES", vertices)     
          }


          else if(qtd == 2 && !comPeso){
            const o = aresta[0].toString()
            const d = aresta[1].toString()
            const p = -1
            var flag = true
            for(var j=0; j<arestas.length;j++){
              if(arestas[j].from == o && arestas[j].to == d){
                arestas[j].setWeight = (-1)
                flag = false
                setArestas(arestas)
              }
            }

            if(flag) setArestas(prev => { return [...prev, new Aresta(o, d, p, `${arestas.length+1}`)]})
            
            if(vertices2.indexOf(o) == -1) vertices2.push(o);
        
            if(vertices2.indexOf(d) == -1) vertices2.push(d);  

            setClick(click + 1)
            setVertices(vertices2)
            console.log("VERTICES", vertices)
          }

          else {
            setErro("Erro encontrado! Verifique as configurações iniciais e o texto inserido.");
            setModalVisivel(true);
            setDot("");
            setArestas([]);
            setVertices([]);
          }
        }


      }
      
    }




      function selecionandoGrafo() {
        if(tipo == "digrafo" && comPeso){
          digrafoComPeso();
        }
        if(tipo == "digrafo" && !comPeso){
          digrafoSemPeso();
        }
        if (tipo == "grafo" && comPeso) {
          grafoComPeso();
        }
        if(tipo == "grafo" && !comPeso){
          grafoSemPeso();
        }
      }
    
      function digrafoComPeso() {
        var construindoGrafo = ""
        for(var i=0; i<arestas.length; i++) {
          construindoGrafo += `${arestas[i].from} -> ${arestas[i].to}[label="${arestas[i].weight}",weight="${arestas[i].weight}"];\n`
        }
        if(construindoGrafo != "") setDot(`digraph{${construindoGrafo}}`)
      }

    
      function digrafoSemPeso() {
        var construindoGrafo = "";
        for(var i=0; i<arestas.length; i++) {
          construindoGrafo += `${arestas[i].from} -> ${arestas[i].to};\n`
        }
        if(construindoGrafo != "") setDot(`digraph{${construindoGrafo}}`)
      }

    
      function grafoComPeso() {
        var construindoGrafo = ""
        for(var i=0; i<arestas.length; i++) {
          construindoGrafo += `${arestas[i].from} -- ${arestas[i].to}[label="${arestas[i].weight}",weight="${arestas[i].weight}"];\n`
        }
        if(construindoGrafo != "") setDot(`graph{${construindoGrafo}}`)
      }

    
      function grafoSemPeso() {
        var construindoGrafo = ""
        for(var i=0; i<arestas.length; i++) {
          construindoGrafo += `${arestas[i].from} -- ${arestas[i].to};\n`
        }
        if(construindoGrafo != "") setDot(`graph{${construindoGrafo}}`)
      }

      function aresta(){
        var flag = true
        console.log("peso", peso)
        if(peso == undefined || origem.length == 0 || destino.length == 0) {
          setErro("Erro encontrado. Dados inválidos.");
          setModalVisivel(true);
          return
        }
        if(!comPeso) setPeso(0);
        
        for(var i=0; i<arestas.length;i++){
          if(arestas[i].from == origem && arestas[i].to == destino){
            console.log("IGUAL")
            var peso_aux = peso.toString()
            const novoPeso: number = parseInt(arestas[i].weight) + parseInt(peso_aux)
            arestas[i].setWeight = novoPeso
            flag = false
            setArestas(arestas)
          }
          else if(tipo=='grafo' && arestas[i].from == destino  && arestas[i].to == origem){
            console.log("IGUAL")
            var peso_aux = peso.toString()
            const novoPeso: number = parseInt(arestas[i].weight) + parseInt(peso_aux)
            arestas[i].setWeight = novoPeso
            flag = false
            setArestas(arestas)
          }
        }
        if(flag){
          setArestas(prev => { return [...prev, new Aresta(origem, destino, peso, `${arestas.length+1}`)]})
        }
        
        setClick(click + 1)
    
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

      }

      function CaminhoDijkstra(verticeInicial: string, verticeFinal: string) {
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
                console.log("arestas[j]",arestas[j])

                newMap[i].set(arestas[j].to, parseInt(arestas[j].weight));
              }else if(arestas[j].weight < 0){
                setErro("Dijkstra: Peso negativo encontrado.");
                setModalVisivel(true);
                return
              }
            }
          }
          
          for(var i=0;i<vertices.length;i++) graph.set(vertices[i], newMap[i])

          console.log("inicial",verticeInicial)
          console.log("final",verticeFinal)

          const route = new Graph(graph)
          const path = route.path(verticeInicial, verticeFinal)
          var redsArestas = []
          var construindoGrafo = ""
          
          console.log("Path", path) // se o path dar null entao nao há solução
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

    function CaminhoKruskal() {
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

    function CaminhoPrim() {
      var verticesVerificados = []

      if(tipo == "grafo" && comPeso){
        var prim = require('prim-mst');
        var graph = []
        
        for(var i=0; i<arestas.length;i++) graph.push([arestas[i].from, arestas[i].to, arestas[i].weight])
        
        const spanningTree = prim(graph)
        console.log("prim", spanningTree)
        for(var i=0; i<spanningTree.length;i++) {       
          console.log(spanningTree[i][0],",",spanningTree[i][1], ",",spanningTree[i][2])
        }  
        var construindoGrafo = ""
        for(var j=0;j<arestas.length;j++) {
          var flag = false
          for(var i=0; i<spanningTree.length;i++) {
            if(spanningTree[i][0] == arestas[j].to && spanningTree[i][1] == arestas[j].from ||
              spanningTree[i][1] == arestas[j].to && spanningTree[i][0] == arestas[j].from ) {
              console.log("entrou")
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
      
    function caminhoBellmanFord() {

    }
    

    return {
        origem, destino, peso, dot, graph, vertices, tipo, arestas, comPeso, inicial, click, textGraph, modalVisivel, erro, textExamplePlaceholder,
        setOrigem, setDestino, setPeso, setDot, setGraph, setVertices, setTipo, setArestas, setComPeso, setInicial, setClick,
        selecionandoGrafo, aresta, setTextGraph, textCriarGrafo, setModalVisivel, reinitSystem,
        CaminhoDijkstra, CaminhoKruskal, CaminhoPrim
    }
}