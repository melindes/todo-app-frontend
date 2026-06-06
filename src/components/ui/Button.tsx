interface ButtonProps {
    children  : React.ReactNode;
    onClick  ?: () => void;
    type     ?: 'button' | 'submit';
    variant  ?: 'primary' | 'danger' | 'success' | 'warning';
    disabled ?: boolean;
    fullWidth?: boolean;
}

const variants = {
    primary : 'bg-blue-600 hover:bg-blue-700 text-white',
    danger  : 'bg-red-500 hover:bg-red-600 text-white',
    success : 'bg-green-500 hover:bg-green-600 text-white',
    warning : 'bg-yellow-500 hover:bg-yellow-600 text-white',
};

const Button = ({
    children,
    onClick,
    type      = 'button',
    variant   = 'primary',
    disabled  = false,
    fullWidth = false,
}: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                px-4 py-2 rounded-lg font-medium text-sm
                transition-colors duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                ${variants[variant]}
                ${fullWidth ? 'w-full' : ''}
            `}
        >
            {children}
        </button>
    );
};

export default Button;