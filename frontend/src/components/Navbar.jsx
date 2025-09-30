import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context/StateContext';

const CustomButton = ({ title, handleClick, styles }) => (
  <button
    type="button"
    className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
    onClick={handleClick}
  >
    {title}
  </button>
);


const Navbar = () => {
  const navigate = useNavigate();
  const { connect, address } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input type="text" placeholder="Search for campaigns" className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none" />
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        {address ? (
          <CustomButton 
            title="Create a campaign"
            styles="bg-[#1dc071]"
            handleClick={() => navigate('create-campaign')}
          />
        ) : (
          <CustomButton 
            title="Connect Wallet"
            styles="bg-[#8c6dfd]"
            handleClick={connect}
          />
        )}
        
        <Link to="/profile">
            <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#808191]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
            </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar;