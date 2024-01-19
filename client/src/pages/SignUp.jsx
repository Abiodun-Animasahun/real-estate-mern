import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { DarkModeContext } from "../components/DarkModeContext";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useContext(DarkModeContext);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className={`${isDarkMode && "dark"}`}>
      <div className="dark:bg-slate-800 h-screen">
        <div className="p-3 max-w-lg mx-auto ">
          <h1 className="text-3xl text-center font-semibold my-7 dark:text-gray-100">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <input
                type="text"
                placeholder="first name"
                className="border p-3 rounded-lg w-full"
                id="firstName"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="last name"
                className="border p-3 rounded-lg w-full"
                id="lastName"
                onChange={handleChange}
              />
            </div>
            <input
              type="email"
              placeholder="email"
              className="border p-3 rounded-lg"
              id="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              className="border p-3 rounded-lg"
              id="password"
              onChange={handleChange}
            />
            <button
              disabled={loading}
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "loading..." : "Sign up"}
            </button>
            <OAuth />
          </form>
          <div className="flex gap-2 mt-5">
            <p className="dark:text-gray-100">Have an account?</p>
            <Link to={"/sign-in"}>
              <span className="text-blue-700 dark:text-blue-300">Sign in</span>
            </Link>
          </div>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>
    </div>
  );
}
