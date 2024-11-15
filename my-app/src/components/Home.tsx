import Board from "./Board";
interface HomeProps {
    showAlert: (message: string, type: string) => void | null;
}

export default function Home({ showAlert }: HomeProps) {
    return (
        <>
            <h1 className='text-center'>
                FAI-App
            </h1>
            <Board />
            <button className='btn btn-primary' onClick={() => showAlert('This is a message', 'success')}>Show Alert</button>
        </>
    )
}