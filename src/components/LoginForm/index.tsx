import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../lib/slices/auth/authApiSlice';
import { LoginData } from '../../Datatypes/interface';
import { AppDispatch } from '../../lib/store';

import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { authLoading } from '../../lib/slices/auth/authSlice';

interface LoginProps {
  loginTitle: string;
  OnFormSuccess?:any;
}
const LoginForm: React.FC<LoginProps> = ({OnFormSuccess}) => {
  const dispatch = useDispatch(); // Explicitly type dispatch

  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');
  const isAuthLoading=useSelector(authLoading)
  
  useEffect(() => {
 
  }, [isAuthLoading]);
  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const loginData: LoginData = {
        email: email,
        password: password,
        OnFormSuccess,
      };

      // Dispatch the login action with correct action type
      (dispatch as AppDispatch)(loginUser(loginData));

    } catch (error) {
      setError("Unknown error detected.")
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  return (
    <div>
       <form noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login">Email Address</InputLabel>
              <OutlinedInput
                id="email-login"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                fullWidth
                error={error.includes('email')}
              />
              {error.includes('email') && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {error}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-login">Password</InputLabel>
              <OutlinedInput
                fullWidth
                error={error.includes('password')}
                id="-password-login"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <VisibilityOutlinedIcon /> : <RemoveRedEyeOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Enter password"
              />
              {error.includes('password') && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {error}
                </FormHelperText>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12} sx={{ mt: -1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                    size="small"
                  />
                }
                label={<Typography variant="h6">Keep me sign in</Typography>}
              />
              <Link target="_blank" href="https://discord.gg/cAtWtdxnEt" color="text.primary">
                Forgot Password?
              </Link>
            </Stack>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <FormHelperText error>{error}</FormHelperText>
            </Grid>
          )}
          <Grid item xs={12}>
            {/* <AnimateButton> */}
              <Button
                disableElevation
                fullWidth
                size="large"
                onClick={handleLoginSubmit}
                variant="contained"
                color="primary"
                disabled={isAuthLoading}
              >
                Login
              </Button>
            {/* </AnimateButton> */}
          </Grid>
          {/* <Grid item xs={12}>
            <Divider>
              <Typography variant="caption"> Login with</Typography>
            </Divider>
          </Grid> */}
          {/* <Grid item xs={12}>
            <FirebaseSocial />
          </Grid> */}
        </Grid>
      </form>
    </div>
  );
};

export default LoginForm;
