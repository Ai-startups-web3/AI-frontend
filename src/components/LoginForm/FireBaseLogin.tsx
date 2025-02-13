import { Button } from "@mui/material";
import { signInWithGoogle } from "../../services/firebase";

const FireBaseLogin = () => (

    <Button onClick={signInWithGoogle}>Sign in with Google</Button>

);

export default FireBaseLogin;
