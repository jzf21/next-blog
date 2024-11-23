//signup with axios

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const response = await axios.post("http://localhost:8000/api/auth/signup", {
            email,
            password,
        });
        console.log(response.data);
        router.push("/login");
        } catch (error) {
        console.error(error);
        }
    };
    
    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
        <form
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-lg shadow-md w-96"
        >
            <h2 className="text-2xl font-semibold mb-10 text-center">Signup</h2>
            <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
            </label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            </div>
            <div className="mb-5">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
            </label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md">
            Signup
            </button>
        </form>
        </div>
    );
    }



