export const validatePassword = (text: string,
    setPasswordError: (error: string) => void,
    setPassword: (password: string) => void
) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*)[A-Za-z\d_]{8,12}$/;
    const startsWithNumberOrSpecial = /^[^A-Za-z]/;

    if (startsWithNumberOrSpecial.test(text) || !passwordRegex.test(text)) {
        setPasswordError('Please enter a valid password');        
    } else {
        setPasswordError('');
    }

    setPassword(text);
};