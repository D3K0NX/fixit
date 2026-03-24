import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const navigate=useNavigate()
    
    const handleHomeClick = () => {
        navigate('/admin');
    }
    
    const handleUsersClick = () => {
        navigate('/admin/users');
    }

    return(
        <div className="container py-4">
            <h1 className="mb-0 fw-bold text-fixit-orange">Admin Dashboard</h1>
            <div className="row">
                <div className="col-md-2 shadow adm-panel">
                    <hr />
                    <h6 onClick={handleHomeClick}>Home</h6>
                    <hr />
                    <h6 onClick={handleUsersClick}>Users</h6>
                    <hr />
                    <h6>Update Product</h6>
                    <hr />
                </div>
                <div className="col-md-10 shadow adm-panel">
                    
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct