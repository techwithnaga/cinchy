import otpGen from "otp-generator";
import otpTool from "otp-without-db";
import fetch from "node-fetch";

// export const sendMessage = async (req, res) => {
//   const body = {
//     messaging_product: "whatsapp",
//     to: "17085431524",
//     type: "template",
//     template: {
//       name: "testaja",
//       language: { code: "en_US" },
//       components: [
//         {
//           type: "body",
//           parameters: [
//             {
//               type: "text",
//               text: "Cinchy",
//             },
//             {
//               type: "text",
//               text: "090909",
//             },
//           ],
//         },
//       ],
//     },
//   };
//   try {
//     const response = await fetch(
//       "https://graph.facebook.com/v15.0/100853682764065/messages",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:
//             "Bearer EAAIfuxmWLU0BAOa0fY3S8nmTBfJp1YQCMaZAVlrjUETN1YE4FrUq9onjQSwdUxGZAxtMgwsREbcsRXQms0WHxhUNzOHAjlkPQbjoXeDelhcOGvTjTBrWsG4IIcorbNXD60Je7HkUKjyhdV8IJfwEqwnoEKLAQMzzXrzSU7FIUXXUy9PYUvaUpPEMlV9YLtJFQ7slnbmkLZCmtWN46ZBW",
//         },
//         body: JSON.stringify(body),
//       }
//     );

//     console.log(response);
//     res.status(200).json("receive message?");
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getOTP = async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  let otp = otpGen.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  let hash = otpTool.createNewOTP(
    phoneNumber,
    otp,
    process.env.OTP,
    5,
    "sha256"
  );

  const body = {
    messaging_product: "whatsapp",
    to: `${phoneNumber}`,
    type: "template",
    template: {
      name: "testaja",
      language: { code: "en_US" },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: "Cinchy",
            },
            {
              type: "text",
              text: otp,
            },
          ],
        },
      ],
    },
  };

  try {
    const response = await fetch(
      "https://graph.facebook.com/v15.0/100853682764065/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.FBTOKEN,
        },
        body: JSON.stringify(body),
      }
    );

    if (response.status === 200) {
      res.status(response.status).json(hash);
    } else {
      res.status(response.status).json(response.statusText);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const verifyOTP = (req, res) => {
  const hashFromUser = req.body.hash;
  const otpFromUser = req.body.otp;
  const phoneNumber = req.body.phoneNumber;
  try {
    if (
      otpTool.verifyOTP(phoneNumber, otpFromUser, hashFromUser, process.env.OTP)
    ) {
      res.status(200).json("verified!");
    } else {
      res.status(300).json("Wrong OTP!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
