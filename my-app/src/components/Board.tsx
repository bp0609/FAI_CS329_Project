import Square from './Square';

interface BoardProps {
    showAlert: (message: string, type: string) => void | null;
}

export default function Board({ showAlert }: BoardProps) {
    const renderTable = () => {
        const rows = [];
        for (let i = 0; i < 9; i++) {
            const cells = [];
            for (let j = 0; j < 9; j++) {
                cells.push(<td key={j}><Square /></td>);
            }
            rows.push(<tr key={i}>{cells}</tr>);
        }
        return rows;
    };

    return (
        <div className="container">
            <table className="table table-bordered">
                <tbody>
                    {renderTable()}
                </tbody>
            </table>
        </div>
    );
}