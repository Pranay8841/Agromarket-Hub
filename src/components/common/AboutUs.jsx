import React from "react";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <>
      <section className="bg-white py-28">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div class="w-70% md:w-1/1 mx-auto px-4 mb-8 md:mb-0 text-center bg-white rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
              <h2 class="text-3xl font-bold mb-4">About Us</h2>

              <p class="text-lg mb-6">
                Agro Market is an online web application where dealers, farmers,
                and shopkeepers can actively participate in trading.
              </p>
              <p class="text-lg mb-6">
                We trust our users and emphasize delivering genuine products.
              </p>
            </div>

            <div className="w-full md:w-1/2 px-4 mb-8">
              <div className="bg-gray-200 text-center py-12 px-4 rounded-lg transition duration-300 hover:bg-blue-600 hover:text-white">
                <img
                  src="https://avatars.githubusercontent.com/u/97648682?v=4"
                  className="mx-auto w-32 h-32 rounded-full mb-6"
                  alt="pic"
                />
                <h3 className="text-xl font-bold mb-2">Pranay Bhandekar</h3>
                <div className="mb-4">
                  <p className="text-sm">Full-Stack Developer</p>
                </div>
                <p className="text-sm mb-4">
                  Pranay Bhandekar is a highly accomplished individual with
                  expertise in MERN Stack development, demonstrated leadership in
                  founding a non-profit organization, and notable achievements in
                  research and technical projects, showcasing strong skills in
                  both technical and non-technical domains.
                </p>
                <ul className="flex justify-center">
                  <li className="mr-2">
                    <a
                      href="https://www.linkedin.com/in/pranay-bhandekar-4a529922a/"
                      className="inline-block w-8 h-8 text-white bg-blue-500 rounded-full items-center justify-center hover:bg-blue-700 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                  </li>

                  <li className="mr-2">
                    <a
                      href="https://github.com/Pranay8841"
                      className="inline-block w-8 h-8 text-white bg-black rounded-full items-center justify-center hover:bg-gray-900 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full md:w-1/2 px-4 mb-8">
              <div className="bg-gray-200 text-center py-12 px-4 rounded-lg transition duration-300 hover:bg-blue-600 hover:text-white">
                <img
                  src="https://avatars.githubusercontent.com/u/98226339?v=4"
                  className="mx-auto w-32 h-32 rounded-full mb-6"
                  alt="pic"
                />
                <h3 className="text-xl font-bold mb-2">Viraj Kunjir</h3>
                <div className="mb-4">
                  <p className="text-sm">Full-Stack Developer</p>
                </div>
                <p className="text-sm mb-4">
                  Viraj Kunjir is a highly skilled Full-Stack Intern at Ineuron
                  specializing in MERN stack development, with notable projects
                  including optimizing harvesting for maximum profit through
                  machine learning and developing an online art gallery,
                  showcasing proficiency in a wide range of technologies and
                  frameworks.
                </p>
                <ul className="flex justify-center">
                  <li className="mr-2">
                    <a
                      href="https://www.linkedin.com/in/viraj-kunjir-073b7822a/"
                      className="inline-block w-8 h-8 text-white bg-blue-500 rounded-full items-center justify-center hover:bg-blue-700 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                  </li>

                  <li className="mr-2">
                    <a
                      href="https://github.com/VKunjir"
                      className="inline-block w-8 h-8 text-white bg-black rounded-full items-center justify-center hover:bg-gray-900 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;
