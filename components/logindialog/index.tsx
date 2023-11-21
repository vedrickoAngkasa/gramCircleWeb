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
import { GoogleIcon, FacebookIcon, TwitterIcon } from '@/app/icons';
import { useForm } from 'react-hook-form';
import CustomForm from '@/components/customform';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { initFirebase } from '@/lib/db';
import Privacy from '@/app/privacy';
import Terms from '@/app/terms';
import { ModalBox } from '@/components/modal';
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
    titles: string[];
    loginControls: FormControl[];
    signUpControls: FormControl[];
    onSubmit?: (data: Record<string, string>) => Promise<boolean>; // Update the type to return a Promise<boolean>
    children?: JSX.Element[];
    callWhenDone?: (value: boolean) => void;
    callWhenError?: (value: string) => void;
};

import { ArrowRight, ArrowLeft, UserCheck } from 'lucide-react';
interface SocialButtonProps {
    provider: string;
    action: () => void;
    isLogin: boolean;
    icon: React.ReactNode; // SVG code for the icon
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, action, isLogin, icon }) => {
    return (<Button variant="custom" onClick={action} className="mt-2 w-full">
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="svg-container cursor-pointer mr-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 50 50"
                    className="fill-current transition duration-200 ease-in-out hover:fill-blue"
                >
                    {icon}
                </svg>
            </div>
            {isLogin ? `Login with ${provider}` : `Sign Up with ${provider}`}
        </div>
    </Button>);
}




export default function LoginDialog({ trigger, titles, loginControls, signUpControls, onSubmit, children, callWhenDone, callWhenError }: LoginDialogProps) {
    const app = initFirebase();
    const auth = getAuth(app as any);
    const [showTerms, setShowTerms] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);

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

    const handleSubmit = async (data: Record<string, string>) => {
        if (onSubmit) {
            const ret = await onSubmit(data);
            if (ret)
                setOpen(false);
            return;
        }
        setOpen(false);
    }
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [open, setOpen] = useState(false);

    const LoginButtons = () => (
        <div>
            <SocialButton provider="Google" action={() => handleSocialLogin(signUpWithGoogle)} isLogin icon={<GoogleIcon />} />
            <SocialButton provider="Facebook" action={() => handleSocialLogin(signUpWithFacebook)} isLogin icon={<FacebookIcon />} />
            <SocialButton provider="Twitter" action={() => handleSocialLogin(signUpWithTwitter)} isLogin icon={<TwitterIcon />} />
        </div>
    );

    const SignUpButtons = () => (
        <div>
            <SocialButton provider="Google" action={() => handleSocialSignUp(signUpWithGoogle)} isLogin={false} icon={<GoogleIcon />} />
            <SocialButton provider="Facebook" action={() => handleSocialSignUp(signUpWithFacebook)} isLogin={false} icon={<FacebookIcon />} />
            <SocialButton provider="Twitter" action={() => handleSocialSignUp(signUpWithTwitter)} isLogin={false} icon={<TwitterIcon />} />
        </div>
    );

    const handleSocialLogin = async (socialLoginFunction: any) => {
        try {
            await socialLoginFunction(
                () => {
                    // On successful login
                    console.log('Successfully logged in!');
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
                        {isSignInForm ? titles[0] : titles[1]}
                    </h1>
                    <div className="w-full flex-1 mt-8 ">
                        <div className="mx-auto max-w-xs">
                            <CustomForm buttons={isSignInForm ? <LoginButtons /> : <SignUpButtons />} formControls={isSignInForm ? loginControls : signUpControls} onSubmit={handleSubmit} onCancel={() => { setOpen(false) }} >{children}</CustomForm>
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
                            <div className="mb-2 mt-4 w-full">
                                <div className="text-center">
                                    <p className="bottom-1 text-xs text-gray-600 text-center">
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
    );
}
