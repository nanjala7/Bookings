//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Card } from './component/Card'
import Home from "./home/home"
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="Title"> Choose a Location
    <div className="App">
   
   
      <div className="col">
       
     
        <Card
         imgSrc="https://www.miosalon.com/couponimages/2024/01/23/09dc4c71ca6b8000cbc74d886edc7028.jpg"
          imgAlt="Card Image 3"
          title="Mancave NSK"
          description="Nairobi Street Kitchen,Westlands"
          buttonText="Book Now"
          link="/home"
        />
        
      </div>


      <div className="col">
      
      <Card
          imgSrc="https://www.miosalon.com/couponimages/2024/01/23/d49ace252b308b85f18eb251a7119c72.jpg"
          imgAlt="Card Image 3"
          //logoSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8AAAD8/PzY2Nj5+fn19fWCgoLr6+vk5OTHx8e4uLhcXFzb29vT09Pv7+/Ozs5MTEx2dnYlJSUfHx9TU1OXl5d9fX1HR0egoKC/v78zMzOmpqYWFhYKCgpkZGQsLCyTk5M7OztsbGyxsbE3NzdbW1tCQkKIiIiUlJSzdsfIAAAHeUlEQVR4nN2dB2LbMAxFI3nveGZ4p07S+5+wVVTXtqxBAh8A5XeASD+mSCwCT0/yxK1hf32YLo6zzTaKou1mdlxMD+t+oxUrPF2YZrf/PZhHRcwH7X63af2SdIbr3b5Q3IX9bj20flUKk+/iny7nx2xPrF/Yi3jU9lB3pj2qy2fZWR4J+hJOy471yzsw+iDKS/kYWQuooPfC0pfw1bMWUULvi60vaI2TBURfwiLEnXW8g+lL2I2tBWWIl1B9Ccugzo7JCS7w79kR0FL9FtCX8G0t7B9DF+OTxj4Ig3Utpi9hbS3vqckzYar5MHauuhJbzC2nrqXAibi+BMM99ZeKwCj6ZSUQf8oXsbQRSPFyqbQtBK4UBUbR6tEFGkjUXKIpygv1oC4wig6aAmUttSIULbieicAoUotudI0ERpGSAdfcminc6pjhn2YCo+hTQ6CerZaHgv2m404UI+5oNDfGCjfSn6K0S1/Nh6xAq5PwGtFTsWW9RhM2LUGF+vZ2HoI2eMNa2z8aYgr5yUEML1IC+9bK/tMXUuhTXCHLXEagjVOYj4ir2JxZy7piJmHZhPQTivyIsVwOjcIenyEOZyNNeYMrfLeWlOGEFhiKOXMBbdhMrQXdMcUKbFnryQHrYmhlCn3AZhVxBV04FkiBHWs1uSCLUcOyZ84g7ZoQFyk0PAzaSZ9Xr2+j4ejtdfWM+YO43RRhsX32r9+n1UfkBnCOMD+jvbrfFTqAvwpTyE02DfKzYl1u0e0WJZCbLyw+mrmGBCqf+Cb3Gl3e8kC5UKw48Km8YHt85PxxVGyYEybdV1Wkjzmxg2eMwBYnBFX9pXC+clBAash4BZc8ESefhamSZmR93bxUhneNyQi/kp+/dbsWMqZvqBjjm257vDo+gf4/xFg15MS2cyqTnnjFpLzJjoD7hRDylRTIcdEkH1ju8T5yrHKPOC7IzqGPXUx9BsRFHFMf7rMLkHczxCU+skKfaB/ZyUAoJMfZfO4sk60KRLyNbLT5fCLkjx1htpH3OZ8MX0x9CCI/MwpaIeL6/uP/hmT/zUdhk/oQRKSGfFr4PJz8bzQ9D33CRORgF0Ih2fB39Z0SqMXjmEpMaiDKp75O4xnFkP1Dd7ufvNFg/EOy8+aeOCGnfjA9CciPd19C5IgsJvtEjya6GhxkswkUTWyR60oHjk8YUB8wB+VI6Rlbt4sD9JAwKKr/9Jv8Bk7bKXkjjaLfIIWMsPvO4c8z8qSoyyVkwz9y+S8zVoiXcV8KJ71WFXfnlOrgbiWwCobKbwyybjPiSoZ4ifxp8VqKeUWdwGvBvDL99yJHvMErPN7jBLJbXU3zgn4dblXuAaiQblb915i14Br8qmNkHXQTUMd+bPfO30231z7y/+A79FYJqCPbdnZ8Oc5A9/mx3dzCK9WHF+uHdt3i7yLFCjTuM5CHT6DLBXJMUQx4+8/QCqGhlfo/MAsU4eBvdpm3i7hFonmERWuoYg54gYadhfIQ6TZk2Xkni2sUz48Qun6cEer+Ec5NYKRneE04t5+kOrdxYm5YxFp9h3JgHKQEBnMNUXAKRhj3ncF3nG/glO3jEG1jjh2AQMMlF0InhGiGXA+lH0C3PxmgcoZF8COnXMRH7Vj7+njfPou1/a3Qh9b2S5T+ChNs23uqTBGw/BE1fkLbH1FpZpnddiq/kabYGTbC5swFK+tU1iK9xsrFUJyNZOMnSvqFWWycfdUBlxbtdnVnlFl0N5NskJwD/fo1FXTOtwr67WAikBu/Xmj3qDOYaoWZqurKl75A5XiGyZhgzXyiTL6wCs2ksNGEQKnxo/dYDSSlXzXxBHVxxB+tlKnZ/EOtej50jZ4POieG6UB5DW9feLBMBRqOoqpbeI+8j6HtU2SJpTebd/MR69KZGrWJgMXImqcqo+QqkN1sjLeZFMkid6NRxxkENxv7bSZFbrMJYJtJkRqoZ2vNXCMVPTVzmu6RcaMU5/9WIzGRTWy6GgmJpKlaOtQNfMzGKjZTRIweg7wN5Ci8gD4UgzkKL2Ddfb2UvTtYCzwIizsLMhtlGD8sA1dJpFUZ5AsukWGUpqgG5SmG4RXmcoQIPFrLKAFjvAVmrt2CMN4O1iLK4Q+cnVlLqIC/ToNeowncejDBwekgmKVE+oVB/vDKwFVq8blw1mn4azQhphcwzINze/Ohr9NarNEE6jqtxxpNILYGwzbvkoW2TmuzRhMo67Q+a/QH//10bv3KnvjXEgVvj2bx7TBxsH5hf/yqpC2qnLn4XY5SvNKEw6dcyrrwiYj7Oq3jGk1wj/MHGcN3wTXOH2gM3wW3fFSIeSZX3Io0Aiq58MclbxpgLtSHahO8Zgb3HZWuYp2cwnyqTJtaGjO3lJs2NTVmbimrlwqr7olKmWlTW2PmluKBUZhxTQFQ1IJBs0mCLHF+VnFWkwi3C/lHxgMcFBfyjoyHOCgu3A8es7m8LMd9X354X3xrsl5GzT2KPG69jLp7FLlcB6bqGnoq57qwL9jSPB4X6+1hrLUsZ+vtcay1O1LrLfS6Lg7dR/4IU5IYcY3jvy5MH/kjTFE3R/8AlZeDX2cIRaYAAAAASUVORK5CYII="
          //logoAlt="logo2"
           title="Mancave Kitengela"
          description="Danka Plaza,Kitengela"
           buttonText="Book Now"
          link="/home"
        />
        
    </div>
    </div>
   </div>
    <Routes>
    <Route path="/home" element={<Home />} />
  </Routes>
</Router>
   
   
  );
}

export default App;