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
            className={clsx(
                'rounded-2xl shadow-md p-4 bg-white dark:bg-gray-900 transition-all',
                className
            )}
        >
            {children}
        </motion.div>
    );
};
