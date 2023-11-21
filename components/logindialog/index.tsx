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

const SocialButton: React.FC<SocialButtonProps> = ({ provider, action, isLogin, icon }) => (
    <Button variant="custom" onClick={action} className="mt-2 w-full">
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="svg-container cursor-pointer mr-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 50 50"
                    className="fill-current transition duration-200 ease-in-out hover:fill-blue"
                >
                    {icon}
                </svg>
            </div>
            {isLogin ? `Login with ${provider}` : `Sign Up with ${provider}`}
        </div>
    </Button>);




export default function LoginDialog({ trigger, titles, loginControls, signUpControls, onSubmit, children, callWhenDone, callWhenError }: LoginDialogProps) {
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


    const GoogleIcon = () =>
        <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"></path>

    const FacebookIcon = () =>
        <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M37,19h-2c-2.14,0-3,0.5-3,2 v3h5l-1,5h-4v15h-5V29h-4v-5h4v-3c0-4,2-7,6-7c2.9,0,4,1,4,1V19z"></path>
    const InstagramIcon = () =>
        <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>

    const TwitterIcon = () =>
        <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>



    const LoginButtons = () => (
        <div>
            <SocialButton provider="Google" action={() => handleSocialLogin(signUpWithGoogle)} isLogin icon={<GoogleIcon />} />
            <SocialButton provider="Facebook" action={() => handleSocialLogin(signUpWithFacebook)} isLogin icon={<FacebookIcon />} />
            <SocialButton provider="Twitter" action={() => handleSocialLogin(signUpWithTwitter)} isLogin icon={<TwitterIcon />} />
            {/* <SocialButton provider="Instagram" action={() => socialLogin('Instagram')} isLogin icon={<InstagramIcon />} /> */}
        </div>
    );

    const SignUpButtons = () => (
        <div>
            <SocialButton provider="Google" action={() => handleSocialSignUp(signUpWithGoogle)} isLogin={false} icon={<GoogleIcon />} />
            <SocialButton provider="Facebook" action={() => handleSocialSignUp(signUpWithFacebook)} isLogin={false} icon={<FacebookIcon />} />
            <SocialButton provider="Twitter" action={() => handleSocialSignUp(signUpWithTwitter)} isLogin={false} icon={<TwitterIcon />} />
            {/* <SocialButton provider="Instagram" action={() => socialLogin('Instagram')} isLogin={false} icon={<InstagramIcon />} /> */}
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
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
