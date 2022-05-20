import { useEffect, useState } from "react"
import Aresta from "../core/Aresta"
import Prim from "../lib/algorithms-graph/prim";
import Kruskal from "../lib/algorithms-graph/kruskal";
import Dijkstra from "../lib/algorithms-graph/dijkstra";

export default function useGraph() {
    const [origem, setOrigem] = useState("")
    const [destino, setDestino] = useState("")
    const [peso, setPeso] = useState<number>(0)
    const [dot, setDot] = useState<string>('')
    const [graph, setGraph] = useState([])
    const [vertices, setVertices] = useState([])
    const [tipo, setTipo] = useState<string>("digrafo")
    const [arestas, setArestas] = useState<Aresta[]>([])
    const [comPeso, setComPeso] = useState<boolean>(true)
    const [inicial, setInicial] = useState(true)
    const [click, setClick] = useState(0)
    const [textGraph, setTextGraph] = useState("")
    const [modalVisivel, setModalVisivel] = useState<boolean>(false);
    const [erro, setErro] = useState<string>("");
    const [textExamplePlaceholder, setTextExamplePlaceholder] = useState("Exemplo:\n0 1\n0 2\n1 2\n2 3")

    useEffect(() => {
      setTextExamplePlaceholder(comPeso ?"Exemplo:\n0 1 2\n0 2 3\n1 2 4\n2 3 2" :"Exemplo:\n0 1\n0 2\n1 2\n2 3")
    },[comPeso])

    function reinitSystem() {
      setOrigem("")
      setDestino("")
      setPeso(0)
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
        var vertices2 = vertices

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
               //var peso_aux = peso.toString()
               var pesoAux = arestas[j].weight.toString()
               const novoPeso: number = parseInt(pesoAux) + p
               arestas[j].setWeight = (novoPeso)
               flag = false
               setArestas(arestas)
              }
            }
            
            console.log("origem", o);
            console.log("destino", d);
            console.log(vertices2.indexOf(d))

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
        if(!comPeso) setPeso(0);
        
        if(peso == undefined || origem.length == 0 || destino.length == 0) {
          setErro("Erro encontrado. Dados inválidos.");
          setModalVisivel(true);
          return
        }
        
        for(var i=0; i<arestas.length;i++){
          if(arestas[i].from == origem && arestas[i].to == destino){
            console.log("IGUAL")
            var peso_aux = peso.toString()
            var pesoAux = arestas[i].weight.toString()
            const novoPeso: number = parseInt(pesoAux) + parseInt(peso_aux)
            arestas[i].setWeight = novoPeso
            flag = false
            setArestas(arestas)
          }
          else if(tipo=='grafo' && arestas[i].from == destino  && arestas[i].to == origem){
            console.log("IGUAL")
            var peso_aux = peso.toString()
            var pesoAux = arestas[i].weight.toString()
            const novoPeso: number = parseInt(pesoAux) + parseInt(peso_aux)
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
      Dijkstra(verticeInicial, verticeFinal, tipo, comPeso, arestas, vertices, setDot, setErro, setModalVisivel)
    }

    function CaminhoKruskal() {
      Kruskal(tipo, comPeso, arestas, vertices, setDot, setErro, setModalVisivel)
    }

    function CaminhoPrim() {
      Prim(tipo, comPeso, arestas, vertices, setDot, setErro, setModalVisivel)
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