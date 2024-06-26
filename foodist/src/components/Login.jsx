import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const auth = getAuth();
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      toast.success("Logging you in");
      navigate("/checkout");
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
    }
  }
  const provider = new GoogleAuthProvider();
  function handleGoogleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  return (
    <div>
      <Toaster />
       <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
   <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
      <div>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      onChange={(e) => setemail(e.target.value)}
                      type="email"
                      name="email"
                      value={email}
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      onChange={(e) => setpassword(e.target.value)}
                      type="password"
                      name="password"
                      value={password}
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required=""
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-gray-500 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Forgot password?
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="bg-slate-500 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                  <span
                    onClick={handleGoogleLogin}
                    className="mt-2  cursor-pointer hover:text-slate-200"
                  >
                    sign in with google
                  </span>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?
                    <Link to="/signup">
                      <span
                        href="#"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign up
                      </span>
                    </Link>
                  </p>
                  <div className="flex justify-between text-slate-300">
                    <span>Demo credentials</span>
                    <div className="flex flex-col">
                      <span>email:testuser@gmail.com</span>
                      <span>password: testtest</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
