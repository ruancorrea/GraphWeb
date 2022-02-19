import dynamic from 'next/dynamic';
import { useEffect } from 'react';
const Graphviz = dynamic(() => import('graphviz-react'), { ssr: false });

interface GraphVizProps {
    dot?: string
}

export default function GraphViz (props: GraphVizProps) {
    return (
        <div className='flex items-center p-4 justify-center'>
            <Graphviz options={{height: 400, width: 400}} dot={props.dot} />
        </div>
    )
}