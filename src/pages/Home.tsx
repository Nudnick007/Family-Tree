import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-6">Welcome to the Home Page!</h1>

            <button
                onClick={() => navigate("/family-tree")}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
            >
                Go to Family Tree
            </button>
        </div>
    );
};

export default Home;
