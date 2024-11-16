import NumRow from "./NumRow";

export default function Square({ id, selectedBtns, setSelectedBtns }: { id: string, selectedBtns: string[], setSelectedBtns: (selectedBtns: string[]) => void }) {

    return (
        <div id={id} className="container p-1" style={{ width: '8rem', height: '8rem' }}>
            <NumRow id={`${id}-0`} startNum={1} selectedBtns={selectedBtns} setSelectedBtns={setSelectedBtns} />
            <NumRow id={`${id}-1`} startNum={4} selectedBtns={selectedBtns} setSelectedBtns={setSelectedBtns} />
            <NumRow id={`${id}-2`} startNum={7} selectedBtns={selectedBtns} setSelectedBtns={setSelectedBtns} />
        </div>
    );
}