import { useEffect } from "react";
import { useNavigate } from "react-router-dom"


const Admin = () => {
    const navigate=useNavigate()
    useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          navigate('/signin');
        }else if (user[0].role === 'user'){
            navigate('/')
        }
        // console.log(user[0].role)
    }, [navigate]);

    const handleUsersClick = () => {
        navigate('/admin/users');
    }

    const handleUpdateClick = ( ) => {
        navigate('/admin/update_product')
    }
    return (
        <div className="container py-4">
            <h1 className="mb-0 fw-bold text-fixit-orange">Admin Dashboard</h1>
            <div className="row">
                <div className="col-md-2 shadow adm-panel">
                    <hr />
                    <h6>Home</h6>
                    <hr />
                    <h6 onClick={handleUsersClick}>Users</h6>
                    <hr />
                    <h6 onClick={handleUpdateClick}>Update Product</h6>
                    <hr />
                </div>
                <div className="col-md-10 shadow adm-panel">
                    
                </div>
            </div>
        </div>
    )
    
}
export default Admin