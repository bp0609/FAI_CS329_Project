
export default function Dropdown({ options, selected, setSelected }: { options: string[], selected: string, setSelected: (selected: string) => void }) {
    return (
        <div className="container">
            <select id={selected} className={`form-select`} value={selected} onChange={(e) => setSelected(e.target.value)} >
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}