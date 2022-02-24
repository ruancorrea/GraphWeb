import { useEffect, useState } from "react"
import Aresta from "../core/Aresta"

export default function useGraph() {
    const [origem, setOrigem] = useState("")
    const [destino, setDestino] = useState("")
    const [peso, setPeso] = useState<number>(0)
    const [dot, setDot] = useState('')
    const [graph, setGraph] = useState([])
    const [vertices, setVertices] = useState([])
    const [tipo, setTipo] = useState("digrafo")
    const [arestas, setArestas] = useState([])
    const [comPeso, setComPeso] = useState(false)
    const [inicial, setInicial] = useState(true)
    const [click, setClick] = useState(0)
    const [textGraph, setTextGraph] = useState("")
    const [modalVisivel, setModalVisivel] = useState(false);
    const [erro, setErro] = useState("");

    function textCriarGrafo(){
     
      if(textGraph.length > 0) {
        const copyText = textGraph.split("/n");
        const text = copyText[0].split("\n")
        var vertices2 = []

        console.log(text)
        for(var i=0; i<text.length; i++) {
          var aresta = text[i].split(" ")

          if(aresta.length == 3 && comPeso){
            const o = aresta[0].toString()
            const d = aresta[1].toString()
            const p = parseInt(aresta[2])


            setArestas(prev => { return [...prev, new Aresta(o, d, p, `${arestas.length+1}`)]})

            if(vertices2.indexOf(o) == -1) vertices2.push(o);
        
            if(vertices2.indexOf(d) == -1) vertices2.push(d);  


            setClick(click + 1)
            setVertices(vertices2)
            console.log("VERTICES", vertices)     
          }


          else if(aresta.length == 2 && !comPeso){
            const o = aresta[0].toString()
            const d = aresta[1].toString()
            const p = -1

            setArestas(prev => { return [...prev, new Aresta(o, d, p, `${arestas.length+1}`)]})
            
            if(vertices2.indexOf(o) == -1) vertices2.push(o);
        
            if(vertices2.indexOf(d) == -1) vertices2.push(d);  

            setClick(click + 1)
            setVertices(vertices2)
            console.log("VERTICES", vertices)
          }

          else {
            setErro("Erro encontrado! Verifique as configurações iniciais e o texto inserido.");
            setModalVisivel(true);
          }
        }


      }
      
    }




    function selecionandoGrafo() {
        if(tipo == "dígrafo" && comPeso){
          digrafoComPeso();
        }
        if(tipo == "dígrafo" && !comPeso){
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
          construindoGrafo += `${arestas[i].origem} -> ${arestas[i].destino}[label="${arestas[i].peso}",weight="${arestas[i].peso}"];\n`
        }
        if(construindoGrafo != "") setDot(`digraph{${construindoGrafo}}`)
      }

    
      function digrafoSemPeso() {
        var construindoGrafo = "";
        for(var i=0; i<arestas.length; i++) {
          construindoGrafo += `${arestas[i].origem} -> ${arestas[i].destino};\n`
        }
        if(construindoGrafo != "") setDot(`digraph{${construindoGrafo}}`)
      }

    
      function grafoComPeso() {
        var construindoGrafo = ""
        for(var i=0; i<arestas.length; i++) {
          construindoGrafo += `${arestas[i].origem} -- ${arestas[i].destino}[label="${arestas[i].peso}",weight="${arestas[i].peso}"];\n`
        }
        if(construindoGrafo != "") setDot(`graph{${construindoGrafo}}`)
      }

    
      function grafoSemPeso() {
        var construindoGrafo = ""
        for(var i=0; i<arestas.length; i++) {
          construindoGrafo += `${arestas[i].origem} -- ${arestas[i].destino};\n`
        }
        if(construindoGrafo != "") setDot(`graph{${construindoGrafo}}`)
      }

    

      function aresta(){
        console.log("ENTROU NA FUNÇÃO ARESTA");
        console.log("origem", origem)
        console.log("destino", destino)
        var flag = true
        if(!comPeso) setPeso(-1);

        for(var i=0; i<arestas.length;i++){
          if(arestas[i].origem == origem && arestas[i].destino == destino){
            var peso_aux = peso.toString()
            const novoPeso: number = parseInt(arestas[i].peso) + parseInt(peso_aux)
            arestas[i].setPeso = (novoPeso)
            flag = false
            setArestas(arestas)
          }
        }
        if(flag){
          setArestas(prev => { return [...prev, new Aresta(origem, destino, peso, `${arestas.length+1}`)]})
        }
        
    
        /*setGraph ( prev => {
          return [...prev, [origem, destino, peso]]
        })*/

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

        console.log("VERTICES", vertices)
    
       /* const novaAresta = `${origem} -> ${destino}[label="${peso}",weight="${peso}"];\n`
        setArestas(arestas + novaAresta);
        setDot(`digraph{${arestas + novaAresta}}`) */
      }
    

    return {
        origem, destino, peso, dot, graph, vertices, tipo, arestas, comPeso, inicial, click, textGraph, modalVisivel, erro,
        setOrigem, setDestino, setPeso, setDot, setGraph, setVertices, setTipo, setArestas, setComPeso, setInicial, setClick,
        selecionandoGrafo, aresta, setTextGraph, textCriarGrafo, setModalVisivel
    }
}