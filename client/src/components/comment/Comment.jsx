import React from "react";
import { BsFillStarFill, BsStarHalf } from "react-icons/bs";
import images from "../../pictures/picture";
import "./comment.css";
const Comment = () => {
  return (
    <div className="comment">
      <div className="commentContainer">
        <h1>WHAT CINCHY USER SAY?</h1>
        <div className="commentItems">
          <div className="commentItem">
            <img className="commentUserImg" src={images.yifei} alt="" />
            <div className="commentItemRight">
              <div className="commenUserInfoTxt">
                <h5>Yifei Chen</h5>
                <p>Taipei, Taiwan | December 2022</p>
              </div>

              <div className="stars">
                <BsFillStarFill className="commentStar"></BsFillStarFill>
                <BsFillStarFill className="commentStar"></BsFillStarFill>
                <BsFillStarFill className="commentStar"></BsFillStarFill>
                <BsFillStarFill className="commentStar"></BsFillStarFill>
                <BsFillStarFill className="commentStar"></BsFillStarFill>
              </div>
              <p>
                What a great experience using Cinchy! I booked my scooter in
                Bali through Cinchy and never had any issues. When I had to
                leave Bali because of an emergency, Cinchy's customer service
                really helped me!
              </p>
            </div>
          </div>
          <div className="commentItem">
            <img className="commentUserImg" src={images.kaori} alt="" />
            <div className="commentItemRight">
              <div className="commenUserInfoTxt">
                <h5>Kaori Yamaguchi</h5>
                <p>Osaka, Japan | November 2022</p>
              </div>

              <div className="stars">
                <BsFillStarFill className="commentStar"></BsFillStarFill>
                <BsFillStarFill className="commentStar"></BsFillStarFill>
                <BsFillStarFill className="commentStar"></BsFillStarFill>
                <BsFillStarFill className="commentStar"></BsFillStarFill>
                <BsFillStarFill className="commentStar"></BsFillStarFill>
              </div>
              <p>
                My family and I visit Bali every year, and we usually having
                trouble to find the right bike rental services. Cinchy was
                recommened to us by friend, and I’m so glad we tried it out! The
                process was easy.
              </p>
            </div>
          </div>
          <div className="commentItem">
            <img className="commentUserImg" src={images.anthony} alt="" />
            <div className="commentItemRight">
              <div className="commenUserInfoTxt">
                <h5>Anthony Lewis</h5>
                <p>Sydney, Australia | December 2022</p>
              </div>

              <div className="stars">
                <BsFillStarFill className="commentStar"></BsFillStarFill>
                <BsFillStarFill className="commentStar"></BsFillStarFill>
                <BsFillStarFill className="commentStar"></BsFillStarFill>
                <BsFillStarFill className="commentStar"></BsFillStarFill>
                <BsFillStarFill className="commentStar"></BsFillStarFill>
              </div>
              <p>
                When I was looking to book my scooter rental in Bali, Cinchy had
                the best browsing experiece, though it’s relatively new service,
                so I figured I’d give it a try. It was my first time using
                Cinchy, but I’d definitely recommend it to a friend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
