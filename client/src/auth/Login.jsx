import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/authContext";


export function Login() {



    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        if ( new Date(auth.expDate) >= new Date()) {
            console.log(new Date(auth.expDate));
            navigate('/dashboard');
        }
    }, [auth.expDate, navigate]);


    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { loginSubmitHandler } = useContext(AuthContext);

    const handleContentChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        loginSubmitHandler(formData);
    }

    return (
        <main>
            <div className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">Вход в системата</h5>
                                            <p className="text-center small">Въведете данни за вход</p>
                                        </div>
                                        <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
                                            <div className="col-12">
                                                <label htmlFor="yourUsername" className="form-label">Потребителско име</label>
                                                <div className="input-group has-validation">
                                                    <input type="text" name="username" id="username" className="form-control" value={formData.username} onChange={handleContentChange} required />
                                                    <div className="invalid-feedback">Въведете потребителско име</div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="yourPassword" className="form-label">Парола</label>
                                                <input type="password" name="password" id="password" className="form-control" value={formData.password} onChange={handleContentChange} required />
                                                <div className="invalid-feedback">Въведете парола!</div>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100" type="submit">Вход</button>
                                            </div>
                                            <div className="col-12">
                                                <p className="small mb-0">Нямате акаунт - свържете се с администратор</p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="credits">
                                    <a href="https://is-bg.net">Община Провадия</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
export default Login;