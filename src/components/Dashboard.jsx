import { React } from "react";
import { Link } from "react-router-dom";


function Dashboard(props) {
    return (
      <>
        <div className="dashboard-background box-border">
            
                <div className="grid sm:grid-cols-1  md:grid-cols-12 lg:grid-cols-12 gap-10 h-screen">
                    <div className="col-span-1 h-16 dashboard-mobilenav md:hidden lg:hidden">
                        <p className="text-center text-4xl pt-3">▼▼▼</p>
                    </div>
                    <div className="  dashboard-nav ">
                        
                    </div>
                    <div className="md:col-span-6 lg:col-start-2 lg:col-span-9 p-10 ">
                      <div className="ticketPanel h-full border-black border-4">

                      </div>
                    </div>
                    <div className="md:col-span-3 lg:col-start-11 lg:col-span-8  p-10">
                      <div className=" h-full border-black border-4">
                          <div className="grid grid-rows-1">
                            <div className="row-span-1">
                              <p className="text-right text-white text-2xl ">Create a Ticket</p>
                            </div>
                          </div>
                      </div>
                    </div>
                </div>
            
        </div>
      </>
    );
  }
  export default Dashboard;