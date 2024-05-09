import { Image } from 'primereact/image';
export default function SignalFiles({ signalFiles }) {
    return (
        <div className="card ">
            <div className=" d-flex flex-wrap p-3">
                <h4 className='w-100'>Прикачени файлове</h4>
                {signalFiles && signalFiles.length ? (
                    signalFiles.map((file, index) => (
                        <div key={index} className="w-100">
                            {file.extension === 'jpg' || file.extension === 'jpeg' || file.extension === 'png' || file.extension === 'gif' ? (
                                <div className="gap-2 flex justify-content-center">
                                    <div className="image-container">
                                        <Image src={`http://localhost:8000${file.path}`} alt="Image" width="150" preview />

                                    </div>
                                </div>
                            ) : (
                                <div className="card">
                                    <a href={`http://localhost:8000${file.path}`} download>
                                        Прикачен файл {index + 1} :   {file.filename}
                                    </a>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Няма прикачени файлове</p>
                )}
            </div>
        </div>
    )
}