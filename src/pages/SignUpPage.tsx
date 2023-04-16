import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContainer } from '../components/Context';
import { routes } from '../data/routes';

const SignUpPage = () => {
  const { user, auth, db, signInWithGoogle, registerWithEmailAndPassword } =
    useAppContainer();
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [repeteUserPassword, setRepeteUserPassword] = useState('');
  // const [uploadedImg, setUploadedImg] = useState<Blob>();
  // const [newUserBio, setNewUserBio] = useState('');
  // const handleFileUpload = (e: any) => {
  //   const file = e.target.files && e.target.files[0];
  //   if (file) {
  //     setUploadedImg(file);
  //     console.log(URL.createObjectURL(file));
  //   }
  // };

  const handlesignInFormSubmit = (submitting: any) => {
    submitting.preventDefault();
    if (
      newUserPassword === repeteUserPassword &&
      newUserName !== '' &&
      newUserEmail !== ''
      // uploadedImg !== undefined
    ) {
      registerWithEmailAndPassword(newUserName, newUserEmail, newUserPassword);
      setNewUserEmail('');
      setNewUserName('');
      setNewUserPassword('');
      setRepeteUserPassword('');
    }
  };

  return (
    <div
      style={{
        background: 'rgb(112, 112, 228)',
        height: '100vh',
        position: 'relative',
      }}
    >
      {auth.currentUser && <div>you are already Signed In!</div>}

      <Box
        sx={{
          background: 'white',
          width: 'fit-content',
          margin: 'auto',
          padding: 3,
          position: 'relative',
          top: '50%',
          transform: 'translateY(-75%)',
          borderRadius: '25px',
          boxShadow: '8px 8px 12px -1px rgba(0,0,0,0.45)',
        }}
      >
        <Typography variant='h5' color='black'>
          Sign Up
        </Typography>
        <form className='LogInForm' onSubmit={handlesignInFormSubmit}>
          <input
            type='text'
            placeholder='Name'
            value={newUserName}
            onChange={e => setNewUserName(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={newUserPassword}
            onChange={e => setNewUserPassword(e.target.value)}
          />
          <input
            type='password'
            placeholder='Repete your password'
            value={repeteUserPassword}
            onChange={e => setRepeteUserPassword(e.target.value)}
          />
          <input
            type='email'
            placeholder='Email'
            value={newUserEmail}
            onChange={e => setNewUserEmail(e.target.value)}
          />
          {/* <input
            type='file'
            style={{ border: 'none', color: 'black' }}
            onChange={handleFileUpload}
          />
          <textarea
            cols={30}
            rows={5}
            placeholder='description'
            value={newUserBio}
            style={{ borderRadius: '15px', padding: '8px' }}
            onChange={text => setNewUserBio(text.target.value)}
          /> */}
          <input type='submit' />
        </form>
        <button onClick={signInWithGoogle}>Sign Up with Google</button>
        <Typography variant='body2' color='black' sx={{ marginTop: 2 }}>
          You already have a profile? Just {'  '}
          <Link to={routes.logIn} className='LogInSignUpLink'>
            Log in!
          </Link>
        </Typography>
      </Box>
    </div>
  );
};
export default SignUpPage;
