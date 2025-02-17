import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { studentEndPoints } from "../apis";
import rpzLogo from "../../assets/Logo/rzp_logo.png"
import { resetCart } from "../../redux/slices/cartSlice";

function loadScript(src){
    return new Promise((resolve, reject) => {
        // check if script is already loaded
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if(existingScript){
            // console.log("Script already loaded.");
            resolve(true);
            return;
        }

        // create a new script element.
        const script = document.createElement("script");
        script.src = src;
        
        script.onload = () => {
            // console.log("script loaded successfully.");
            resolve(true);
        }

        script.onerror = () => {
            console.log("Failed to load script.");
            reject(new Error("Failed to load script."));
        }
        document.body.appendChild(script);
    })
}


export const buyCourse = async(token, courses, userDetails, navigate, dispatch) => {
    const toastId = toast.loading("Loading...");
    try{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("RazorPay SDK failed to load");
            return;
        }

        // initiate order
        const orderResponse = await apiConnector("POST", studentEndPoints.COURSE_PAYMENT_API,
            {courses},
            {
                Authorization : `Bearer ${token}`
            }
        )
        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        // console.log("PRINTING orderResponse", orderResponse);

        // Creating Option for RazorPay Modal / Preparing Data for RazorPay Modal.

        const options = {
            key : process.env.RAZORPAY_KEY,
            currency : orderResponse.data.message.currency,
            amount : orderResponse.data.message.amount, 
            order_id : orderResponse.data.message.id,
            name : "StudyNotion",
            description : "Thank You for Purchasing the Course",
            image : rpzLogo,
            prefill : {
                name : `${userDetails.fName} ${userDetails.lName}`,
                email : userDetails.email,
                contact : userDetails.phone
            },
            handler : function(response){
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);
                // verify Payment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
    }
    catch(err){
        console.log("PAYMENT API ERROR.....", err);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token){
    try{
        await apiConnector("POST", studentEndPoints.SEND_PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId : response.razorpay_order_id,
                paymentId : response.razorpay_payment_id,
                amount,
            },
            {
                Authorization : `Bearer ${token}`
            }
        )

        // console.log("Send Payment Success Email Done.");
    }
    catch(err){
        console.log("PAYMENT SUCCESS EMAIL ERROR....", err);
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId = toast.loading("Verifying Payment");
    try{
        const response = await apiConnector("POST", studentEndPoints.COURSE_VERIFY_API,
            bodyData,
            {
                Authorization : `Bearer ${token}`
            }
        )
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, you are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }
    catch(err){
        console.log("PAYMENT VERIFY ERROR....", err);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
}