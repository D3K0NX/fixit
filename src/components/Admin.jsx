import { useEffect } from "react";
import { useNavigate } from "react-router-dom"


const Admin = () => {
    const navigate=useNavigate()
    useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          navigate('/signin');
        }
    }, [navigate]);
    return (
        <div className="container py-4">
            <h1 className="mb-0 fw-bold text-fixit-orange">Admin Dashboard</h1>
            <div className="row">
                <div className="col-md-2 shadow adm-panel">
                    <h6>Home</h6>
                </div>
            </div>
        </div>
    )
    
}
export default Admin