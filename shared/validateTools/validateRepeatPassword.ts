export const validateRepeatPassword = (text: string,
    password: string,
    setRepeatPasswordError: (error: string) => void,
    setRepeatPassword: (repeatPassword: string) => void
) => {
    if (text !== password) {
        setRepeatPasswordError("Passwords don't match");
    } else {
        setRepeatPasswordError('');
    }

    setRepeatPassword(text);
};