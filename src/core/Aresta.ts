export default class Aresta {
    #id: string
    #from: string
    #to: string
    #weight: number

    constructor(from: string, to: string, weight: number, id: string){
        this.#id = id
        this.#from = from
        this.#to = to
        this.#weight = weight
    }

    static vazio() {
        return new Aresta('', "", -1,  '')
    }

    get id() {
        return this.#id
    }

    get from() {
        return this.#from
    }

    get to() {
        return this.#to
    }

    get weight () {
        return this.#weight
    }

    set setWeight (weight: number) {
        this.#weight = weight
    }

}