import './App.css';
import {Home} from './pages/Home/Home';
import {Signin} from './pages/Signin/Signin';
import {Signup} from './pages/Signup/Signup';
import {Projects} from './pages/Projects/Projects';
import { Contact } from './pages/Contact/Contact';
import { About } from './pages/About/About';
import {Campaign} from './pages/Campaign/Campaign';
import { CampaignMore } from './pages/Campaign/CampaignMore';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Navbar} from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
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
            <Route path="/campaign" element={<Campaign/>} />
            <Route path="/campaign/more" element={<CampaignMore/>} />
          </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}


export default App;
