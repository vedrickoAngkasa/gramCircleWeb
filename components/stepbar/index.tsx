import React from 'react';
import { CheckCircle } from 'lucide-react';
type StepBarProps = {
    current: number;
    labels: string[]
};

const StepBar: React.FC<StepBarProps> = ({ current, labels }) => {
    const Dot: React.FC<{ isFirst: boolean; isFull: boolean }> = ({ isFirst, isFull }) => {
        return (
            <div className={`bg-red-00 items-center justify-between ${isFirst ? 'justify-start' : 'flex justify-end'}`}>
                {isFull ? <CheckCircle color={'black'} size={20} /> : <div className={`border border-gray-400 h-5 w-5 rounded-full `}></div>}
            </div>
        );
    };

    return (
        <div>
            <div className="flex bg-red-00 items-center justify-between mb-2">
                {labels.map((label, index) => (
                    <React.Fragment key={index}>
                        <div><p className={`${index <= current ? 'text-black' : 'text-gray-400'} text-center w-full text-xs my-2 font-light`}>{label}</p></div>
                    </React.Fragment>
                ))}
            </div>
            <div className="flex bg-red-00 items-center justify-between mt-2">
                {labels.map((_, index) => (
                    <React.Fragment key={index}>
                        <Dot isFirst={index === 0} isFull={index <= current} />
                        {index < labels.length - 1 && <div className={`h-px w-full  ${index < current ? 'bg-black' : 'bg-gray-400'}`}></div>}
                    </React.Fragment>
                ))}
            </div>

        </div>

    )
};

export default StepBar;

