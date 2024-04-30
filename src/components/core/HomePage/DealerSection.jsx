import React from 'react'
import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import Dealer from "../../../assets/Dealer.png";
import HighlightText from './HighlightText';

const DealerSection = () => {
    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-20 items-center">
                <div className="lg:w-[50%]">
                    <img
                        src={Dealer}
                        alt=""
                        className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
                    />
                </div>
                <div className="lg:w-[50%] flex gap-10 flex-col">
                    <h1 className="lg:w-[50%] text-4xl font-semibold ">
                        Become an
                        <HighlightText text={"Dealer"} />
                    </h1>

                    <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
                        Innovative dealers worldwide empower farmers on our platform. 
                        We equip you with the tools and expertise to sell what you specialize in.
                    </p>

                    <div className="w-fit">
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className="flex items-center gap-3">
                                Start Selling Today
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DealerSection