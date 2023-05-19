import React from 'react'
import { Helmet } from 'react-helmet';


const Home = () => {
  return (
    <>
    <section>
        <div className="logo">
            planr.ai
        </div>
        <p className="p-info text-transition">plan your trips with planr.ai</p>
    </section>
    <div className="input-group flex-nowrap searchbar">
      <span className="input-group-text" id="addon-wrapping">Search</span>
      <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />
    </div>
    </>
  )
}

export default Home;

