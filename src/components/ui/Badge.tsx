interface BadgeProps {
    label   : string;
    variant : 'yellow' | 'blue' | 'green' | 'red' | 'gray' | 'orange';
}

const variants = {
    yellow : 'bg-yellow-100 text-yellow-800',
    blue   : 'bg-blue-100 text-blue-800',
    green  : 'bg-green-100 text-green-800',
    red    : 'bg-red-100 text-red-800',
    gray   : 'bg-gray-100 text-gray-800',
    orange : 'bg-orange-100 text-orange-800',
};

const Badge = ({ label, variant }: BadgeProps) => {
    return (
        <span className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${variants[variant]}
        `}>
            {label}
        </span>
    );
};

export default Badge;