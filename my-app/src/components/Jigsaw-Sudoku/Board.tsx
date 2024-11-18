import Dropdown from '../Dropdown';
import Square from './Square';
import { predefinedBoards } from './Utility/PredefinedBoards';
import { xPercentOfSolution } from './Utility/PredefinedBoards';
import { useEffect, useState } from 'react';
import { celebrateVictory } from './Utility/CelebrateVictory';

const diffToPer = { 'Very Easy': 0.6, 'Easy': 0.4, 'Medium': 0.2, 'Hard': 0.1, 'Very Hard': 0.05, 'Do It Yourself': 0 };

export default function Board() {
    const [boardNum, setBoardNum] = useState(0);
    const [selected, setSelected] = useState<keyof typeof diffToPer>('Easy');
    const [selectedBtns, setSelectedBtns] = useState<string[]>([]);
    const [initializedBtns, setInitializedBtns] = useState<string[]>([]);


    const colorIslands = (boardNum: number) => {
        // extra light color palette
        const colorPalette = ["#C8E6C9", "#90CAF9", "#CE93D8", "#F48FB1", "#FFCC80", "#FFF176", "#E0E0E0", "#80DEEA", "#FFAB91"];
        const islandLoc = predefinedBoards[boardNum].island_loc;

        for (let i = 0; i < 9; i++) {
            islandLoc[i].forEach(loc => {
                const [r, c] = loc.split('-').map(Number);
                const div_el = document.getElementById(`sq-${r}-${c}`) as HTMLDivElement;
                div_el.style.backgroundColor = colorPalette[i];
            });
        }
    }




    useEffect(() => {
        colorIslands(boardNum);
        setInitializedBtns(xPercentOfSolution(boardNum, diffToPer[selected]));
    }, [boardNum, selected]);


    const includeInitializedBtns = () => {

        const allBtns = document.getElementsByClassName('tbl-btn');
        for (let i = 0; i < allBtns.length; i++) {
            const btn = allBtns[i] as HTMLButtonElement;
            if (btn.classList.contains('btn-initialized')) {
                btn.disabled = false;
                btn.className = 'tbl-btn btn btn-primary p-1';
            }
        }

        initializedBtns.forEach(btnId => {
            const div_el = document.getElementById(btnId) as HTMLDivElement;
            const btn = div_el.querySelector('button');
            if (btn) {
                btn.disabled = true;
                btn.className = 'tbl-btn btn btn-primary p-1 btn-initialized';
            }
        });
        setSelectedBtns([...initializedBtns]);
    }

    useEffect(() => {
        includeInitializedBtns();
    }, [initializedBtns]);

    const showOnlyOne = () => {
        // On deselecting a button, show the default state of the square
        const squares = document.getElementsByClassName('sqre');
        for (let i = 0; i < squares.length; i++) {
            const sqre = squares[i] as HTMLDivElement;
            sqre.style.removeProperty('display');
            sqre.style.removeProperty('align-items');
            sqre.style.removeProperty('justify-content');
            const rows = sqre.getElementsByClassName('row');
            for (let j = 0; j < rows.length; j++) {
                const row = rows[j] as HTMLDivElement;
                row.style.display = 'flex';
            }
            const insideBtns = sqre.getElementsByClassName('tbl-btn');
            for (let k = 0; k < insideBtns.length; k++) {
                const btn = insideBtns[k] as HTMLButtonElement;
                btn.style.display = 'block';
                btn.style.height = '2rem';
                btn.style.width = '2rem';
                if (btn.parentElement) btn.parentElement.style.display = 'block';
            }
        }


        selectedBtns.forEach(btnId => {
            const selSqre = document.getElementById(btnId)?.parentElement?.parentElement;
            const allBtns = selSqre?.getElementsByClassName('tbl-btn');
            if (selSqre) {
                selSqre.style.display = 'flex';
                selSqre.style.alignItems = 'center';
                selSqre.style.justifyContent = 'center';
            }
            if (allBtns) {
                for (let i = 0; i < allBtns.length; i++) {
                    const btn = allBtns[i] as HTMLButtonElement;
                    if (selectedBtns.includes(btn.parentElement?.id || '')) {
                        if (btn.classList.contains('btn-initialized')) {
                            btn.className = 'tbl-btn btn btn-primary btn-initialized p-1';
                        } else {
                            btn.className = 'tbl-btn btn btn-success p-1';
                        }
                        if (btn.parentElement) btn.parentElement.style.display = 'block';
                        btn.style.height = '4rem';
                        btn.style.width = '4rem';
                    }
                    else {
                        btn.style.display = 'none';
                        if (btn.parentElement) btn.parentElement.style.display = 'none';
                    }
                }
            }
        });
    }

    useEffect(() => {

        showOnlyOne();


        if (selectedBtns.length === 81) {
            celebrateVictory();
        }

        // Selected buttons
        selectedBtns.forEach(btnId => {
            const div_el = document.getElementById(btnId) as HTMLDivElement;
            const btn = div_el.querySelector('button');
            if (btn && !btn.classList.contains('btn-initialized')) {
                btn.className = 'tbl-btn btn btn-success p-1';
                btn.disabled = false;
            } else if (btn && btn.classList.contains('btn-initialized')) {
                btn.className = 'tbl-btn btn btn-primary btn-initialized p-1';
                btn.disabled = true;
            }
        });



        const disabledBtns = new Set<string>();
        for (let i = 0; i < selectedBtns.length; i++) {
            // Same Row and Column
            const [row, col, btnRow, btnCol] = selectedBtns[i].split('-').slice(1).map(Number);
            for (let i = 0; i < 9; i++) {
                if (i !== col) {
                    disabledBtns.add(`sq-${row}-${i}-${btnRow}-${btnCol}`);
                } if (i !== row) {
                    disabledBtns.add(`sq-${i}-${col}-${btnRow}-${btnCol}`);
                }
            }
            // Same Square
            for (let k = 0; k < 3; k++) {
                for (let j = 0; j < 3; j++) {
                    if (k !== btnRow || j !== btnCol) {
                        disabledBtns.add(`sq-${row}-${col}-${k}-${j}`);
                    }
                }
            }
            // Same Island
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

        const allBtns = document.getElementsByClassName('tbl-btn')
        const notSelectedBtns = Array.from(allBtns).filter(btn => !selectedBtns.includes((btn as HTMLButtonElement).parentElement?.id || ''));
        for (let i = 0; i < notSelectedBtns.length; i++) {
            const btn = notSelectedBtns[i] as HTMLButtonElement;
            const div_id = btn?.parentElement?.id || '';
            if (disabledBtns.has(div_id)) {
                btn.disabled = true;
                if (!btn.classList.contains('btn-initialized')) { btn.className = 'tbl-btn btn btn-light p-1' }
                else { btn.className = 'tbl-btn btn btn-light btn-initialized p-1' }
            } else {
                if (!btn.classList.contains('btn-initialized')) {
                    btn.className = 'tbl-btn btn btn-secondary p-1';
                    btn.disabled = false;
                }
                else {
                    btn.className = 'tbl-btn btn btn-primary btn-initialized p-1';
                    btn.disabled = true;
                }
            }
        }

    }, [selectedBtns, boardNum]);

    const renderTable = () => {
        const islands = predefinedBoards[boardNum].island;
        const rows = [];
        for (let i = 0; i < 9; i++) {
            const cells = [];
            for (let j = 0; j < 9; j++) {
                const isRightBorder = j < 8 && islands[i][j] !== islands[i][j + 1];
                const isBottomBorder = i < 8 && islands[i][j] !== islands[i + 1][j];

                const borderStyle = {
                    borderRight: isRightBorder ? '3px solid black' : '1px solid black',
                    borderBottom: isBottomBorder ? '3px solid black' : '1px solid black'
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

    const handleOnClick = () => {
        setBoardNum((boardNum + 1) % predefinedBoards.length);
        setSelectedBtns([]);
        setInitializedBtns([]);
        colorIslands(boardNum);
    }

    const resetBoard = () => {
        setSelectedBtns([...initializedBtns]);
    }


    return (
        <div className="container p-3">
            <h1 className="text-center my-3">Jigsaw Sudoku</h1>
            <div className="container d-flex my-3">
                <Dropdown options={['Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard', 'Do It Yourself']} selected={selected} setSelected={(value: string) => setSelected(value as keyof typeof diffToPer)} />
                <div className="container">
                    <button className="btn btn-primary mx-3" onClick={handleOnClick}>New Board</button>
                    <button className="btn btn-danger mx-3" onClick={resetBoard}>Reset Board</button>
                </div>
            </div>
            <table className="table table-bordered" style={{ border: '3px solid black', borderCollapse: 'collapse' }}>
                <tbody>
                    {renderTable()}
                </tbody>
            </table>
        </div>
    );
}
