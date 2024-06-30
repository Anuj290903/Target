import React from 'react';
"@mui/material/Typography";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Main, openState } from "./AppNavBar";
import { adminIsLoggedInState } from "../store/selectors/adminIsLoggedIn.js";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.css';

function LandingPage() {
  const [isLoggedIn] = useRecoilState(adminIsLoggedInState);
  const [open] = useRecoilState(openState);
  const navigate = useNavigate();
  console.log(isLoggedIn);
  return (
    <Main open={open}>
      <div className="landing-page-container">
        <div className="text-content">
          <h1 className="title">Admin Dashboard</h1>

          <button
            className="button-style"
            onClick={() => navigate(isLoggedIn ? "/courses" : "/login")}
          >
            {isLoggedIn ? "View Courses" : "Login Here"}
          </button>
        </div>
        <div>
          <img
            className="img-content"
            src="https://opensource.com/sites/default/files/lead-images/browser_web_internet_website.png"
            alt=""
          />
        </div>
      </div>
      <div className="shift-right">
      <div className="why-target-strip">
        <h2>Why Target</h2>
        <p>Your trusted partner in education.</p>
      </div>
      <div className="info-blocks">
        <div className="info-block">
          <h3>100+ Hours Of Video Explanations</h3>
          <p>
            Algorithms are tough to learn on paper. Each of our questions is
            accompanied by a two-part video explanation to maximize learning.
            That's over 100 hours of content, all at your fingertips.
          </p>
        </div>
        <div className="info-block">
          <h3>Expert Tutors</h3>
          <p>
            Our tutors are industry experts with years of experience in the field.
            They provide clear, concise explanations to help you understand even
            the most complex topics.
          </p>
        </div>
        <div className="info-block">
          <h3>Comprehensive Curriculum</h3>
          <p>
            Our curriculum covers all the essential topics you need to master. From
            basics to advanced concepts, we have you covered. Our questions are updated regularly to keep up with the latest trends.
          </p>
        </div>
      </div>
      <div className="results-block">
        <h3>Results</h3>
        <img
          className="results-img"
          src="https://opensource.com/sites/default/files/lead-images/browser_web_internet_website.png"
          alt="Results"
        />
      </div>
      
      <div className="testimonials-block container my-5">
  <h3 className="text-center mb-4">Testimonials</h3>
  <div className="row">
    <div className="col-md-4 mb-4">
      <div className="card testimonial h-100">
        <img
          className="testimonial-img mx-auto mt-3"
          src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_avif,q_auto:eco,dpr_2/newscms/2015_37/1214971/150909-homonaledi-ngs.jpg"
          alt="Topper 1"
        />
        <div className="card-body text-center">
          <h4 className="card-title">Topper 1</h4>
          <p className="card-text">IIT Kanpur</p>
          <p className="card-text">JEE Rank - 2077</p>
          <p className="card-text">How did Target help me in getting to IITK.</p>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card testimonial h-100">
        <img
          className="testimonial-img mx-auto mt-3"
          src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_avif,q_auto:eco,dpr_2/newscms/2015_37/1214971/150909-homonaledi-ngs.jpg"
          alt="Topper 2"
        />
        <div className="card-body text-center">
          <h4 className="card-title">Topper 2</h4>
          <p className="card-text">IIT Bombay</p>
          <p className="card-text">JEE Rank - 1234</p>
          <p className="card-text">Target provided excellent resources and guidance.</p>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card testimonial h-100">
        <img
          className="testimonial-img mx-auto mt-3"
          src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_avif,q_auto:eco,dpr_2/newscms/2015_37/1214971/150909-homonaledi-ngs.jpg"
          alt="Topper 3"
        />
        <div className="card-body text-center">
          <h4 className="card-title">Topper 3</h4>
          <p className="card-text">IIT KGP</p>
          <p className="card-text">JEE Rank - 987</p>
          <p className="card-text">With Target's help, I achieved my dream.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="courses-block container my-5">
  <h3 className="text-center mb-4 display-4 text-dark">Our Courses</h3>
  <div className="row">
    <div className="col-md-4 mb-4">
      <div className="card course-block h-100 shadow border-0">
        <img
          className="course-img card-img-top"
          src="https://i0.wp.com/www.compoundchem.com/wp-content/uploads/2014/05/Chemical-Reactions-Pt-1.png?ssl=1"
          alt="Class 11"
        />
        <div className="card-body text-center">
          <h4 className="card-title text-dark font-weight-bold">Kick-start</h4>
          <p className="card-text text-secondary">For those who want to start early.</p>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card course-block h-100 shadow border-0">
        <img
          className="course-img card-img-top"
          src="https://i0.wp.com/www.compoundchem.com/wp-content/uploads/2014/05/Chemical-Reactions-Pt-1.png?ssl=1"
          alt="Class 12"
        />
        <div className="card-body text-center">
          <h4 className="card-title text-dark font-weight-bold">Marathon</h4>
          <p className="card-text text-secondary">For those who want to give their best shot.</p>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card course-block h-100 shadow border-0">
        <img
          className="course-img card-img-top"
          src="https://i0.wp.com/www.compoundchem.com/wp-content/uploads/2014/05/Chemical-Reactions-Pt-1.png?ssl=1"
          alt="Droppers"
        />
        <div className="card-body text-center">
          <h4 className="card-title text-dark font-weight-bold">Comeback</h4>
          <p className="card-text text-secondary">For those who want to try again.</p>
        </div>
      </div>
    </div>
  </div>

</div>
      <div className="info-strip">
        <div className="info-strip-item">Contact Us</div>
        <div className="info-strip-item">Team</div>
        <div className="info-strip-item">Buy Courses</div>
        <div className="info-strip-item">JEE Results</div>
        <div className="info-strip-item">NEET Results</div>
        <div className="info-strip-item">Test Series</div>
        </div>
      </div>
      
    </Main>
  );
}

export default LandingPage;
