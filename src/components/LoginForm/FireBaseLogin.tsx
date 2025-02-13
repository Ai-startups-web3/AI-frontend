import { Button } from "@mui/material";
import { signInWithGoogle } from "../../services/firebase";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../lib/slices/auth/authSlice";

const FireBaseLogin = () => {

    const dispatch = useDispatch()
    
    const signIn= async()=>{
        const user = await signInWithGoogle();
        if (user) {
          const tokenDetails = {
            user: user.displayName,
            token: {
              accessToken: await user.getIdToken(), 
              refreshToken: user.refreshToken,
            },
            userType: "user", // Or any logic to determine userType
            isLoading: false, // Set to false after login completes
          };
          dispatch(setCredentials(tokenDetails)); // Dispatching to Redux
        }
    }

    return (
        <Button variant="contained" color="primary" onClick={signIn}>
            Sign in with Google
        </Button>
    );
};

export default FireBaseLogin;
