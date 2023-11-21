import React, { useState, ReactNode } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from 'react-hook-form';
import CustomForm from '@/components/customform';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { initFirebase } from '@/lib/db';
import {
    getAuth,
    signInWithRedirect,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
} from 'firebase/auth';

type FormControl = {
    label: string;
    name: string;
    type: string;
    error?: string;
    value?: string;
};

type LoginDialogProps = {
    trigger?: ReactNode; // Use ReactNode for dynamic content like buttons
    title?: string;
    controls: FormControl[];
    onSubmit?: (data: Record<string, string>) => Promise<boolean>; // Update the type to return a Promise<boolean>
    children?: JSX.Element[];
    callWhenDone?: (value: boolean) => void;
    callWhenError?: (value: string) => void;
};

export default function LoginDialog({ trigger, title, controls, onSubmit, children, callWhenDone, callWhenError }: LoginDialogProps) {
    const app = initFirebase();
    const auth = getAuth(app as any);

    const onSignUp = (value: boolean) => {
        if (callWhenDone) {
            callWhenDone(false);
        }
    };

    const onSignIn = (value: boolean) => {
        if (callWhenDone) {
            callWhenDone(false);
        }
    };

    const onError = (value: string) => {
        if (callWhenError) {
            callWhenError(value);
        }
    };

    const signUpWithGoogle = () => {
        var provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account',
        });

        signInWithPopup(auth, provider)
            .then(result => {
                console.log('User signed in successfully');
                const user = result.user;
                console.log(user);
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (credential) {
                    const token = credential.accessToken;
                    console.log(token);
                }
                if (onSignUp) {
                    onSignUp(true);
                }
                // The signed-in user info.
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch(error => {
                // Handle Errors here.
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = error.message;
                if (onError) {
                    onError(errorMessage);
                }
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center">
                    <h1 className="font-semibold text-3xl tracking-tight text-black-200">
                        {isSignInForm ? 'Welcome, Back.' : 'Create Account'}
                    </h1>

                    {/* <h1 className="font-normal py-1 text-md tracking-tight text-black-200">{isSignInForm ? "SignIn to continue..." : "Begin with new account"}</h1> */}
                    <div className="w-full flex-1 mt-8 ">
                        <div className="mx-auto max-w-xs">
                            {/* {isSignInForm ? <SignInForm onSignIn={onSignIn} onError={onError} /> : <SignUpForm onSignUp={onSignUp} onError={onError} />} */}
                            <form>
                                {/* <div className="flex items-center text-lg mb-6 md:mb-8 ">
                            <svg className="absolute ml-3 " width="20" viewBox="0 0 24 24">
                                <path fill='#ff0000' d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
                            </svg>
                            <input className="w-full text-sm rounded-sm pl-12 py-2 md:py-4 text-black border-b-2 border-black outline-none border-opacity-60 focus:bg-gray-50" type="text" name="name" placeholder="Name" />
                        </div> */}
                                {!isSignInForm && (
                                    <>
                                        <input
                                            className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-orange focus:bg-white"
                                            id="name"
                                            type="text"
                                            placeholder="Name"
                                        // {...register('name', { required: 'Name is required' })}
                                        />
                                        {/* {errors.name && (
                                            <p className="w-full text-red-500 text-xs mt-1">
                                                {String(errors?.name?.message)}
                                            </p>
                                        )} */}
                                    </>
                                )}
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-orange focus:bg-white mt-3"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                // {...register('email', { required: 'Email is required' })}
                                />
                                {/* {errors.email && (
                                    <p className="w-full text-red-500 text-xs mt-1">{String(errors.email.message)}</p>
                                )} */}
                                <input
                                    id="password"
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-orange focus:bg-white mt-3"
                                    type="password"
                                    placeholder="Password"
                                // {...register('password', { required: 'Password is required' })}
                                />
                                {/* {errors.password && (
                                    <p className="w-full  text-red-500 text-xs mt-1">{String(errors.password.message)}</p>
                                )} */}
                                {!isSignInForm && (
                                    <>
                                        <input
                                            id="conPpassword"
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-orange focus:bg-white mt-3"
                                            type="password"
                                            placeholder="Confirm Password"
                                        // {...register('conPassword', { required: 'Confirm password is required' })}
                                        />
                                        {/* {errors.conPassword && (
                                            <p className="w-full  text-red-500 text-xs mt-1">
                                                {String(errors.conPassword.message)}
                                            </p>
                                        )} */}
                                    </>
                                )}

                                <button
                                    type="submit"
                                    className="mt-5 tracking-wide font-semibold bg-orange text-white w-full py-4 rounded-lg hover:bg-white-700 transition-all duration-300 ease-in-out flex items-center justify-center hover:bg-orange focus:ring-4 focus:ring-orange mt-4 ">
                                    <svg
                                        className="w-6 h-6 -ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">
                                        {isSignInForm ? 'Login with E-mail' : 'Sign Up with E-mail'}
                                    </span>
                                </button>
                                <div className="flex flex-col items-center">
                                    <button
                                        onClick={signUpWithGoogle}
                                        className="w-full max-w-xs mt-3 font-bold shadow-sm rounded-lg py-3 bg-orange text-white hover: flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-orange focus:ring-4 focus:ring-orange">
                                        <div className="bg-white p-2 rounded-full">
                                            <svg className="w-4" viewBox="0 0 533.5 544.3">
                                                <path
                                                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                    fill="#4285f4"
                                                />
                                                <path
                                                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                    fill="#34a853"
                                                />
                                                <path
                                                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                    fill="#fbbc04"
                                                />
                                                <path
                                                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                    fill="#ea4335"
                                                />
                                            </svg>
                                        </div>
                                        <span className="ml-4">
                                            {isSignInForm ? 'Login with Google' : 'Sign Up with Google'}
                                        </span>
                                    </button>
                                </div>
                            </form>
                            <div className="w-full flex-1 text-center">
                                <div className="leading-none px-2 py-2 mt-p inline-block text-sm text-center">
                                    {isSignInForm ? (
                                        <>
                                            <p className="text-black py-4">
                                                Do not have an account?{' '}
                                                <a
                                                    className="text-orange cursor-pointer"
                                                    onClick={() => setIsSignInForm(prev => !prev)}>
                                                    Sign up now
                                                </a>
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-black py-4">
                                                Already have an account?{' '}
                                                <a
                                                    className="text-orange cursor-pointer"
                                                    onClick={() => setIsSignInForm(prev => !prev)}>
                                                    Login here!
                                                </a>
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
