import { useState, useEffect } from 'react';

export default function NumBox({ id, number }: { id: string, number: number }) {
    const [disabledButtons, setDisabledButtons] = useState<string[]>([]);

    const ApplyConstraintSatisfaction = (id: string) => {
        /*
            id ->'sq-row-col-brow-bcol'
            row: 0 - 8
            col: 0 - 8
            brow: 1 - 3
            bcol: 1 - 3
        */
        const [row, col, brow, bcol] = id.split('-').slice(1).map(Number);
        const newDisabledButtons = new Set(disabledButtons);

        for (let i = 0; i < 9; i++) {
            if (i !== col) newDisabledButtons.add(`sq-${row}-${i}-${brow}-${bcol}`);
            if (i !== row) newDisabledButtons.add(`sq-${i}-${col}-${brow}-${bcol}`);
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (i === brow && j === bcol) continue;
                newDisabledButtons.add(`sq-${row}-${col}-${i}-${j}`);
            }
        }


        setDisabledButtons(Array.from(newDisabledButtons));
    };

    const ApplyOnTable = (disabledButtons: string[]) => {
        const buttons = document.querySelectorAll('.btn-success');
        buttons.forEach((button) => {
            const htmlButton = button as HTMLButtonElement;
            const buttonId = htmlButton.parentElement?.id || '';
            if (disabledButtons.includes(buttonId)) {
                htmlButton.disabled = true;
                htmlButton.className = 'btn btn-danger p-1';
            } else {
                htmlButton.disabled = false;
                htmlButton.className = 'btn btn-success p-1';
            }
        });
    };

    const handleOnClick = () => {
        ApplyConstraintSatisfaction(id);
    };

    useEffect(() => {
        ApplyOnTable(disabledButtons);
    }, [disabledButtons]);

    const isDisabled = disabledButtons.includes(id);

    return (
        <div className="col-4 text-center m-0 p-0" id={id}>
            <button
                className={`btn btn-success p-1`}
                onClick={handleOnClick}
                style={{ width: '2rem', height: '2rem', textAlign: "center" }}
                disabled={isDisabled}
            >
                {number}
            </button>
        </div>
    );
}