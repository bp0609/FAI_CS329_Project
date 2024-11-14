import NumRow from "./NumRow";

export default function Square({ id }: { id: string }) {

    return (
        <div id={id} className="container p-1" style={{ width: '8rem', height: '8rem' }}>
            <NumRow id={`${id}-1`} startNum={1} />
            <NumRow id={`${id}-2`} startNum={4} />
            <NumRow id={`${id}-3`} startNum={7} />
        </div>
    );
}