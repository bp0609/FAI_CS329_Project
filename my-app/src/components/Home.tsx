
interface HomeProps {
    showAlert: (message: string, type: string) => void | null;
}

export default function Home({ showAlert }: HomeProps) {
    return (
        <div>
            <h1 className='text-center'>
                Home FAI-App
            </h1>
            <button className='btn btn-primary' onClick={() => showAlert('This is a message', 'success')}>Show Alert</button>
        </div>
    )
}