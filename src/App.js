import "../src/styles/style.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Profile from "./pages/Profile";
import React, {useState} from "react";
import CompanyInfo from "./pages/companyInfo/CompanyInfo";
import MapModal from "./components/ModalWindows/mapModal/MapModal";
import {AnalyzesInCartContext, ModalWindowsContext} from "./context";
import PurchaseModal from "./components/ModalWindows/purchaseModal/PurchaseModal";
import CartModal from "./components/ModalWindows/cartModal/CartModal";
import MessageModal from "./components/ModalWindows/messageModal/MessageModal";



function App() {

    const [isMapModalActive, setIsMapModalActive] = useState(false);
    const [isPurchaseModalActive, setIsPurchaseModalActive] = useState(false);
    const [isCartModalActive, setIsCartModalActive] = useState(false);
    const [analyzesInCart, setAnalyzesInCart] = useState([]);
    const [isMessageModalActive, setIsMessageModalActive] = useState(false)

    const modalController = {
        mapModal : {
            isMapModalActive,
            setIsMapModalActive
        },
        purchaseModal : {
            isPurchaseModalActive,
            setIsPurchaseModalActive
        },
        cartModal : {
            isCartModalActive,
            setIsCartModalActive
        },
        messageModal: {
            isMessageModalActive,
            setIsMessageModalActive
        }
    }

  return (
      <AnalyzesInCartContext.Provider value={{analyzesInCart, setAnalyzesInCart}}>
          <ModalWindowsContext.Provider value={modalController}>
              <div className='body'>
                  <MapModal isActive={isMapModalActive} setIsActive={setIsMapModalActive}></MapModal>
                  <PurchaseModal isActive={isPurchaseModalActive} setIsActive={setIsPurchaseModalActive}></PurchaseModal>
                  <CartModal></CartModal>
                  <MessageModal></MessageModal>
                  <BrowserRouter>
                      <Routes>
                          <Route path={'/'} element={<MainPage></MainPage>}/>
                          <Route path={'/profile/*'} element={<Profile/>}/>
                          <Route path={'/about-us'} element={<CompanyInfo/>}/>
                      </Routes>
                  </BrowserRouter>
              </div>
          </ModalWindowsContext.Provider>
      </AnalyzesInCartContext.Provider>
  );
}

export default App;
