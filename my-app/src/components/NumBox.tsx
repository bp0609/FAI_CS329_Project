export default function NumBox({ id, number }: { id: string, number: number }) {

    const handleOnClick = () => {
        // ApplyConstraintSatisfaction(id)
    }

    return (
        <div className="col-4 text-center m-0 p-0" id={id}>
            <button className={`btn btn-success p-1`} onClick={handleOnClick} style={{ width: '2rem', height: '2rem', textAlign: "center" }}>{number}</button>
        </div>
    )
}
