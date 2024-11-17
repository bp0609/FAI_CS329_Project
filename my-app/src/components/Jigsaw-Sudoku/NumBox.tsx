
export default function NumBox({ id, number, selectedBtns, setSelectedBtns }: { id: string, number: number, selectedBtns: string[], setSelectedBtns: (selectedBtns: string[]) => void }) {

    const handleOnClick = () => {
        if (selectedBtns.includes(id)) {
            setSelectedBtns(selectedBtns.filter(btnId => btnId !== id));
        } else {
            setSelectedBtns([...selectedBtns, id]);
        }
    }

    return (
        <div className="col-4 text-center m-0 p-0" id={id}>
            <button
                className={`tbl-btn btn p-1`}
                onClick={handleOnClick}
                style={{ width: '2rem', height: '2rem', textAlign: "center" }}
            >
                {number}
            </button>
        </div>
    );
}
