export const validateEmail = (text: string,
    setEmailError: (error: string) => void,
    setEmail: (email: string) => void
) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
        setEmailError('Please enter a valid email');
    } else {
        setEmailError('');
    }
    setEmail(text);
};