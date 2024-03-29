import React, { useEffect } from 'react';
import { useContext, useDispatch } from 'context';
import Delegation from './Delegation';
import PendingUndelegated from './PendingUndelegated';
import { Redirect } from 'react-router-dom';
import Overview from 'components/Overview';
import { Address } from '@elrondnetwork/erdjs';
import { AccountType } from 'helpers/contractDataDefinitions';
import State from 'components/State';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { getItem } from 'storage/session';
import loginBackground from "assets/images/login-background.jpg";
import loginBackgroundMobile from "assets/images/login-background-mobile.jpg";

const Dashboard = () => {
  const {
    loggedIn,
    dapp,
    address,
    networkConfig,
    ledgerAccount,
    walletConnectAccount,
  } = useContext();
  const dispatch = useDispatch();

  const fetchAccount = () => {
    if (loggedIn) {
      dapp.proxy.getAccount(new Address(address)).then(account => {
        dispatch({
          type: 'setAccount',
          account: new AccountType(account.balance.toString(), account.nonce),
        });
      });
    }
  };

  const isLedgerLogin = getItem('ledgerLogin') && !ledgerAccount;
  const isWalletConnect = getItem('walletConnectLogin') && !walletConnectAccount;
  const dispatchLoginType = () => {
    if (isLedgerLogin) {
      const ledgerLogin = getItem('ledgerLogin');
      dispatch({
        type: 'setLedgerAccount',
        ledgerAccount: {
          index: ledgerLogin.index,
          address: address,
        },
      });
    }
    if (isWalletConnect) {
      dispatch({
        type: 'setWalletConnectAccount',
        walletConnectAccount: address,
      });
    }
  };
  useEffect(fetchAccount, /* eslint-disable react-hooks/exhaustive-deps */ []);

  useEffect(dispatchLoginType, /* eslint-disable react-hooks/exhaustive-deps */ []);
  if (!loggedIn) {
    return <Redirect to="/" />;
  }
  return (
      <div>
        <div className="dashboard d-card w-100 d-none d-md-block" style={{ backgroundImage: `url(${loginBackground})` }}>
          <div className=" border-0">
            <Overview />
            {networkConfig.roundDuration === -1 ? (
              <State icon={faCircleNotch} iconClass="fa-spin text-primary" />
            ) : (
              <div className="card-body pt-0 px-spacer pb-spacer">
                <Delegation />
                <PendingUndelegated />
              </div>
            )}
          </div>
        </div>

        <div className="dashboard d-card w-100 d-block d-md-none " style={{ backgroundImage: `url(${loginBackgroundMobile})` }}>
          <div className=" border-0">
            <Overview />
            {networkConfig.roundDuration === -1 ? (
                <State icon={faCircleNotch} iconClass="fa-spin text-primary" />
            ) : (
                <div className="card-body pt-0 px-spacer pb-spacer">
                  <Delegation />
                  <PendingUndelegated />
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
