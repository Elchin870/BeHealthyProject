import 'bootstrap/dist/css/bootstrap.min.css';

const Unauthorized = () => (
    <div className="container text-center mt-5">
        <div className="card shadow p-4">
            <h2 className="text-warning">401 - Unauthorized</h2>
            <p className="text-muted">You must log in to view this page.</p>
            <a href="/" className="btn btn-outline-success mt-3">Login</a>
        </div>
    </div>
);

export default Unauthorized;
