import Square from './Square';

export default function Board() {
    const renderTable = () => {
        const rows = [];
        for (let i = 0; i < 9; i++) {
            const cells = [];
            for (let j = 0; j < 9; j++) {
                cells.push(<td key={j}><Square id={`sq-${i}-${j}`} /></td>);
            }
            rows.push(<tr key={i}>{cells}</tr>);
        }
        return rows;
    };

    return (
        <div className="container p-0" style={{ width: "100vw", overflow: 'auto' }}>
            <table className="table table-bordered" style={{ border: '2px solid' }}>
                <tbody>
                    {renderTable()}
                </tbody>
            </table>
        </div>
    );
}