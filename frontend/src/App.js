import './App.css';
import {Home} from './pages/Home/Home';
import {Signin} from './pages/Signin/Signin';
import {Signup} from './pages/Signup/Signup';
import {Projects} from './pages/Projects/Projects';
import { Contact } from './pages/Contact/Contact';
import { About } from './pages/About/About';
import {Campaign} from './pages/Campaign/Campaign';
import { CampaignMore } from './pages/Campaign/CampaignMore';
import {Cart} from './pages/Cart/Cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Navbar} from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import { Checkout } from './pages/Checkout/Checkout';
import { User } from './pages/User/User';
import {CartLog} from './pages/CartLog/CartLog';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/projects" element={<Projects/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/campaign" element={<Campaign/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/user" element={<User/>} />
            <Route path="/cartlog" element={<CartLog/>} />
            <Route path="/campaign/more" element={<CampaignMore/>} />
          </Routes>
        <Footer/>
        <Toaster/>
      </BrowserRouter>
    </div>
  );
}


export default App;
