import React from "react";
import "./modal.css";
import { IoClose } from "react-icons/io5";

const Modal = ({ isModalOpen, closeModal, setHasAgreed }) => {
  const handleAgreeClick = () => {
    setHasAgreed(true);
    closeModal();
  };
  return (
    <div className={`${isModalOpen ? "modal showModal " : "modal"}`}>
      <div className="modalContainer">
        <div className="modalHeader">
          <h4>This is the policy</h4>
          {/* <button onClick={closeModal} className="modalCloseBtn">
            Done
          </button> */}
          <IoClose
            onClick={closeModal}
            style={{ fontSize: "150%", cursor: "pointer" }}
          ></IoClose>
        </div>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
          reprehenderit esse ipsam numquam ex dolores quisquam explicabo quis ea
          quia enim, id in quam distinctio suscipit corrupti modi eos. Quos
          inventore accusamus obcaecati voluptas libero error exercitationem
          dignissimos incidunt cumque neque harum doloribus qui, laudantium
          labore, impedit veritatis velit nesciunt ipsa rem pariatur nam! Nulla
          quaerat nisi sunt voluptatum. Maxime aliquid atque alias rerum minima
          vero dolores provident, eos distinctio eaque laboriosam beatae dolorem
          eveniet sed in neque possimus nobis? Dolores officiis quaerat sint
          iusto adipisci sit laboriosam reiciendis quos in repudiandae, nulla
          sequi exercitationem error magnam vero beatae ab. Porro aut nesciunt,
          nostrum, atque, qui cupiditate culpa ab quam debitis itaque placeat
          possimus voluptatibus repellendus fuga perspiciatis? Dolorem, vel fuga
          minus ex, eius nesciunt reiciendis at corrupti hic officiis
          exercitationem? Ratione, laudantium. Dolorem, quae obcaecati. Ipsa
          adipisci eos impedit quos accusantium excepturi voluptate odit, nobis
          eveniet facere tempora, blanditiis nihil laborum dolores, similique
          nostrum dolore ab doloribus. Quam error libero ut quod saepe
          perferendis necessitatibus quibusdam praesentium assumenda cum esse
          nobis illum est dolore possimus laudantium veniam harum, nihil eos
          similique impedit nesciunt. Iusto ea culpa quibusdam delectus
          doloribus repellat. Illo consectetur pariatur alias porro et atque,
          nobis quia?
        </p>
        <button onClick={() => handleAgreeClick()} className="modalCloseBtn">
          I agree with the above terms, conditions, and privacy policy
        </button>
      </div>
    </div>
  );
};

export default Modal;
