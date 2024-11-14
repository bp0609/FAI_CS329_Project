
export default function NumBox({ number }: { number: number }) {
    return (
        <div className="col-4 text-center m-0 p-0">
            <button className="btn btn-outline-dark p-1" style={{ width: '2rem', height: '2rem', textAlign: "center" }}>{number}</button>
        </div>
    )
}
