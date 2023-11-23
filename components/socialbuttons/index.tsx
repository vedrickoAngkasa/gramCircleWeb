import { Button } from "../ui/button";
import { BeatLoader } from 'react-spinners';
interface SocialButtonProps {
    provider: string;
    action: () => void;
    isLogin: boolean;
    icon: React.ReactNode; // SVG code for the icon    
    height?: number;
    width?: number;
    busy?: boolean;
}

export const SocialButton: React.FC<SocialButtonProps> = ({ provider, action, isLogin, icon, height = 20, width = 20, busy }) => {
    return (
        <Button variant="custom" onClick={action} className="mt-2 w-full">
            {busy ? (
                <div className="inset-0 flex items-center justify-center">
                    <BeatLoader color={'#000000'} />
                </div>
            ) : (
                <div className="flex">
                    <div className="svg-container cursor-pointer mr-4">{icon}</div>
                    <div className="flex-1">{isLogin ? `Login with ${provider}` : `Sign Up with ${provider}`}</div>
                </div>
            )}
        </Button>
    );
};
