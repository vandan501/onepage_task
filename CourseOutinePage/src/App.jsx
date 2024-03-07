import React from "react";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import "./index.css";
import Courseoverviewsection from "./Component/Courseoverviewsection";
import Availablechapterssection from "./Component/Availablechapterssection";

function App() {
  return (
    <>
      <Header />
      <div className="w-full h-full text-black mt-24 p-12 flex flex-col gap-12">
        {/** Course Overview Section*/}
        <Courseoverviewsection />

        {/** Available Chapters Section*/}
        <Availablechapterssection />
      </div>
      <Footer />
    </>
  );
}

export default App;
