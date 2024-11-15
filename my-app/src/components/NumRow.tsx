import NumBox from "./NumBox";

export default function NumRow({ startNum, id }: { startNum: number, id: string }) {
    return (
        <div className="row m-0 py-1" id={id}>
            <NumBox id={`${id}-0`} number={startNum} />
            <NumBox id={`${id}-1`} number={startNum + 1} />
            <NumBox id={`${id}-2`} number={startNum + 2} />
        </div>
    )
}