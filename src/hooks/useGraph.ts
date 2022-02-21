import { useState } from "react"
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
        var flag = true
        if(!comPeso) setPeso(-1);

        for(var i=0; i<arestas.length;i++){
          if(arestas[i].origem == origem && arestas[i].destino == destino){
            const novoPeso: number = parseInt(arestas[i].peso) + parseInt(peso)
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
    
       /* const novaAresta = `${origem} -> ${destino}[label="${peso}",weight="${peso}"];\n`
        setArestas(arestas + novaAresta);
        setDot(`digraph{${arestas + novaAresta}}`) */
      }
    

    return {
        origem, destino, peso, dot, graph, vertices, tipo, arestas, comPeso, inicial, click,
        setOrigem, setDestino, setPeso, setDot, setGraph, setVertices, setTipo, setArestas, setComPeso, setInicial, setClick,
        selecionandoGrafo, aresta, 
    }
}