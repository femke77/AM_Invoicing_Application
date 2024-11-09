import InvoicesList from '../components/InvoiceList';
import LogoutButton from '../components/LogoutButton';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

export default function Invoice() {
  const userData = useSelector((state: RootState) => state.auth.userData?.name);
  return (
    <div>
      {userData && (
        <h2>
          Wecome,{' '}
          {`${userData
            .substring(0, 1)
            .toUpperCase()}${userData.substring(1)}`}
          !
        </h2>
      )}

      <LogoutButton />

      <InvoicesList />
    </div>
  );
}
