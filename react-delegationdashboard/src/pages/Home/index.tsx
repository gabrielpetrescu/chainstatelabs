import React from 'react';
import { Redirect } from 'react-router-dom';
import { faBan, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import State from 'components/State';
import { useContext } from 'context';
import WalletLogin from './Login/Wallet';
import WalletConnectLogin from './Login/WalletConnect';
import arrowRight from 'assets/images/arrow-right.png';
import loginBackground from "assets/images/login-background.jpg";


const Home = () => {
  const { loading, error, loggedIn, egldLabel } = useContext();

  const ref = React.useRef(null);

  return (
    <div ref={ref} className="home d-flex flex-fill align-items-center">
      {error ? (
        <State
          icon={faBan}
          iconClass="text-primary"
          title="Something went wrong"
          description="If the problem persists please contact support."
        />
      ) : loggedIn ? (
        <Redirect to="/dashboard" />
      ) : loading ? (
        <State icon={faCircleNotch} iconClass="fa-spin text-primary" />
      ) : (


          <div className="container">
            <div className="login-container login-bg text-center" style={{ backgroundImage: `url(${loginBackground})` }}>

                  <Logo className="logo img-fluid" />


                  <h1 className="">
                    Secure <span>staking</span>, <span>simplified</span>. <br/>
                    For everyone.
                  </h1>

                  <p className="login-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at diam odio. Ut interdum, ipsum vitae auctor consequat, orci risus.
                  </p>

                  <p className="p-gold">Please select your login method</p>


                  <div className="login-btns">
                        <a
                            href={process.env.PUBLIC_URL + '/ledger'}
                            className="btn btn-primary px-sm-spacer mx-1 mx-sm-3"
                        >
                          Ledger
                          <img src={arrowRight} alt=""/>

                        </a>
                        <WalletLogin />
                        <WalletConnectLogin />
                  </div>

            </div>
          </div>







      )}
    </div>
  );
};

export default Home;
