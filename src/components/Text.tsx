import { useState } from "react";
import { IconAdd, IconCopy, IconOk, IconSave } from "./Icons";

interface TextProps {
    text: string
    setText: (t: string) => void
    textCriarGrafo: () => void
    textExamplePlaceholder: string
}

export default function Text(props: TextProps) {
    const [copy, setCopy] = useState(false);
    const classNameCopy = copy ? "bg-green-700 hover:bg-gray-200 text-white hover:text-green-700" : "bg-zinc-600 hover:bg-zinc-900 text-white"

    return (
        <div>
            <label className="flex dark:text-gray-300 justify-center uppercase tracking-wide text-gray-700 text-md font-bold mb-2">
                Adicionando um grafo por texto
              </label>
            <div className="flex justify-center">
            <textarea 
                placeholder={props.textExamplePlaceholder}
                className={`rounded-mdtransition ease-in-out 
                max-w-full h-96 p-4 w-full
                md:mx-4 
                border border-solid border-gray-300
                focus:border-blue-600 focus:outline-none
                `} 
                onChange={(e) => {
                    props.setText(e.target.value);
                    setCopy(false);
                }}
                value={props.text} />
            </div>

            <div className='flex py-4 justify-center'>
                <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded" type="button"
                onClick={() => {props.textCriarGrafo();}}>
                <small className='flex items-center'>
                    {IconAdd} Criar Grafo 
                </small>                
                </button>
              </div>
        </div>
    )
}