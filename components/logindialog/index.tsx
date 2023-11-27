import React, { useState, ReactNode, useEffect, FormEvent } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { BeatLoader } from 'react-spinners';
import { GoogleIcon, FacebookIcon, EmailIcon, TwitterIcon } from '@/app/icons';
import { Mail, Twitter, Facebook, Dribbble } from 'lucide-react';
import { useForm } from 'react-hook-form';
import CustomForm from '@/components/customform';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { initFirebase } from '@/lib/db';
import Privacy from '@/app/privacy';
import Terms from '@/app/terms';
import { ModalBox } from '@/components/modal';
import { SocialButton } from '../socialbuttons/';
import FloatingInput from '../floatinginput';
import {
    getAuth,
    signInWithRedirect,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    FacebookAuthProvider,
    TwitterAuthProvider,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
    sendPasswordResetEmail,
} from 'firebase/auth';

type FormControl = {
    label: string;
    name: string;
    type: string;
    error?: string;
    value?: string;
};

type LoginDialogProps = {
    trigger?: JSX.Element;
    titles: string[];
    loginControls: FormControl[];
    signUpControls: FormControl[];
    onSubmit?: (data: Record<string, string>) => Promise<boolean>; // Update the type to return a Promise<boolean>
    children?: JSX.Element[];
    callWhenDone?: (value: boolean) => void;
    callWhenError?: (value: string) => void;
    error?: string;
};

