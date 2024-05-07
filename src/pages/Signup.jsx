import signupImg from "../assets/Sign up.gif"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join the farming community at Farmer's Market"
      desc1="Explore a world of knowledge and resources."
      desc2="Grow your farming skills and connect with fellow farmers."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup