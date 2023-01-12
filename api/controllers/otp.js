import otpGen from "otp-generator";
import otpTool from "otp-without-db";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";

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
//             "Bearer EAAIfuxmWLU0BAHHZAgr4snhP5eZBPdbC9pAp4qZBa1ZBb1mtB3FZAyeCUdAq6MkacBozeZCNGZCZAw4QttGapx6SGZBOcjia7uXrVAqNAJWQWLnjTBZAzHPu19ds1pRZB32NTtPKX5gNditPbSgKzZAAq0G2Y5UAWF9M4F3bdGUvfsymQhjuEBojYZCZCJj4kXqhKAmnzAISz0uCqwZAT0AsZC1l3Ve5",
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
  const phoneNumber = req.params.whatsappNumber;
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
      //generate JWT token
      let data = {
        time: Date(),
        // userId: 12,
        phoneNumber: phoneNumber,
      };

      const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: "1800s",
      });

      res.status(200).json({ token: `${token}` });
    } else {
      res.status(300).json("Wrong OTP!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
