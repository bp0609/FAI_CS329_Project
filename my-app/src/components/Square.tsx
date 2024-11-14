import NumRow from "./NumRow";

export default function Square() {
    return (
        <div className="container border p-1" style={{ width: '8rem', height: '8rem' }}>
            <NumRow startNum={1} />
            <NumRow startNum={4} />
            <NumRow startNum={7} />
        </div>
    );
}