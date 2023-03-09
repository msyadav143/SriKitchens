import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const {history, activeTab} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const activeHome = activeTab !== 'CART' ? 'active' : ''
  const activeCart = activeTab !== 'HOME' ? 'active' : ''

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        return (
          <nav className="nav-header">
            <div className="nav-content">
              <Link className="img-tag" to="/">
                <img
                  className="website-logo"
                  src="https://res.cloudinary.com/dpnobkqmw/image/upload/v1634189323/Group_7420_p9exzb.png"
                  alt="website logo"
                />
                <h1 className="heading">Tasty Kitchens</h1>
              </Link>

              <ul className="nav-menu">
                <Link to="/" className={`nav-link ${activeHome}`}>
                  <li>Home</li>
                </Link>
                <Link to="/cart" className={`nav-link ${activeCart}`}>
                  <li>
                    Cart {cartList.length > 0 && <span>{cartList.length}</span>}
                  </li>
                </Link>

                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={onClickLogout}
                  testid="logout-button"
                >
                  Logout
                </button>
              </ul>
              <Popup
                trigger={
                  <button type="button" className="hamburger-btn">
                    <GiHamburgerMenu size={25} className="hamburger" />
                  </button>
                }
              >
                {close => (
                  <div className="modal-container">
                    <div className="nav-link-container">
                      <Link to="/" className="nav-link">
                        <p className={`nav-link ${activeHome}`}>Home</p>
                      </Link>
                      <Link to="/cart" className="nav-link">
                        <p className={`nav-link ${activeCart}`}>Cart</p>
                      </Link>
                      <button
                        type="button"
                        className="logout-desktop-btn"
                        onClick={onClickLogout}
                      >
                        Logout
                      </button>
                    </div>
                    <button type="button" className="close-btn">
                      <AiOutlineCloseCircle size={18} onClick={() => close()} />
                    </button>
                  </div>
                )}
              </Popup>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
