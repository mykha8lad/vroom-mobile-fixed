export const validateUsername = (text: string,
    setUsernameError: (error: string) => void,
    setUserName: (name: string) => void
) => {        
    const usernameRegex = /^[a-zA-Z0-9._-]+$/;

    if (text.length < 1 || text.length > 20) {
        setUsernameError('Username must contain 1-20 characters');
    } else if (!usernameRegex.test(text)) {
        setUsernameError('Username contains unsupported characters');
    } else {
        setUsernameError('');
    }

    setUserName(text);
}; 