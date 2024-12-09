import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Input, Text, Heading, Spinner } from "@chakra-ui/react";
import axiosInstance from "../api/axiosInstance";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/properties/${id}`);
        setListing(response.data);
      } catch (error) {
        console.error("Error fetching listing:", error);
        navigate("/listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, navigate]);

  const handleSubmit = async () => {
    try {
      const bookingData = {
        listingId: id,
        checkIn,
        checkOut,
        numberOfGuests: guests,
        totalPrice: listing.price * guests, // Assuming price is per guest
      };
      await axiosInstance.post("/bookings", bookingData);
      navigate("/bookings"); // Redirect to bookings page after successful booking
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <Spinner size="xl" />
        <Text>Loading listing details...</Text>
      </Box>
    );
  }

  return (
    <Box
      p={5}
      maxW="500px"
      mx="auto"
      bg="white"
      borderRadius="md"
      boxShadow="md"
    >
      <Heading as="h2" size="lg" mb={4}>
        Booking for {listing?.title}
      </Heading>
      <Input
        type="date"
        placeholder="Check-in"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        mb={4}
      />
      <Input
        type="date"
        placeholder="Check-out"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        mb={4}
      />
      <Input
        type="number"
        placeholder="Number of Guests"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        min="1"
        mb={4}
      />
      <Text fontWeight="bold">Total Price: ${listing?.price * guests}</Text>
      <Button colorScheme="teal" mt={4} onClick={handleSubmit}>
        Confirm Booking
      </Button>
    </Box>
  );
};

export default BookingPage;
