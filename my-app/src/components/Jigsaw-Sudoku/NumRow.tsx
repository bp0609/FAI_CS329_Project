import NumBox from "./NumBox";

export default function NumRow({ startNum, id, selectedBtns, setSelectedBtns }: { startNum: number, id: string, selectedBtns: string[], setSelectedBtns: (selectedBtns: string[]) => void }) {
    return (
        <div className="row m-0 py-1" id={id}>
            <NumBox id={`${id}-0`} selectedBtns={selectedBtns} setSelectedBtns={setSelectedBtns} number={startNum} />
            <NumBox id={`${id}-1`} selectedBtns={selectedBtns} setSelectedBtns={setSelectedBtns} number={startNum + 1} />
            <NumBox id={`${id}-2`} selectedBtns={selectedBtns} setSelectedBtns={setSelectedBtns} number={startNum + 2} />
        </div>
    )
}