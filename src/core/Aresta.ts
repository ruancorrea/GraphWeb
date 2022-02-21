export default class Aresta {
    #id: string
    #origem: string
    #destino: string
    #peso: number

    constructor(origem: string, destino: string, peso: number, id: string){
        this.#id = id
        this.#origem = origem
        this.#destino = destino
        this.#peso = peso
    }

    static vazio() {
        return new Aresta('', "", -1,  '')
    }

    get id() {
        return this.#id
    }

    get origem() {
        return this.#origem
    }

    get destino() {
        return this.#destino
    }

    get peso () {
        return this.#peso
    }

    set setPeso (peso: number) {
        this.#peso = peso
    }

}