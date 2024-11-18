import Card from './Card';

export default function CardCont() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Card title="JigSaw Sudoku" goto="/Jigsaw-Sudoku" text="" />
                </div>
                <div className="col">
                    <Card title="N-Queens" goto="/NQueens" text="" />
                </div>
            </div>
        </div>
    )
}