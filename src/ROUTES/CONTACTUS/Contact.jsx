import React, { useState } from "react";
import "./Contact.style.scss";
import Card from "../../COMPONENTS/CARD/Card";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";
import axios from "axios";
export const Contact = () => {
  const [subject, setsubject] = useState("");
  const [message, setMessage] = useState("");
  const data = {
    subject,
    message,
  };
  const sendMail = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        "http://localhost:5000/api/contactus",
        data
      );
      setsubject("");
      setMessage("");
      toast.success(resp.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="contact">
      <h3 className="--mt">Contact Us</h3>
      <div className="section">
        <form onSubmit={sendMail}>
          <Card cardClass={"card"}>
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={subject}
              placeholder="Subject"
              required
              onChange={(e) => setsubject(e.target.value)}
            />
            <label>Message</label>
            <textarea
              name="message"
              value={message}
              cols="30"
              rows="10"
              required
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className="--btn --btn-primary" type="submit">
              Send Message
            </button>
          </Card>
        </form>
        <div className="details">
          <Card cardClass={"card2"}>
            <h3>Our Contact Information</h3>
            <p>Fill the form or contact us via other channels listed below</p>
            <div className="icons">
              <span>
                <FaPhoneAlt />
                <p>+91 1234567890</p>
              </span>
              <span>
                <FaEnvelope />
                <p>Support@inventory.com</p>
              </span>
              <span>
                <GoLocation />
                <p>Gujarat, Rajkot</p>
              </span>
              <span>
                <FaTwitter />
                <p>@Keyurparmar</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
