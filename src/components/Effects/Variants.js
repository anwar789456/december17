export const fadeIn = (direction, delay) => {
    return {
        hidden: {
            y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
            x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
            opacity: 0,
            scale: 1.5,
        },
        show: {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: 'tween',
                duration: 0.8,
                delay: delay,
                ease: [0.25, 0.25, 0.25, 0.75],
            }
        }
    }
}
