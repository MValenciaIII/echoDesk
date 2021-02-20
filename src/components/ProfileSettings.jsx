import React from 'react';
import {Link } from 'react-router-dom'


function ProfileSetttings () {

return(
    <>
        <div className="screen">
            <div className=" grid grid-cols-1 bg-gray-800 px-4 py-4">
                <div className="col-span-1">
                    <h2 className="mx-auto my-2 text-lg text-left text-gray-100">
                    My Profile Settings
                    </h2>
                </div>
            </div>
            <div className="bg-gray-400 box-border  text-white">
                <div className=" flex flex-col  lg:flex-row bg-gray-700 ">
                    <div className="flex-grow  md:order-none border-black border-1 rounded">

                    </div>
                
                    <div className=" md:w-full  lg:order-none lg:w-2/3  p-2   border-black border-1 rounded bg-gray-800 text-white text-sm">
                        <div className="grid grid-cols-flow grid-cols-3 ">
                            <img className="col-span-1 p-4" src='https://via.placeholder.com/100x100' alt=""/>
                            <div className=" col-span-3">
                                <a className="p-4 "href="">Change</a>
                                
                            </div>
                            <div className="col-span-3">
                                <p className="p-4 ">Profile picture</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-flow grid-cols-3  py-10 px-4">
                            <textarea  cols="10" rows="8"></textarea>
                        </div>
                    
                
                    </div>
                    <div className="flex-grow  border-black border-1 md:order-none ">
                        <div className="pl-4">
                            <h3 className="py-6">Profile Details</h3>
                            <ul>
                                <li className="py-1">Full Name :</li>
                                <li className="py-1">Email : </li>
                                <li className="py-1">Phone Number :</li>
                                <li className="py-1">Job Title : </li>
                            </ul>
                            <p className="text-sm">Click here to edit your <a className="" href=""> Profile Details</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default ProfileSetttings;