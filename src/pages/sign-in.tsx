import { toast } from 'react-toastify';
import { useState } from 'react';
import FormSignIn from '@/src/components/forms/FormSignIn';
import FormSignUp from '@/src/components/forms/FormSignUp';
import styles from '../components/forms/Form.module.css';

const showSuccess = () => {
  toast.success('Successful Login!', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
    hideProgressBar: true,
  });
};
const showError = (message: string) => {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
  });
};

// const a: number = 0;

function SignInPage() {
  const [attribute, setAttribute] = useState(false);

  return (
    <div className={styles.flipCard} data-isflip={attribute ? 'true' : 'false'}>
      <div className={styles.flipCardInner}>
        <FormSignIn
          className={styles.flipCardFront}
          showSuccess={showSuccess}
          showError={showError}
          onRoute={setAttribute}
        />
        <FormSignUp
          className={styles.flipCardBack}
          showSuccess={showSuccess}
          showError={showError}
          onRoute={setAttribute}
        />
      </div>
    </div>
  );
}
export default SignInPage;
