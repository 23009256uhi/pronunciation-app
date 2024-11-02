import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>About Us</h1>
      <p className={styles.paragraph}>
        Welcome to our website! We are dedicated to providing the best service
        possible, with a focus on reliability, customer satisfaction, and
        innovation. Our team of experts works around the clock to bring you the
        latest and greatest in the industry.
      </p>
      <p className={styles.paragraph}>
        Founded in <strong>[Year]</strong>, we have continuously grown our
        offerings and expanded our expertise, ensuring that we remain at the
        forefront of the field. We are committed to maintaining the highest
        standards of quality and excellence in everything we do.
      </p>
      <p className={styles.paragraph}>
        Our mission is to create value for our customers through innovative
        solutions, outstanding service, and a commitment to integrity. Whether
        you're here for <strong>[service/product your company provides]</strong>
        , or just browsing, we're here to support you every step of the way.
      </p>
      <p className={styles.paragraph}>
        Thank you for visiting! If you have any questions or feedback, feel free
        to
      </p>
    </div>
  );
}

export default About;
