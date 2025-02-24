import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../css/style.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import toast  from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

export default function Resetpassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form submitted');
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
        
        if (!password || !confirmPassword) {
            console.error('Validation Error: Both fields are required');
            toast.error('Both fields are required');
            return;
        }

        if (password !== confirmPassword) {
            console.error('Validation Error: Passwords do not match');
            toast.error('Passwords do not match');
            return;
        }

        console.log('Sending request to API...');
        try {
            const response = await axios.post('http://ls.bizbybot.com/api/auth/password/reset', {
                token,
                password,
                confirm_password: confirmPassword,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });

            console.log('API Response:', response);

            if (response.status === 200) {
                console.log('Password updated successfully!');
                toast.success('Password updated successfully! Login to continue');
                setTimeout(() => navigate('/login'), 3000);
            }
        } catch (error) {
            console.error('API Error:', error.response?.data?.message || 'Failed to reset password');
            toast.error(error.response?.data?.message || 'Failed to reset password');
        }
    };

    return (
        <div>
            <Navbar />
            <section className="my-profile-main-section">
                <div className="container">
                    <div className="row">
                        <form className="col-md-6 offset-md-3" id="RPForm" onSubmit={handleSubmit} noValidate>
                            <input type="hidden" name="_token" autoComplete="off" />
                            <p className="heading-para m-0">Reset Password</p>
                            <p className="sub-para">Fill the following input fields to change the password of your account</p>
                            <div className="alert alert-danger alert-dismissible fade show mt-2" role="alert" id="alertRPDiv" style={{ display: "none" }}>
                                <strong id="alertRPMessage"></strong>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => document.getElementById('alertRPDiv').style.display = 'none'}></button>
                            </div>
                            <div className="profile-main-inputes-div">
                                <div className="each-animatted-input-div">
                                    <input type="password" id="newPassword" name="password" placeholder='New Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <input type="hidden" name="token" value={token || ''} />
                                <div className="each-animatted-input-div">
                                    <input type="password" id="confirmPass" name="confirm_password" placeholder='Confirm New Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn submit-btn">
                                    <span id="RPBtnSpan">Submit New Password</span>
                                    <div className="d-flex justify-content-center d-none" id="RPLoader">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <button type="button" className="btn profile-back-btn mx-auto" onClick={() => navigate('/jobs')}>
                                <img src="http://ls.bizbybot.com/front/images/icons/back-arrow.svg" alt="Back" />
                                Home
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}