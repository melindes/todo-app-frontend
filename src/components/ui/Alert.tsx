interface AlertProps {
    message : string;
    type   ?: 'error' | 'success' | 'warning';
}

const variants = {
    error   : 'bg-red-100 text-red-700 border-red-300',
    success : 'bg-green-100 text-green-700 border-green-300',
    warning : 'bg-yellow-100 text-yellow-700 border-yellow-300',
};

const icons = {
    error   : '❌',
    success : '✅',
    warning : '⚠️',
};

const Alert = ({ message, type = 'error' }: AlertProps) => {
    return (
        <div className={`
            p-3 rounded-lg border text-sm flex items-center gap-2
            ${variants[type]}
        `}>
            <span>{icons[type]}</span>
            <span>{message}</span>
        </div>
    );
};

export default Alert;