export default function LoginDialog({ trigger, titles, loginControls, signUpControls, onSubmit, children, callWhenDone, callWhenError, error }: LoginDialogProps) {
    const app = initFirebase();
    const auth = getAuth(app as any);
    const [showTerms, setShowTerms] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [loginError, setLoginError] = useState(error);
    const [resetPassword, setResetPassword] = useState(false);
    const [busy, setBusy] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])

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

    type SignUpCallback = (success: boolean) => void;
    type ErrorCallback = (errorMessage: string) => void;

    const signUpWithGoogle = async (onSignUp: SignUpCallback, onError: ErrorCallback): Promise<void> => {
        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({
                prompt: 'select_account',
            });

            const result = await signInWithPopup(auth, provider);
            console.log('User signed in successfully with Google');
            const user = result.user;
            console.log(user);
            // Access Google Access Token using credential.accessToken
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (credential) {
                const token = credential.accessToken;
                console.log(token);
            }
            if (onSignUp) {
                onSignUp(true);
            }
        } catch (error: any) {
            // Handle errors
            // const errorCode = (error as FirebaseError).code;
            // console.error(errorCode);
            // const errorMessage = (error as FirebaseError).message;
            if (onError) {
                onError(error.message);
            }

        }
    };

    const signUpWithFacebook = async (onSignUp: SignUpCallback, onError: ErrorCallback): Promise<void> => {
        try {
            const provider = new FacebookAuthProvider();
            provider.setCustomParameters({
                display: 'popup',
            });

            const result = await signInWithPopup(auth, provider);
            console.log('User signed in successfully with Facebook');
            const user = result.user;
            console.log(user);
            // Access Facebook-specific information using getAdditionalUserInfo(result)
            if (onSignUp) {
                onSignUp(true);
            }
        } catch (error: any) {
            // Handle errors
            // const errorCode = (error as FirebaseError).code;
            // console.error(errorCode);
            // const errorMessage = (error as FirebaseError).message;
            if (onError) {
                onError(error.message);
            }
        }
    };

    const signUpWithTwitter = async (onSignUp: SignUpCallback, onError: ErrorCallback): Promise<void> => {
        try {
            const provider = new TwitterAuthProvider();

            const result = await signInWithPopup(auth, provider);
            console.log('User signed in successfully with Twitter');
            const user = result.user;
            console.log(user);
            // Access Twitter-specific information using getAdditionalUserInfo(result)
            if (onSignUp) {
                onSignUp(true);
            }
        } catch (error: any) {
            // Handle errors
            // const errorCode = (error as FirebaseError).code;
            // console.error(errorCode);
            // const errorMessage = (error as FirebaseError).message;
            if (onError) {
                onError(error.message);
            }
        }
    };

    const handlePasswordReset = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const ret = await sendPasswordResetEmail(auth, email, {
            url: 'https://localhost:3000/',
            handleCodeInApp: false
        })
        setResetPassword(false);
    };

    const handleSubmit = async (formData: Record<string, string>) => {
        setBusy(true);
        try {
            if (isSignInForm) {
                const res = await signInWithEmailAndPassword(auth, formData.email, formData.password);
                toast('Login successful with email and password');
            } else {
                await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                toast('Account successfully created with email and password');
            }
        } catch (error: any) {
            setLoginError(error.message);
            toast.error(error.message);
            setBusy(false)
            return false;
        }
        setBusy(false);
        return true;
    }
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [open, setOpen] = useState(false);

    const LoginButtons = () => (
        <div>
            <SocialButton provider="Email" busy={busy} action={() => handleSocialLogin(null)} isLogin icon={<Mail size={20} />} />
            <div className="mb-2 mt-4">
                <div className="flex items-center">
                    <div className="flex-1 h-0.5 bg-gray-300"></div>
                    <div className="mx-4 text-gray-500">or</div>
                    <div className="flex-1 h-0.5 bg-gray-300"></div>
                </div>
            </div>
            <SocialButton provider="Google" action={() => handleSocialLogin(signUpWithGoogle)} isLogin icon={<GoogleIcon />} />
            <SocialButton provider="Facebook" action={() => handleSocialLogin(signUpWithFacebook)} isLogin icon={<FacebookIcon />} />
            <SocialButton provider="Twitter" action={() => handleSocialLogin(signUpWithTwitter)} isLogin icon={<TwitterIcon />} />
        </div>
    );

    const SignUpButtons = () => (
        <div>
            <SocialButton provider="Email" action={() => handleSocialLogin(null)} isLogin={false} icon={<Mail size={20} />} />
            <div className="mt-4 mb-2">
                <div className="flex items-center">
                    <div className="flex-1 h-0.5 bg-gray-300"></div>
                    <div className="mx-4 text-gray-500">or</div>
                    <div className="flex-1 h-0.5 bg-gray-300"></div>
                </div>
            </div>
            <SocialButton provider="Google" action={() => handleSocialSignUp(signUpWithGoogle)} isLogin={false} icon={<GoogleIcon />} />
            <SocialButton provider="Facebook" action={() => handleSocialSignUp(signUpWithFacebook)} isLogin={false} icon={<FacebookIcon />} />
            <SocialButton provider="Twitter" action={() => handleSocialSignUp(signUpWithTwitter)} isLogin={false} icon={<TwitterIcon />} />
        </div>
    );

    const handleSocialLogin = async (socialLoginFunction: any) => {
        setBusy(true);
        try {
            await socialLoginFunction(
                () => {
                    // On successful login
                    console.log('Successfully logged in!');
                    return false;
                },
                (errorMessage: any) => {
                    // On login error
                    console.error(`Error logging in: ${errorMessage}`);
                }
            );
        } catch (error) {
            // Handle unexpected errors
            console.error('Unexpected error:', error);
        }
        setBusy(false);
    };

    const handleSocialSignUp = async (socialSignUpFunction: any) => {
        try {
            await socialSignUpFunction(
                () => {
                    // On successful sign-up
                    console.log('Successfully signed up!');
                },
                (errorMessage: any) => {
                    // On sign-up error
                    console.error(`Error signing up: ${errorMessage}`);
                }
            );
        } catch (error) {
            // Handle unexpected errors
            console.error('Unexpected error:', error);
        }
    };

    if (showTerms) {
        return (
            <ModalBox
                header="Terms of Services"
                showModal={showTerms}
                onClose={() => setShowTerms(prev => !prev)}
                style={{
                    width: '70%',
                    height: '90vh',
                    overflowY: 'auto',
                    padding: '20px',
                }}>
                <Terms />
            </ModalBox>
        )
    }
    if (showPrivacy) {
        return (
            <ModalBox
                header="Privacy Policy"
                showModal={showPrivacy}
                onClose={() => setShowPrivacy(prev => !prev)}
                style={{
                    width: '70%',
                    height: '90vh',
                    overflowY: 'auto',
                    padding: '20px',
                }}>
                <Privacy />
            </ModalBox>
        )
    }

    return mounted && (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    {trigger}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center">

                        {loginError ? <div><p className="rounded-sm resize-none w-full p-2 mb-2 bg-red text-center text-white text-sm font-light">{loginError}</p><div className="flex w-full justify-center items-center bg-red-200 p-2">
                            <div className="text-red text-sm font-bold cursor-pointer px-4" onClick={() => { setResetPassword(true) }}>Forgot Password? Click here to reset</div>
                        </div></div> : <h1 className="font-semibold text-3xl tracking-tight text-black-200">
                            {isSignInForm ? titles[0] : titles[1]}
                        </h1>
                        }

                        <div className="w-full flex-1 mt-8 ">
                            <div className="mx-auto max-w-xs">
                                <CustomForm buttons={isSignInForm ? <LoginButtons /> : <SignUpButtons />} formControls={isSignInForm ? loginControls : signUpControls} onSubmit={handleSubmit} onCancel={() => { setOpen(false) }} >{children}</CustomForm>
                                <div className="w-full flex-1 text-center">
                                    <div className="leading-none px-2 py-2 mt-p inline-block text-sm text-center">
                                        {isSignInForm ? (
                                            <>
                                                <p className="text-black py-4 text-xs">
                                                    Do not have an account?{' '}
                                                    <a
                                                        className="cursor-pointer text-red"
                                                        onClick={() => setIsSignInForm(prev => !prev)}>
                                                        Sign up now
                                                    </a>
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-black py-4 text-xs">
                                                    Already have an account?{' '}
                                                    <a
                                                        className="cursor-pointer text-red"
                                                        onClick={() => setIsSignInForm(prev => !prev)}>
                                                        Login here!
                                                    </a>
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-2 mt-4 w-full">
                                    <div className="text-center">
                                        <p className="bottom-1 text-[0.5rem] text-gray-600 text-center">
                                            I agree to abide by Gram Circle {' '}
                                            <div
                                                className="inline-block border-b border-gray-500 border-dotted cursor-pointer"
                                                onClick={() => setShowTerms(prev => !prev)}>
                                                Terms of Service
                                            </div>{' '}
                                            and its{' '}
                                            <div
                                                className="inline-block border-b border-gray-500 border-dotted cursor-pointer"
                                                onClick={() => setShowPrivacy(prev => !prev)}>
                                                Privacy Policy
                                            </div>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={resetPassword} onOpenChange={setResetPassword}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Reset Password</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={handlePasswordReset}
                    >
                        <div>
                            <Input
                                className="w-full border border-gray-400 my-2 rounded-none"
                                placeholder='Your E-mail address'
                                type="email"
                                id="email"
                                name="email"
                                required
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="custom" type="button" onClick={() => setResetPassword(false)}>
                                Cancel
                            </Button>
                            <Button variant="custom" type="submit">Reset Password</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
