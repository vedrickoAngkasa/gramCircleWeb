import { Button } from "../ui/button";
interface SocialButtonProps {
    provider: string;
    action: () => void;
    isLogin: boolean;
    icon: React.ReactNode; // SVG code for the icon
}

export const SocialButton: React.FC<SocialButtonProps> = ({ provider, action, isLogin, icon }) => {
    return (
        <Button variant="custom" onClick={action} className="mt-2 w-full">
            <div className="flex items-center">
                <div className="svg-container cursor-pointer mr-4">
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
                <div>
                    {isLogin ? `Login with ${provider}` : `Sign Up with ${provider}`}
                </div>
            </div>
        </Button>
    );
};

