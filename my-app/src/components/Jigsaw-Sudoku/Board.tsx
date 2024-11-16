import Square from './Square';
import { predefinedBoards } from './PredefinedBoards';
import { useEffect, useState } from 'react';

export default function Board() {
    const [boardNum, setBoardNum] = useState(0);
    const [selectedBtns, setSelectedBtns] = useState<string[]>([]);

    useEffect(() => {
        setBoardNum(Math.floor(Math.random() * predefinedBoards.length));
    }, []);

    useEffect(() => {
        const btns = document.getElementsByClassName('tbl-btn');
        for (let i = 0; i < btns.length; i++) {
            const btn = btns[i] as HTMLButtonElement;
            btn.classList.remove('btn-success');
            btn.classList.add('btn-primary');
        }
        selectedBtns.forEach(btnId => {
            const btn = (document.getElementById(btnId) as HTMLButtonElement).querySelector('button');
            if (btn) {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-success');
            }
        });

        // set of buttons that should be disabled
        const disabledBtns = new Set<string>();
        // Adding buttons from the same row and column
        for (let i = 0; i < selectedBtns.length; i++) {
            const [row, col, btnRow, btnCol] = selectedBtns[i].split('-').slice(1).map(Number);
            for (let i = 0; i < 9; i++) {
                if (i !== col) {
                    disabledBtns.add(`sq-${row}-${i}-${btnRow}-${btnCol}`);
                } if (i !== row) {
                    disabledBtns.add(`sq-${i}-${col}-${btnRow}-${btnCol}`);
                }
            }
            // Adding buttons from the same square
            for (let k = 0; k < 3; k++) {
                for (let j = 0; j < 3; j++) {
                    if (k !== btnRow || j !== btnCol) {
                        disabledBtns.add(`sq-${row}-${col}-${k}-${j}`);
                    }
                }
            }
            // Adding buttons from the same island
            const island = predefinedBoards[boardNum].island;
            const islandNum = island[row][col];
            const islandLoc = predefinedBoards[boardNum].island_loc;
            islandLoc[islandNum].forEach(loc => {
                const [r, c] = loc.split('-').map(Number);
                if (r !== row && c !== col) {
                    disabledBtns.add(`sq-${r}-${c}-${btnRow}-${btnCol}`);
                }
            });
        }

        console.log(disabledBtns);
        const allBtns = document.getElementsByClassName('tbl-btn');
        for (let i = 0; i < allBtns.length; i++) {
            const btn = allBtns[i] as HTMLButtonElement;
            const div_id = btn?.parentElement?.id || '';
            if (disabledBtns.has(div_id)) {
                btn.disabled = true;
                btn.classList.remove('btn-secondary');
                btn.classList.add('btn-light');
            } else {
                btn.disabled = false;
                btn.classList.remove('btn-light');
                btn.classList.add('btn-secondary');
            }
        }

    }, [selectedBtns]);

    const renderTable = () => {
        const islands = predefinedBoards[boardNum].island;
        const rows = [];
        for (let i = 0; i < 9; i++) {
            const cells = [];
            for (let j = 0; j < 9; j++) {
                const isRightBorder = j < 8 && islands[i][j] !== islands[i][j + 1];
                const isBottomBorder = i < 8 && islands[i][j] !== islands[i + 1][j];

                const borderStyle = {
                    borderRight: isRightBorder ? '3px solid blue' : '1px solid blue',
                    borderBottom: isBottomBorder ? '3px solid blue' : '1px solid blue'
                };

                cells.push(
                    <td key={j} style={borderStyle} className="p-0">
                        <Square id={`sq-${i}-${j}`} selectedBtns={selectedBtns} setSelectedBtns={setSelectedBtns} />
                    </td>
                );
            }
            rows.push(<tr key={i}>{cells}</tr>);
        }
        return rows;
    };

    return (
        <div className="container p-3">
            <h1 className="text-center my-3">Jigsaw Sudoku</h1>
            <button className="btn btn-primary my-3" onClick={() => { setBoardNum((boardNum + 1) % predefinedBoards.length), setSelectedBtns([]) }}>New Board</button>
            <table className="table table-bordered" style={{ border: '3px solid blue', borderCollapse: 'collapse' }}>
                <tbody>
                    {renderTable()}
                </tbody>
            </table>
        </div>
    );
}
