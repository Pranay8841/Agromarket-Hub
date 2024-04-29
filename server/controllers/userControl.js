const otpGenerator = require("otp-generator")
//User model
const User = require("../models/user");
const OTP = require("../models/otp");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Profile = require("../models/userProfile");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../MailTemplates/passwordUpdate");

exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    if (!firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      })
    }

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log("Response of Most Recent OTP", response)

    if (response.length === 0) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      })
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
      address: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType: accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    })

    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    })

  } catch (error) {
    console.error("Error Occured While Creating User...", error)
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      })
    }

    console.log(user)
    console.log("Before Password Comparision")
    if (await bcrypt.compare(password, user.password)) {
      console.log("Hello Password Comparision Done")
      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      )


      user.token = token;
      user.password = undefined;

      console.log("token", token)
      console.log("token", token)

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      })
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error)
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    })
  }
}

exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User is Already Registered",
      })
    };

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP", otp);

    const result = await OTP.findOne({ otp: otp });
    console.log("Result of OTP", result);

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    };

    const otpPayload = { email, otp };

    const otpBody = await OTP.create(otpPayload);
    console.log("OTP BODY", otpBody);

    res.status(200).json({
      success: true,
      message: "OTP Send Successfully",
      otp,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

exports.changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id)

    const { oldPassword, newPassword } = req.body;

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    )

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "The Password is Incorrect"
      })
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10)
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true },
    )

    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      )

      console.log("Email Sent Successfully: ", emailResponse.response);

    } catch (error) {
      console.error("Error occurred while sending email:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      })
    }

    return res.status(200).json({
      success: true,
      message: "Password Updated Successfully"
    })
  } catch (error) {
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }
}


