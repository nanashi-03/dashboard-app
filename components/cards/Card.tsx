import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
    children: ReactNode;
    className?: string;
};

export const Card = ({ children, className = '' }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className={clsx('rounded-2xl bg-white p-4 shadow-md transition-all', className)}
        >
            {children}
        </motion.div>
    );
};

export const MotionlessCard = ({ children, className = '' }: Props) => {
    return (
        <div
            className={clsx(
                'rounded-2xl bg-white p-4 shadow-md transition-all dark:bg-gray-900',
                className,
            )}
        >
            {children}
        </div>
    );
};
