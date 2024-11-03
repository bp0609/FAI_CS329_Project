
interface showAlertProps {
    showAlert: (message: string, type: string) => void | null;
}
export default function About({showAlert}: showAlertProps) {
    return (
        <div>
            <h1 className='text-center'>
                About COA-GUITool
            </h1>
            <button className='btn btn-primary' onClick={() => showAlert('This is a message', 'success')}>Show Alert</button>
        </div>
    )
}
