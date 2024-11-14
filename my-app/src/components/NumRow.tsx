import NumBox from "./NumBox";

export default function NumRow({ startNum }: { startNum: number }) {
    return (
        <div className="row m-0 py-1">
            <NumBox number={startNum} />
            <NumBox number={startNum + 1} />
            <NumBox number={startNum + 2} />
        </div>
    )
}