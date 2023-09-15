import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import "../globals.css";
import { useRouter } from 'next/navigation'
import { FiFacebook, FiInstagram, FiSearch, FiTwitter, FiYoutube } from "react-icons/fi";
import { AiFillFacebook, AiFillInstagram, AiFillTwitterSquare, AiFillYoutube } from "react-icons/ai";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="social">
        <Link href="#">
            <AiFillFacebook />
        </Link>

        <Link href="#">
            <AiFillInstagram />
        </Link>

        <Link href="#">
            <AiFillTwitterSquare />
        </Link>

        <Link href="#">
            <AiFillYoutube />
        </Link>
      </div>

      <div className="links">
        <Link href="#">Condition of Use</Link>
        <Link href="#">Privacy Policy</Link>
        <Link href="#">Press Room</Link>
      </div>

      <div className="copy">
        <p>&copy; 2023 MovieBox by Elis Joshua</p>
      </div>
    </footer>
  )
}

export default Footer
