import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const LoadingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/home"); 
        }, 4000);

        return () => clearTimeout(timer); 
    }, [navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2 className="font-bold text-3xl">Welcome to the Padickaparambil Family</h2>
        </div>
    );
};

export default LoadingPage;
