import AXIOS_API from "@/utils/axiosAPI";
import { loadStripe } from "@stripe/stripe-js"

export const redirectToCheckout = async (
    listing,
    startDate,
    endDate,
    daysDifference
) => {
    try {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

        if (!stripe) throw new Error("Stripe failed to initialize")

        const { data: { sessionId } } = await AXIOS_API.post('/stripe', {
            listing,
            startDate,
            endDate,
            daysDifference
        })

        const stripeError = await stripe.redirectToCheckout({
            sessionId
        })

        if(stripeError){
            return
        }

    } catch (error) {
        console.log(error)
    }
}



// export const redirectToCheckout = async (
//     listing,
//     startDate,
//     endDate,
//     daysDifference
// ) => {
//     try {
//         // Create a Stripe checkout session using the backend API
//         const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

//         if (!stripe) throw new Error("Stripe failed to initialize");

//         // Send the relevant data to the backend to create the session
//         const { data: { sessionId } } = await AXIOS_API.post('/api/stripe-session', {
//             listing,
//             startDate,
//             endDate,
//             daysDifference
//         });

//         // Redirect to Stripe checkout
//         const stripeError = await stripe.redirectToCheckout({
//             sessionId
//         });

//         if (stripeError) {
//             console.log(stripeError);
//             return;
//         }
//     } catch (error) {
//         console.error("Error redirecting to Stripe checkout:", error);
//     }
// };


// import db from '@/lib/db';  // Import your database client (Prisma or MongoDB)

// export const saveBookingDetails = async (
//     listing,
//     startDate,
//     endDate,
//     daysDifference,
//     userId // Ensure userId is passed
// ) => {
//     try {
//         // Save the booking data to the database (using Prisma in this example)
//         const booking = await db.booking.create({
//             data: {
//                 listingId: listing.id,  // Assuming listing has an id field
//                 startDate,
//                 endDate,
//                 userId,
//                 totalPrice: listing.pricePerNight * daysDifference, // Assuming you calculate the total price this way
//                 createdAt: new Date(),
//             },
//         });

//         console.log('Booking saved successfully:', booking);
//         return { success: true, message: 'Booking saved successfully', booking };
//     } catch (error) {
//         console.error('Error saving booking:', error);
//         return { success: false, message: 'Failed to save booking', error };
//     }
// }

