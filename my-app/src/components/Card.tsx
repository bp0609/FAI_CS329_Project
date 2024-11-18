import { Link } from "react-router-dom";

export default function Card({ title, goto, text }: { title: string, goto: string, text: string }) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{text}</p>
            </div>
            <Link to={goto} className="btn btn-primary">Go to {title}</Link>
        </div>
    )
}