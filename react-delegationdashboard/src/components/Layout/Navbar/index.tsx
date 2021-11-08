import Denominate from 'components/Denominate';
import React from 'react';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { useContext, useDispatch } from 'context';
import menuBackground from "assets/images/menu-background.jpg";
import logo from "assets/images/logo.svg";

const Navbar = () => {
  const { loggedIn, dapp, address, account } = useContext();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({ type: 'logout', provider: dapp.provider });
  };

  return (
    <div className="navbar menu-bg"  style={{ backgroundImage: `url(${menuBackground})` }}>
      <div className="container">

          <img width='227' className='img-fluid' src={logo} alt=""/>
        {loggedIn && (

          <div className="text-right" >
            {/*<small className="d-none d-lg-inline text-muted mr-2">Balance: </small>*/}
            {/*<small className="text-truncate mr-2">*/}
            {/*  <Denominate value={account.balance.toString()} />*/}
            {/*</small>*/}

            <div className='row'>
                <div className='col-lg-10 d-none d-lg-block'>
                    <p  className="text-right p-bold p-dark-blue">Wallet: </p>
                    <p  className="text-right p-dark-blue">{address}</p>
                </div>
                <div className='col-lg-2 d-flex align-items-center justify-content-center'>
                    <a href="/#" onClick={logOut} className=" btn-invert-white ">
                        Logout
                    </a>
                </div>
            </div>



          </div>

        )}
      </div>
    </div>
  );
};

export default Navbar;
