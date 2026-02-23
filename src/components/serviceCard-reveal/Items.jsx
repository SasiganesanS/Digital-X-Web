import React from "react";
import { motion } from "framer-motion";
import { items } from "./data";

export function Item({ id, onClose }) {
  const { category, title } = items.find((item) => item.id === id);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        style={{ pointerEvents: "auto" }}
        className="overlay"
        onClick={onClose}
      />
      <div className="card-content-container open">
        <motion.div className="card-content" layoutId={`card-container-${id}`}>
          <motion.div
            className="card-image-container"
            layoutId={`card-image-container-${id}`}
          >
            <img className="card-image" src={`images/${id}.jpg`} alt="" />
          </motion.div>
          <motion.div
            className="title-container"
            layoutId={`title-container-${id}`}
          >
            <span className="category">{category}</span>
            <h2>{title}</h2>
          </motion.div>
          <motion.div className="content-container" animate>
            <p>
              {title} - This is a detailed description of the service. 
              Our team brings years of experience and expertise to deliver exceptional results. 
              We work closely with clients to understand their unique needs and create tailored solutions 
              that drive real business value.
            </p>
            <p>
              From initial consultation to final delivery and ongoing support, we're committed to your 
              success every step of the way. Our proven methodologies and cutting-edge technologies 
              ensure that your project is delivered on time and exceeds expectations.
            </p>
            <p>
              We believe in transparent communication and collaborative partnerships. Let's work together 
              to bring your vision to life and achieve remarkable results that make a lasting impact.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
