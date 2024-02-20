const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 shadow-lg">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute mx-auto bg-gray-950 p-4 rounded-lg z-10 text-right">
            <button
              className="text-white font-semibold hover:text-red-700 focus:outline-none mr-2"
              onClick={onClose}
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
