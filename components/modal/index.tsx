import { FormEvent, useState, useEffect, ReactNode } from 'react';

export const ModalBox = ({
  header,
  children,
  showModal,
  onClose,
  style,
  icon,
  isLoader,
  showLogo = false,
}: {
  header?: string;
  children: ReactNode;
  showModal: boolean;
  onClose?: (value: boolean) => void;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  isLoader?: boolean;
  showLogo?: boolean;
}) => {
  const [isModalOpen, setModalOpen] = useState(showModal);
  const handleCloseModal = () => {
    setModalOpen(false);
    console.log('handleCloseModal', isModalOpen);
    if (onClose) {
      onClose(false);
    }
  };

  if (!isModalOpen) {
    // console.log('this is modal returning null', header, isModalOpen);
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center h-screen bg-black bg-opacity-60"
      style={{ zIndex: 9999 }}>
      <div
        className="dark:bg-gray-800 dark:border-gray-600 dark:text-white bg-white border-x border-y border-black rounded-2xl"
        style={{ ...style }}>
        {header?.length && (
          <div
            className={`flex pb-4 pl-2 dark:border-gray-200 border-b mb-4 flex-row items-center justify-start ml-4`}>
            <div className="dark:text-white text-black mr-2 font-semibold text-2xl rounded-t-lg">
              {icon}
            </div>

            <p className="dark:text-white ml-4 flex-1 text-black font-semibold text-2xl rounded-t-lg bg-red-00 justify-start items-start text-left">
              {header}
            </p>
            <div className="w-100 flex items-center justify-end p-2 mr-4">
              {onClose && (
                <button
                  className={`rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-200 dark:hover:text-black`}
                  onClick={handleCloseModal}>
                  <svg
                    className={`fill-current dark:text-white text-black w-6 h-6 dark:hover:text-black`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 18 18">
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
        {showLogo && (
          <div className="flex items-center justify-center mb-4">
            <svg
              className="fill-current h-10 w-10 mr-2 text-black-200"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
            </svg>
            {/* <h1 className="font-semibold text-3xl tracking-tight text-black-200 ">chatc</h1> */}
          </div>
        )}
        <div className="flex-grow">
          <div className="flex items-start justify-center h-full">{children}</div>
        </div>
        {/* <div className="py-2 mx-8 mb-0 mt-4">
          <div className="text-center">
            <p className="bottom-1 m-0 text-xs text-gray-600 text-center"></p>
          </div>
        </div> */}
      </div>
    </div>
  );
};
