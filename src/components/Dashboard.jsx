import { React } from "react";
import { Link } from "react-router-dom";


function Dashboard(props) {
    return (
      <>
        <div className="dashboard-background">
            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12">
                    <div className="col-span-1 h-16 dashboard-mobilenav md:hidden lg:hidden">
                        <p className="text-center text-4xl pt-3">▼▼▼</p>
                    </div>
                    <div className="hidden md:h-screen lg:h-screen md:col-span-1 lg:col-span-1  dashboard-nav">
                        
                    </div>
                    <div className="col-span-1 h-16">

                    </div>
                    <div className="col-span-1 h-16"></div>
                </div>
            </div>
        </div>
      </>
    );
  }
  export default Dashboard;